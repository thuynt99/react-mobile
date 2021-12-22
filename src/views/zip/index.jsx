import React, { Component } from "react"
import { Table, Tag, Form, Icon, Button, Input, message, Collapse } from "antd"
import { excelList } from "@/api/excel"
const { Panel } = Collapse
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 200,
    align: "center",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 200,
    align: "center",
  },
  {
    title: "Author",
    key: "author",
    dataIndex: "author",
    width: 100,
    align: "center",
    render: (author) => <Tag key={author}>{author}</Tag>,
  },
  {
    title: "Readings",
    dataIndex: "readings",
    key: "readings",
    width: 195,
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 195,
    align: "center",
  },
]
class Zip extends Component {
  _isMounted = false
  state = {
    list: [],
    filename: "file",
    downloadLoading: false,
    selectedRows: [],
    selectedRowKeys: [],
  }
  fetchData = () => {
    excelList().then((response) => {
      const list = response.data.data.items
      if (this._isMounted) {
        this.setState({ list })
      }
    })
  }
  componentDidMount() {
    this._isMounted = true
    this.fetchData()
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows, selectedRowKeys })
  }
  handleDownload = (type) => {
    if (type === "selected" && this.state.selectedRowKeys.length === 0) {
      message.error("Select at least one item for export")
      return
    }
    this.setState({
      downloadLoading: true,
    })
    import("@/lib/Export2Zip").then((zip) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"]
      const filterVal = ["id", "title", "author", "readings", "date"]
      const list = type === "all" ? this.state.list : this.state.selectedRows
      const data = this.formatJson(filterVal, list)

      zip.export_txt_to_zip(tHeader, data, this.state.filename, this.state.filename)
      this.setState({
        selectedRowKeys: [],
        downloadLoading: false,
      })
    })
  }
  formatJson(filterVal, jsonData) {
    return jsonData.map((v) => filterVal.map((j) => v[j]))
  }
  filenameChange = (e) => {
    this.setState({
      filename: e.target.value,
    })
  }
  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Export Options" key="1">
            <Form layout="inline">
              <Form.Item label="File name:">
                <Input
                  style={{ width: "250px" }}
                  prefix={<Icon type="file" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Please enter the file name (default file)"
                  onChange={this.filenameChange}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="file-zip" onClick={this.handleDownload.bind(null, "all")}>
                  Export all
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="file-zip" onClick={this.handleDownload.bind(null, "selected")}>
                  Export selected items
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={this.state.list}
          pagination={false}
          rowSelection={rowSelection}
          loading={this.state.downloadLoading}
        />
      </div>
    )
  }
}

export default Zip
