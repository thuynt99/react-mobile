import React from "react"
import TypingCard from "@/components/TypingCard"
const Doc = () => {
  const cardContent = `
    Please click here for development documents <a href="https://nlrx-wjc.github.io/react-antd-admin-template-doc/" target="_blank">react-antd-admin-template development documents</a a>.
    Currently under preparation...
  `
  return (
    <div className="app-container">
      <TypingCard title="Development Document" source={cardContent} />
    </div>
  )
}

export default Doc
