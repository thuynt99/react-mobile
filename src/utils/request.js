import axios from "axios"
import store from "@/store"
import { Modal } from "antd"
import { getToken } from "@/utils/auth"
import { logout } from "@/store/actions"

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api base_url
  timeout: 5000, // request timeout
})

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getState().user.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => response,
  (response) => {
    const res = response.data
    if (res.code !== 20000) {
      return Promise.reject("error")
    } else {
      return response.data
    }
  },
  (error) => {
    console.log("err" + error) // for debug
    const { status } = error.response
    if (status === 403) {
      Modal.confirm({
        title: "Sure to log out?",
        content:
          "You have been logged out due to a long period of inactivity, you can cancel to stay on this page, or log in again",
        okText: "re-register",
        cancelText: "Cancel",
        onOk() {
          let token = store.getState().user.token
          store.dispatch(logout(token))
        },
        onCancel() {
          console.log("Cancel")
        },
      })
    }
    return Promise.reject(error)
  }
)

export default service
