import React from "react"
import Driver from "driver.js" // import driver.js
import "driver.js/dist/driver.min.css" // import driver.js css
import { Button } from "antd"
import TypingCard from "@/components/TypingCard"
import steps from "./steps"
const driver = new Driver({
  animate: true,
  opacity: 0.75,
  doneBtnText: "Finish",
  closeBtnText: "Closure",
  nextBtnText: "Next step",
  prevBtnText: "Previous",
})

const guide = function () {
  driver.defineSteps(steps)
  driver.start()
}
const Guide = function () {
  const cardContent = `The guide page is very useful for some people who are entering the project for the first time. You can briefly introduce the function of the project.
  This demo is based on <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>`
  return (
    <div className="app-container">
      <TypingCard title="Beginner's guide" source={cardContent} />
      <Button type="primary" onClick={guide}>
        Open boot
      </Button>
    </div>
  )
}

export default Guide
