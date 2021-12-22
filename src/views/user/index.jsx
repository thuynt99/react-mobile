import React, { Component } from "react"
import { Card, Button, Table, message, Divider } from "antd"
import { withTranslation } from "react-i18next"
import { getUsers, deleteUser, editUser, addUser } from "@/api/user"
import TypingCard from "@/components/TypingCard"
import EditUserForm from "./forms/edit-user-form"
import AddUserForm from "./forms/add-user-form"
const { Column } = Table
class User extends Component {
  state = {
    users: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
  }
  getUsers = async () => {
    const result = await getUsers()
    const { users, status } = result.data
    if (status === 0) {
      this.setState({
        users,
      })
    }
  }
  handleEditUser = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editUserModalVisible: true,
    })
  }

  handleDeleteUser = (row) => {
    const { id } = row
    if (id === "admin") {
      message.error("Cannot delete admin user！")
      return
    }
    deleteUser({ id }).then((res) => {
      message.success("Successfully deleted")
      this.getUsers()
    })
  }

  handleEditUserOk = (_) => {
    const { form } = this.editUserFormRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ editModalLoading: true })
      editUser(values)
        .then((response) => {
          form.resetFields()
          this.setState({ editUserModalVisible: false, editUserModalLoading: false })
          message.success("Edit successfully!")
          this.getUsers()
        })
        .catch((e) => {
          message.success("Editing failed, please try again!")
        })
    })
  }

  handleCancel = (_) => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    })
  }

  handleAddUser = (row) => {
    this.setState({
      addUserModalVisible: true,
    })
  }

  handleAddUserOk = (_) => {
    const { form } = this.addUserFormRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ addUserModalLoading: true })
      addUser(values)
        .then((response) => {
          form.resetFields()
          this.setState({ addUserModalVisible: false, addUserModalLoading: false })
          message.success("Added successfully!")
          this.getUsers()
        })
        .catch((e) => {
          message.success("Failed to add, please try again!")
        })
    })
  }
  componentDidMount() {
    this.getUsers()
  }
  render() {
    const { t } = this.props
    console.log(t("user.id"))
    const { users } = this.state
    const title = (
      <span>
        <Button type="primary" onClick={this.handleAddUser}>
          Add user
        </Button>
      </span>
    )
    const cardContent = `Here, you can manage users in the system, such as adding a new user, or modifying users that already exist in the system。`
    return (
      <div className="app-container">
        <TypingCard title="User Management" source={cardContent} />
        <br />
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={users} pagination={false}>
            <Column title={t("user.id")} dataIndex="id" key="id" align="center" />
            <Column title={t("user.name")} dataIndex="name" key="name" align="center" />
            <Column title={t("user.role")} dataIndex="role" key="role" align="center" />
            <Column title={t("user.description")} dataIndex="description" key="description" align="center" />
            <Column
              title={t("user.action")}
              key="action"
              width={195}
              align="center"
              render={(text, row) => (
                <span>
                  <Button
                    type="primary"
                    shape="circle"
                    icon="edit"
                    title="Edit"
                    onClick={this.handleEditUser.bind(null, row)}
                  />
                  <Divider type="vertical" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="delete"
                    title="Delete"
                    onClick={this.handleDeleteUser.bind(null, row)}
                  />
                </span>
              )}
            />
          </Table>
        </Card>
        <EditUserForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) => (this.editUserFormRef = formRef)}
          visible={this.state.editUserModalVisible}
          confirmLoading={this.state.editUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditUserOk}
        />
        <AddUserForm
          wrappedComponentRef={(formRef) => (this.addUserFormRef = formRef)}
          visible={this.state.addUserModalVisible}
          confirmLoading={this.state.addUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleAddUserOk}
        />
      </div>
    )
  }
}

export default withTranslation("translations")(User)
