import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./en"
import ja from "./ja"
import vi from "./vi"

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: en,
    ja: ja,
    vi: vi,
  },
  debug: false,
  load: "current",

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
})

i18n.languages = ["en", "ja", "vi"]

export default i18n
