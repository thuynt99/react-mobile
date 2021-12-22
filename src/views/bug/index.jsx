import React, { Component } from "react"
import { connect } from "react-redux"
import { Table, Collapse, Button } from "antd"
import TypingCard from "@/components/TypingCard"
import { timestampToTime } from "@/utils"

const { Column } = Table
const { Panel } = Collapse

const obj = {}

class Bug extends Component {
  jsError = () => {
    console.log(obj.a.length)
  }
  loadResourceError = () => {
    let img = document.createElement("img")
    img.src = "/images/notExist.jpg"
    let parent = document.querySelector(".app-container")
    parent.appendChild(img)
  }
  render() {
    const cardContent = `This page is used to display the abnormal information collected through the buried points in the project. You can click different types of exception buttons to observe the captured exception information.`
    const { bugList } = this.props
    return (
      <div className="app-container">
        <TypingCard title="Bug" source={cardContent} />
        <br />
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Report an error" key="1">
            <Button type="primary" onClick={this.jsError}>
              jsError
            </Button>
            <Button type="primary" onClick={this.loadResourceError} style={{ marginLeft: "20px" }}>
              Resource loading exception
            </Button>
          </Panel>
        </Collapse>
        <br />
        <Table bordered rowKey={(record) => record.timestamp} dataSource={bugList} pagination={false}>
          <Column
            title="Serial number"
            dataIndex="id"
            key="id"
            width={60}
            render={(text, record, index) => index + 1}
          />
          <Column title="Monitoring indicators" dataIndex="kind" key="kind" width={80} />
          <Column title="Exception type" dataIndex="errorType" key="errorType" width={160} />
          <Column title="url" dataIndex="url" key="url" width={150} />
          <Column title="Exception information" dataIndex="desc" key="desc" width={300} ellipsis={true} />
          <Column title="Exception stack" dataIndex="stack" key="stack" width={300} ellipsis={true} />
          <Column title="Operation element" dataIndex="selector" key="selector" width={195} ellipsis={true} />
          <Column title="userAgent" dataIndex="userAgent" key="userAgent" width={100} />
          <Column
            title="time"
            dataIndex="timestamp"
            key="timestamp"
            width={100}
            render={(value) => timestampToTime(value)}
          />
        </Table>
      </div>
    )
  }
}

export default connect((state) => state.monitor)(Bug)
