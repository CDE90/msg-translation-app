import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Message } from "../lib/db_tools";
import type { PartialMessage } from "../lib/db_tools";

type Props = {
    id: string;
};

const CreateMsg: NextPage<Props> = ({ id }: Props) => {
    const { data: session } = useSession({
        required: true,
    });

    const defaultMsg = "Type your message here";

    const [msg, setMsg] = useState(defaultMsg);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (msg === "" || msg === defaultMsg) {
            return;
        }

        const email =
            session && session.user && session.user.email
                ? session.user.email
                : "";
        const image =
            session && session.user && session.user.image
                ? session.user.image
                : "";
        const name =
            session && session.user && session.user.name
                ? session.user.name
                : "";

        const partialMessage: PartialMessage = {
            text: msg,
            user: {
                email,
                image,
                name,
            },
        };

        const message = fetch("api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(partialMessage),
        })
            .then((res) => res.json())
            .catch((err) => console.error(err))
            .finally(() => {
                setMsg(defaultMsg);
            }) as Promise<Message>;

        const id = message.then((message) => message._id);

        id.then((id) => {
            router.push(`/message/${id}`);
        }).catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>CreateMsg</h1>
            <p>This page requires authentication.</p>
            <p>New post id: {id}</p>
            {/* <LoginBtn /> */}
            <form onSubmit={handleSubmit}>
                <textarea value={msg} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreateMsg;
