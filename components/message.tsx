import type { Message } from "../lib/db_tools";
import { useState } from "react";
import Image from "next/image";

type Props = {
    msg: Message;
};

export default function MessageComponent({ msg }: Props) {
    const [copyButton, setCopyButton] = useState("Copy Share Link");

    return (
        <div id={msg._id}>
            <h1>{msg.title}</h1>
            <p>{msg.content}</p>
            <p>{msg.user.name}</p>
            <p>{msg.user.email}</p>
            <Image
                src={`${msg.user.image}`}
                alt="profile"
                width={50}
                height={50}
            />
            <button
                onClick={() => {
                    navigator.clipboard.writeText(
                        `http://localhost:3000/message/${msg._id}`
                    );
                    setCopyButton("Copied!");
                    setTimeout(() => {
                        setCopyButton("Copy Share Link");
                    }, 1000);
                }}
            >
                {copyButton}
            </button>
            <p>Share Link: {`localhost:3000/message/${msg._id}`}</p>
        </div>
    );
}
