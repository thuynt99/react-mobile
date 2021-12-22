import React from "react"
import { Card } from "antd"
import Markdown from "@/components/Markdown"
import TypingCard from "@/components/TypingCard"

const MarkdownDemo = () => {
  const cardContent = `
  The Markdown editor used on this page is <a href="https://github.com/nhn/tui.editor/tree/master/apps/react-editor" target="_blank">tui.editor(React version )</a>.
  `
  return (
    <div className="app-container">
      <TypingCard title="Beginner's guide" source={cardContent} />
      <br />
      <Card bordered={false}>
        <Markdown />
      </Card>
    </div>
  )
}

export default MarkdownDemo
