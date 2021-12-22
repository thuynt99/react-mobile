import React from "react"
import TypingCard from "@/components/TypingCard"
export default () => {
  const cardContent = `
  The menu permissions and routing permissions in this project are assigned based on the user's role. There are three built-in roles in this project, namely:
    
  <ul>
    <li>Administrator admin: This role has the authority of all menus and routing in the system. </li>
    <li>Editor editor: This role has the authority of all menus and routes in the system except the user management page. </li>
    <li>Guest guest: This role only has the permissions of the Dashboard, development documents, permission testing, and the author's three pages. </li>
  </ul>
 
  You can dynamically add or delete users through the <a href="#/user">user management</a> page, and edit an existing user, such as modifying its permissions.
  `
  return (
    <div className="app-container">
      <TypingCard title="Permission description" source={cardContent} />
    </div>
  )
}
