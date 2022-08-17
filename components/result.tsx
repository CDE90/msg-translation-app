import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useContext } from "react";
import editorContext from "../lib/editorContext";

export function Result() {
    const { markdownText, markdownTitleText } = useContext(editorContext);

    return (
        <div className="editor-result-container">
            <input
                type={"text"}
                disabled={true}
                className="editor-result-title"
                value={markdownTitleText}
                placeholder="Text Preview"
            />
            <div className="editor-result">
                <ReactMarkdown
                    children={markdownText}
                    remarkPlugins={[remarkGfm]}
                    className="editor-md-field"
                />
            </div>
        </div>
    );
}
