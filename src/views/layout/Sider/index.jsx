import React from "react"
import { connect } from "react-redux"
import { Layout, Drawer } from "antd"
import Logo from "./Logo"
import Menu from "./Menu"
import { toggleSiderBar } from "@/store/actions"
const { Sider } = Layout

const LayoutSider = (props) => {
  const { sidebarCollapsed, sidebarLogo, toggleSiderBar } = props

  return (
    <>
      <Drawer
        maskClosable
        closable={true}
        visible={!sidebarCollapsed}
        placement="left"
        width={200}
        style={{
          padding: 0,
          height: "100vh",
        }}
        className="hideOnDesktop"
        bodyStyle={{ backgroundColor: "#001529", padding: "0" }}
        onClose={toggleSiderBar}
      >
        {sidebarLogo ? <Logo /> : null}
        <Menu />
      </Drawer>
      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        trigger={null}
        style={{ zIndex: "10" }}
        breakpoint="lg"
        className="hideOnMobile"
      >
        {sidebarLogo ? <Logo /> : null}
        <Menu />
      </Sider>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  }
}
export default connect(mapStateToProps, { toggleSiderBar })(LayoutSider)
