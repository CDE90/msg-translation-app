import { MarkedInput } from "./markedInput";
import { Result } from "./result";
import { useState } from "react";
import EditorContext from "../lib/editorContext";
import type { DefaultContext } from "../lib/editorContext";

export default function Editor() {
    const [markdownText, setMarkdownText] = useState("");
    const [markdownTitleText, setMarkdownTitleText] = useState("");

    const contextValue: DefaultContext = {
        markdownText,
        setMarkdownText,
        markdownTitleText,
        setMarkdownTitleText,
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <div>
                <MarkedInput />
                <Result />
            </div>
        </EditorContext.Provider>
    );
}
