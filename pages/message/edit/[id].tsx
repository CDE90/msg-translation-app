import type { NextPage } from "next";
import { MarkedInput } from "../../../components/markedInput";
import { Result } from "../../../components/result";
import { useEffect, useState } from "react";
import EditorContext from "../../../lib/editorContext";
import type { DefaultContext } from "../../../lib/editorContext";
import NavBar from "../../../components/navbar";
import { useSession } from "next-auth/react";
import type { PartialMessage, Message } from "../../../lib/DBTools";
import { useRouter } from "next/router";
import { useMessage } from "../../../lib/clientTools";
import MsgPage from "../[id]";

const markDownPage = () => {
    const { data: session } = useSession({
        required: true,
    });

    const router = useRouter();
    const { id } = router.query;

    var { message, isLoading, isError: isE } = useMessage(id as string);

    const [isError, setError] = useState(isE);
    const [markdownText, setMarkdownText] = useState("");
    const [markdownTitleText, setMarkdownTitleText] = useState("");

    useEffect(() => {
        if (message && message.user) {
            if (
                message.user.email !== session?.user?.email ||
                message.user.provider !== session?.account?.provider
            ) {
                setError(true);
                return;
            } else {
                setMarkdownText(message.content);
                setMarkdownTitleText(message.title);
            }
        }
    }, [message]);

    if (isError) {
        router.push("/");
        return;
    } else if (isLoading) {
        return <div>Loading...</div>;
    }

    const contextValue: DefaultContext = {
        markdownText,
        setMarkdownText,
        markdownTitleText,
        setMarkdownTitleText,
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (markdownText === "" || markdownTitleText === "") {
            return;
        }

        const { email, image, name, provider } = message.user;

        const partialMessage: PartialMessage = {
            title: markdownTitleText,
            content: markdownText,
            user: {
                email,
                image,
                name,
                provider,
            },
        };

        fetch(`http://localhost:3000/api/edit/${message._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(partialMessage),
        })
            .then(res => res.json())
            .catch(err => console.error(err)) as Promise<Message>;

        router.push(`http://localhost:3000/message/${id}`);
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <NavBar />
            {isError ? (
                <div>Error</div>
            ) : (
                <div className="editor-app-container">
                    <button
                        className="editor-submit-button"
                        onClick={handleSubmit}
                    >
                        Submit Edited Message!
                    </button>
                    <div className="editor-container">
                        <MarkedInput />
                        <Result />
                    </div>
                </div>
            )}
        </EditorContext.Provider>
    );
};

export default markDownPage;
