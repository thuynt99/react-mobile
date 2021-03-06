class Typing {
  constructor(opts) {
    this.opts = opts || {}
    this.source = opts.source
    this.output = opts.output
    this.delay = opts.delay || 120
    this.chain = {
      parent: null,
      dom: this.output,
      val: [],
    }
    if (!(typeof this.opts.done === "function")) this.opts.done = function () {}
  }

  init() {
    this.chain.val = this.convert(this.source, this.chain.val)
  }

  convert(dom, arr) {
    let children = Array.from(dom.childNodes)
    for (let i = 0; i < children.length; i++) {
      let node = children[i]
      if (node.nodeType === 3) {
        arr = arr.concat(node.nodeValue.split(""))
      } else if (node.nodeType === 1) {
        let val = []
        val = this.convert(node, val)
        arr.push({
          dom: node,
          val: val,
        })
      }
    }
    return arr
  }

  print(dom, val, callback) {
    setTimeout(function () {
      dom.appendChild(document.createTextNode(val))
      callback()
    }, this.delay)
  }

  play(ele) {
    if (!ele.val.length) {
      if (ele.parent) this.play(ele.parent)
      else this.opts.done()
      return
    }
    let current = ele.val.shift()
    if (typeof current === "string") {
      this.print(ele.dom, current, () => {
        this.play(ele)
      })
    } else {
      let dom = current.dom.cloneNode()
      ele.dom.appendChild(dom)
      this.play({
        parent: ele,
        dom,
        val: current.val,
      })
    }
  }

  start() {
    this.init()
    this.play(this.chain)
  }
}

export default Typing
