import tracker from "../utils/tracker"
import onload from "../utils/onload"
import getLastEvent from "../utils/getLastEvent"
import getSelector from "../utils/getSelector"
export function timing() {
  let FMP, LCP
  if (PerformanceObserver) {
    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries()
      FMP = perfEntries[0]
      observer.disconnect()
    }).observe({ entryTypes: ["element"] })

    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries()
      LCP = perfEntries[0]
      observer.disconnect()
    }).observe({ entryTypes: ["largest-contentful-paint"] })

    new PerformanceObserver((entryList, observer) => {
      let lastEvent = getLastEvent()
      let firstInput = entryList.getEntries()[0]
      console.log("FID", firstInput)
      if (firstInput) {
        let inputDelay = firstInput.processingStart - firstInput.startTime
        let duration = firstInput.duration
        if (inputDelay > 0 || duration > 0) {
          tracker.send({
            kind: "experience",
            type: "firstInputDelay",
            inputDelay,
            duration,
            startTime: firstInput.startTime,
            selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : "",
          })
        }
      }
      observer.disconnect()
    }).observe({ type: "first-input", buffered: true })
  }

  onload(function () {
    setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = performance.timing
      tracker.send({
        kind: "experience",
        type: "timing",
        connectTime: connectEnd - connectStart,
        ttfbTime: responseStart - requestStart,
        responseTime: responseEnd - responseStart,
        parseDOMTime: loadEventStart - domLoading,
        domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
        timeToInteractive: domInteractive - fetchStart,
        loadTIme: loadEventStart - fetchStart,
      })

      let FP = performance.getEntriesByName("first-paint")[0]
      let FCP = performance.getEntriesByName("first-contentful-paint")[0]
      console.log("FP", FP)
      console.log("FCP", FCP)
      console.log("FMP", FMP)
      console.log("LCP", LCP)
      tracker.send({
        kind: "experience",
        type: "paint",
        firstPaint: FP.startTime,
        firstContentfulPaint: FCP.startTime,
        firstMeaningfulPaint: FMP.startTime,
        largestContentfulPaint: LCP.startTime,
      })
    }, 3000)
  })
}
