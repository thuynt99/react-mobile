import React from "react"
import { connect } from "react-redux"
import Content from "./Content"
import Header from "./Header"
import RightPanel from "./RightPanel"
import Sider from "./Sider"
import BreadCrumb from "@/components/BreadCrumb"
import "./index.less"
import { Layout } from "antd"

const Main = (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <BreadCrumb />
        <Content />
        <RightPanel />
      </Layout>
    </Layout>
  )
}
export default connect((state) => state.settings)(Main)
