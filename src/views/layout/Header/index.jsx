import React from "react"
import { connect } from "react-redux"
import { Menu, Dropdown, Modal, Layout, Avatar } from "antd"
import { Link } from "react-router-dom"
import { logout, getUserInfo } from "@/store/actions"
import Hamburger from "@/components/Hamburger"
import "./index.less"
const { Header } = Layout

const LayoutHeader = (props) => {
  const { token, avatar, sidebarCollapsed, logout, getUserInfo, fixedHeader } = props
  token && getUserInfo(token)
  const handleLogout = (token) => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to log out of the system?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => {
        logout(token)
      },
    })
  }
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token)
        break
      default:
        break
    }
  }
  const menuAccount = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">Home</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a target="_blank" href="https://github.com/" rel="noopener noreferrer">
          Document
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  )
  const computedStyle = () => {
    let styles
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        }
      } else {
        styles = {
          width: "calc(100% - 200px)",
        }
      }
    } else {
      styles = {
        width: "100%",
      }
    }
    return styles
  }
  return (
    <>
      {fixedHeader ? <Header /> : null}
      <Header style={computedStyle()} className={fixedHeader ? "fix-header" : ""}>
        <Hamburger />
        <div className="right-menu">
          <div className="dropdown-wrap">
            <Dropdown overlay={menuAccount}>
              <div>
                <Avatar shape="square" size="medium" src={avatar} />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  }
}
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader)
