import type { NextPage } from "next";
import { MarkedInput } from "../components/markedInput";
import { Result } from "../components/result";
import { useState } from "react";
import EditorContext from "../lib/editorContext";
import type { DefaultContext } from "../lib/editorContext";
import NavBar from "../components/navbar";
import { useSession } from "next-auth/react";
import type { PartialMessage, Message } from "../lib/DBTools";
import { useRouter } from "next/router";

const MarkDownPage: NextPage = () => {
    const { data: session } = useSession({
        required: true,
    });

    const [markdownText, setMarkdownText] = useState("");
    const [markdownTitleText, setMarkdownTitleText] = useState("");

    const router = useRouter();

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

        const email = session?.user?.email ? session.user.email : "";
        const image = session?.user?.image ? session.user.image : "";
        const name = session?.user?.name ? session.user.name : "";
        const provider = session?.account?.provider
            ? session.account.provider
            : "";

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

        const message = fetch("api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(partialMessage),
        })
            .then(res => res.json())
            .catch(err => console.log(err)) as Promise<Message>;

        const id = message.then(res => res._id);

        id.then(id => {
            router.push(`/message/${id}`);
        }).catch(err => console.log(err));
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <NavBar />
            <div className="editor-app-container">
                <button className="editor-submit-button" onClick={handleSubmit}>
                    Create New Message!
                </button>
                <div className="editor-container">
                    <MarkedInput />
                    <Result />
                </div>
            </div>
        </EditorContext.Provider>
    );
};

export default MarkDownPage;
