import Mock from "mockjs"
const list = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: "@increment",
      title: "Title " + i,
      author: "Author " + i,
      readings: "@integer(300, 5000)",
      date: "@datetime",
    })
  )
}
export default {
  excelList: (_) => {
    return {
      code: 20000,
      data: { items: list },
    }
  },
}
