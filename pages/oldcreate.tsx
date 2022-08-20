import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Message } from "../lib/DBTools";
import type { PartialMessage } from "../lib/DBTools";

type Props = {
    id: string;
};

const CreateMsg: NextPage<Props> = ({ id }: Props) => {
    const { data: session } = useSession({
        required: true,
    });

    const defaultTitle = "Enter a title";
    const defaultMsg = "Type your message here";

    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (msg === "" || title === "") {
            return;
        }

        const email = session?.user?.email ? session.user.email : "";
        const image = session?.user?.image ? session.user.image : "";
        const name = session?.user?.name ? session.user.name : "";
        const provider = session?.account?.provider
            ? session.account.provider
            : "";

        const partialMessage: PartialMessage = {
            title: title,
            content: msg,
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
            .catch(err => console.log(err))
            .finally(() => {
                setMsg(defaultMsg);
            }) as Promise<Message>;

        const id = message.then(message => message._id);

        id.then(id => {
            router.push(`/message/${id}`);
        }).catch(err => console.log(err));
    };

    return (
        <div>
            <h1>CreateMsg</h1>
            <p>This page requires authentication.</p>
            <p>New post id: {id}</p>
            {/* <LoginBtn /> */}
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder={defaultTitle}
                    />
                </label>

                <label>
                    Message
                    <textarea
                        value={msg}
                        onChange={handleMsgChange}
                        placeholder={defaultMsg}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreateMsg;
