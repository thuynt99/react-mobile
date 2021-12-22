import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { Form, Icon, Input, Button, message, Spin, Layout } from "antd"
import { connect } from "react-redux"
import DocumentTitle from "react-document-title"
import "./index.less"
import { Component } from "react"

class LayoutLogIn extends Component {
  render() {
    return (
    <Layout>
          {this.props.children}
    </Layout>
    )
  }
}


export default LayoutLogIn
