import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
import tracker from "../utils/tracker"

const ERROR_RUNTIME = 1
const ERROR_SCRIPT = 2
const ERROR_STYLE = 3
const ERROR_IMAGE = 4
const ERROR_AUDIO = 5
const ERROR_VIDEO = 6
// const ERROR_CONSOLE = 7;
// const ERROR_TRY_CATHC = 8;

const LOAD_ERROR_TYPE = {
  SCRIPT: ERROR_SCRIPT,
  LINK: ERROR_STYLE,
  IMG: ERROR_IMAGE,
  AUDIO: ERROR_AUDIO,
  VIDEO: ERROR_VIDEO,
}

const JS_TRACKER_ERROR_DISPLAY_MAP = {
  1: "JS_RUNTIME_ERROR",
  2: "SCRIPT_LOAD_ERROR",
  3: "CSS_LOAD_ERROR",
  4: "IMAGE_LOAD_ERROR",
  5: "AUDIO_LOAD_ERROR",
  6: "VIDEO_LOAD_ERROR",
  7: "CONSOLE_ERROR",
  8: "TRY_CATCH_ERROR",
}

export function injectJsError() {
  window.addEventListener(
    "error",
    function (event) {
      let lastEvent = getLastEvent()
      const errorTarget = event.target
      if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
        tracker.send({
          kind: "stability",
          errorType: JS_TRACKER_ERROR_DISPLAY_MAP[LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]],
          desc: errorTarget.baseURI + "@" + (errorTarget.src || errorTarget.href),
          stack: "no stack",
          selector: getSelector(errorTarget),
        })
      } else {
        const { message, filename, lineno, colno, error } = event
        tracker.send({
          kind: "stability",
          errorType: JS_TRACKER_ERROR_DISPLAY_MAP[ERROR_RUNTIME],
          desc: `${message} at ${filename}:${lineno}:${colno}`,
          stack: error && error.stack ? error.stack : "no stack",
          selector: lastEvent ? getSelector(lastEvent.path) : "",
        })
      }
    },
    true
  )
  window.addEventListener(
    "unhandledrejection",
    (event) => {
      let lastEvent = getLastEvent()
      let message
      let filename
      let lineno = 0
      let colno = 0
      let stack = ""
      let reason = event.reason
      if (typeof reason === "string") {
        message = reason
      } else if (typeof reason === "object") {
        message = reason.message
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
          filename = matchResult[1]
          lineno = matchResult[2]
          colno = matchResult[3]
        }
        stack = reason.stack
      }
      tracker.send({
        kind: "stability",
        errorType: JS_TRACKER_ERROR_DISPLAY_MAP[ERROR_RUNTIME],
        desc: `${message} at ${filename}:${lineno}:${colno}`,
        stack,
        selector: lastEvent ? getSelector(lastEvent.path) : "",
      })
    },
    true
  )
}
