import React from "react"
import RichTextEditor from "@/components/RichTextEditor"
import TypingCard from "@/components/TypingCard"

const RichTextEditorDemo = () => {
  const cardContent = `
  The rich text editor used on this page is <a href="https://github.com/jpuri/react-draft-wysiwyg">react-draft-wysiwyg</a>.
  `
  return (
    <div className="app-container">
      <TypingCard title="Beginner's guide" source={cardContent} />
      <br />
      <RichTextEditor />
    </div>
  )
}

export default RichTextEditorDemo
