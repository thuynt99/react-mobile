import React from "react"
import TypingCard from "@/components/TypingCard"
const GuestPage = () => {
  const cardContent = `This page can only be accessed by the admin and guest roles, not the editor role`
  return (
    <div className="app-container">
      <TypingCard title="guest page" source={cardContent} />
    </div>
  )
}

export default GuestPage
