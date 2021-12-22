import Clipboard from "clipboard"
import { message } from "antd"

function clipboardSuccess() {
  message.success("Copy successfully")
}

function clipboardError() {
  message.error("Copy failed")
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on("success", () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on("error", () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
