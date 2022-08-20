import { useContext, useState } from "react";
import editorContext from "../lib/editorContext";

export function MarkedInput() {
    const {
        setMarkdownText,
        setMarkdownTitleText,
        markdownText,
        markdownTitleText,
    } = useContext(editorContext);

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.currentTarget.value;
        setMarkdownText(newValue);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setMarkdownTitleText(newValue);
    };

    return (
        <div className="editor-input-container">
            {/* <h1>Markdown Text</h1> */}
            <input
                type={"text"}
                value={markdownTitleText}
                placeholder={"Enter a title"}
                onChange={handleTitleChange}
                className="editor-input-title"
            />
            <textarea
                onChange={onInputChange}
                value={markdownText}
                className="editor-input"
                placeholder={"Enter message content"}
            />
        </div>
    );
}
