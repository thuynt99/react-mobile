import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { Form, Icon, Input, Button, message, Spin } from "antd"
import { connect } from "react-redux"
import DocumentTitle from "react-document-title"
import "./index.less"
import { login, getUserInfo } from "@/store/actions"
import LayoutLogIn from "../layout/LayoutLogIn"

const Login = (props) => {
  const { form, token, login, getUserInfo } = props
  const { getFieldDecorator } = form

  const [loading, setLoading] = useState(false)

  const handleLogin = (username, password) => {
    setLoading(true)
    login(username, password)
      .then((data) => {
        message.success("Login successful")
        handleUserInfo(data.token)
      })
      .catch((error) => {
        setLoading(false)
        message.error(error)
      })
  }

  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        handleLogin(username, password)
      } else {
        console.log("Test failed!")
      }
    })
  }

  if (token) {
    return <Redirect to="/dashboard" />
  }
  return (
    <LayoutLogIn>
    <DocumentTitle title={"User login"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>User login</h2>
          </div>
          <Spin spinning={loading} tip="Logging in..">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter user name",
                  },
                ],
                initialValue: "admin",
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="username" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter the password",
                  },
                ],
                initialValue: "123456",
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
            <Form.Item></Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
    </LayoutLogIn>
  )
}

const WrapLogin = Form.create()(Login)

export default connect((state) => state.user, { login, getUserInfo })(WrapLogin)
