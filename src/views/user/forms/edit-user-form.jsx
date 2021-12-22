import React, { Component } from "react"
import { Form, Input, Select, Modal } from "antd"
const { TextArea } = Input
class EditUserForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } = this.props
    const { getFieldDecorator } = form
    const { id, name, role, description } = currentRowData
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
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="User name:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please enter user name!" }],
              initialValue: name,
            })(<Input placeholder="Please enter user name" />)}
          </Form.Item>
          <Form.Item label="User role:">
            {getFieldDecorator("role", {
              initialValue: role,
            })(
              <Select style={{ width: 120 }} disabled={id === "admin"}>
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="editor">editor</Select.Option>
                <Select.Option value="guest">guest</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="User description:">
            {getFieldDecorator("description", {
              initialValue: description,
            })(<TextArea rows={4} placeholder="Please enter user description" />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: "EditUserForm" })(EditUserForm)
