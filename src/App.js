import React, { Component } from "react"
import { Provider } from "react-redux"
import { ConfigProvider } from "antd"
import enUS from "antd/lib/locale/en_US"
import store from "./store"
import Router from "./router"
import { I18nextProvider } from "react-i18next"
import i18n from "./translations/i18n"
class App extends Component {
  render() {
    return (
      <ConfigProvider locale={enUS}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Router />
          </I18nextProvider>
        </Provider>
      </ConfigProvider>
    )
  }
}

export default App
