import { createContext } from "react"

export type DefaultContext = {
    markdownText: string
    setMarkdownText: (text: string) => void
    markdownTitleText: string
    setMarkdownTitleText: (text: string) => void
}

export const defaultContext: DefaultContext = {
    markdownText: "",
    setMarkdownText: () => {},
    markdownTitleText: "",
    setMarkdownTitleText: () => {}
}

export default createContext(defaultContext)