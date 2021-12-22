import React, { Component } from "react"
import { Form, Input, Select, Modal } from "antd"
import { reqValidatUserID } from "@/api/user"
const { TextArea } = Input
class AddUserForm extends Component {
  validatUserID = async (rule, value, callback) => {
    if (value) {
      if (!/^[a-zA-Z0-9]{1,6}$/.test(value)) {
        callback("User ID must be a combination of 1-6 numbers or letters")
      }
      let res = await reqValidatUserID(value)
      const { status } = res.data
      if (status) {
        callback("The user ID already exists")
      }
    } else {
      callback("Please enter user ID")
    }
    callback()
  }
  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    }
    return (
      <Modal title="Edit" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formItemLayout}>
          <Form.Item label="User ID:">
            {getFieldDecorator("id", {
              rules: [{ required: true, validator: this.validatUserID }],
            })(<Input placeholder="Please enter user ID" />)}
          </Form.Item>
          <Form.Item label="User name:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please enter the user name!" }],
            })(<Input placeholder="Please enter user name" />)}
          </Form.Item>
          <Form.Item label="User role:">
            {getFieldDecorator("role", {
              initialValue: "admin",
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="guest">guest</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="User description:">
            {getFieldDecorator("description", {})(<TextArea rows={4} placeholder="Please enter user description" />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: "AddUserForm" })(AddUserForm)
