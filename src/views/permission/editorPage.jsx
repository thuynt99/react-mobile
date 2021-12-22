import React from "react"
import TypingCard from "@/components/TypingCard"
const GuestPage = () => {
  const cardContent = `This page can only be accessed by the admin and editor roles, and cannot be seen by the guest role`
  return (
    <div className="app-container">
      <TypingCard title="editor page" source={cardContent} />
    </div>
  )
}

export default GuestPage
