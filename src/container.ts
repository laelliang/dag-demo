import type { IContainer } from './container.d'
import { getNodeLinkList } from './utils'
import Node from './node'
import Line from './line'
export default class Container implements IContainer {
  dom: HTMLElement
  svgDom: SVGSVGElement
  namespace: string = "http://www.w3.org/2000/svg"
  lines: Array<any> = []
  nodes: Array<any> = []
  private _createNodeCallBack!: Function
  constructor(dom: HTMLElement) {
    dom.classList.add('link_line_container')
    this.dom = dom

    // 添加svg
    const svgElement = document.createElementNS(this.namespace, "svg") as SVGSVGElement
    svgElement.style.display = 'block'
    dom.appendChild(svgElement)
    this.svgDom = svgElement
  }
  setNode(callback: Function) {
    this._createNodeCallBack = callback
  }
  parse(data: any[]): void {

    // 获取起点
    const startNode = data.find(val => !val.pid || val.pid.length === 0)
    // 获取终点
    const endNode = data.find(val => {
      const itemIndex = data.findIndex(item => item.pid && item.pid.includes(val.id))
      return itemIndex < 0 ? true : false
    })

    // 获取节点链
    const nodeLinkList = getNodeLinkList(data, startNode, endNode)

    // 设置行宽与列高
    const rowWidth = 200
    const colHeight = 80

    // 多少列
    const maxLinkLength = Math.max(...nodeLinkList.map(val => val.length))
    // 多少行
    const linkListLength = nodeLinkList.length
    // 补全二维数组
    nodeLinkList.forEach(val => {
      if (val.length !== maxLinkLength) {
        val.splice(1, 0, ... Array(maxLinkLength - val.length).fill(undefined))
      }
    })

    // 已渲染节点列表
    const renderedNodesList: any[] = []

    // 第几列
    for (let i = 0; i < maxLinkLength; i++) {
      // 第几行
      const nodeArr: any[] = []
      nodeLinkList.forEach(rowList => {
        nodeArr.push(rowList[i])
      })

      // 空项数量(包括重复)
      let nullItmeNum = 0

      // 列节点数组
      const colNodeArr = nodeArr.filter((val, i) => {
        if (!val) {
          nullItmeNum++
          return false
        }
        const itemIndex = nodeArr.findIndex((item, j) => item && item.id === val.id && j > i)
        const isRendered = renderedNodesList.includes(val.id)
        if (itemIndex < 0 && !isRendered) {
          renderedNodesList.push(val.id)
          return true
        } else {
          nullItmeNum++
          return false
        }
      })
      // 非空数量
      const notNullNum = nodeArr.length - nullItmeNum

      // 计算所需宽高
      const domWidth = this.dom.clientWidth
      const domHeight = this.dom.clientHeight
      const svgHeight = linkListLength * colHeight
      const svgWidth = maxLinkLength * rowWidth

      // 所需高小于实际高
      const topMargin = svgHeight < domHeight ? (domHeight - svgHeight) / 2 : 0
      // 所需宽小于实际宽
      const leftMargin = svgWidth < domWidth ? (domWidth - svgWidth) / 2 : 0

      this.svgDom.setAttribute('width', String(svgWidth > domWidth ? svgWidth : domWidth))
      this.svgDom.setAttribute('height', String(svgHeight > domHeight ? svgHeight : domHeight))
      colNodeArr.forEach((nodeData, j) => {
        const nodeX = (i + 0.5) * rowWidth + leftMargin
        // const nodeY =  (nullItmeNum / notNullNum + 1) * colHeight * (j + 0.5) + topMargin
        const nodeY = colHeight * (j + 0.5 + nullItmeNum / 2) + topMargin
        // 渲染节点
        const node = new Node(this.dom, this._createNodeCallBack, nodeData, nodeX, nodeY)
        this.nodes.push(node)
      })

      


      colNodeArr.forEach(nodeData => {
        // 渲染连接线
        if (nodeData.pid && nodeData.pid.length > 0) {
          const node = this.nodes.find(val => val.id === nodeData.id)
          nodeData.pid.forEach((pid: number) => {
            const parentNode = this.nodes.find(val => val.id === pid)
            const line = new Line(parentNode, node)
            this.lines.push(line)
            this.svgDom.appendChild(line.dom)
          })
        }
      })
    }
  }
    
}