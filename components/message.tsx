import type { Message } from "../lib/DBTools";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

            <div className="message-button-container">
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `https://msg.ethancoward.dev/message/${msg._id}`
                        );
                        setCopyButton("Copied!");
                        setTimeout(() => {
                            setCopyButton("Copy Share Link");
                        }, 1000);
                    }}
                    className="copy-link-button"
                >
                    {copyButton}
                </button>
                {msg.isOwner ? (
                    <>
                        <Link href={`/message/edit/${msg._id}`}>
                            <a className="message-edit-button">
                                <Image src={editIcon} width={25} height={25} />
                            </a>
                        </Link>
                        <Link href={`api/delete/${msg._id}`}>
                            <a className="message-delete-button">
                                <Image
                                    src={deleteIcon}
                                    width={25}
                                    height={25}
                                />
                            </a>
                        </Link>
                    </>
                ) : null}
            </div>
        </div>
    );
}
