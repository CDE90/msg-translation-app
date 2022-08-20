import type { Message } from "../lib/DBTools";
import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import editIcon from "../public/edit-icon.svg";
import deleteIcon from "../public/delete-icon.svg";

type Props = {
    msg: Message;
};

export default function MessageComponent({ msg }: Props) {
    const [copyButton, setCopyButton] = useState("Copy Share Link");

    return (
        <div id={msg._id} className="message-container">
            <h1 className="message-title">{msg.title}</h1>
            <ReactMarkdown children={msg.content} className="message-content" />
            <div className="flex-container">
                <h3 className="nav-profile-name">
                    Author: {msg.user.name} ({msg.user.email})
                </h3>
                <div className="message-user-image">
                    <Image
                        src={`${msg.user.image}`}
                        alt="profile"
                        width={50}
                        height={50}
                    />
                </div>
            </div>

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
                className="editor-submit-button"
            >
                {copyButton}
            </button>
            {msg.isOwner ? (
                <div className="flex-container">
                    <button className="message-edit-button">
                        <Image src={editIcon} width={25} height={25} />
                    </button>
                    <button className="message-delete-button">
                        <Image src={deleteIcon} width={25} height={25} />
                    </button>
                </div>
            ) : null}
        </div>
    );
}
