import type { INode } from './node.d'
export default class Node implements INode {
  dom: HTMLElement
  container: HTMLElement
  data: any
  id: number
  x: number
  y: number
  width: number
  height: number
  constructor(container: HTMLElement, callBack: Function, data: any, x: number, y: number) {
    const dom = callBack(data)
    dom.style.display = 'inline-block'
    container.appendChild(dom)
    const width = dom.clientWidth
    const height = dom.clientHeight
    this.x = x - width / 2
    this.y = y - height / 2
    dom.classList.add('link_line_container_node')
    dom.style.left = `${this.x}px`
    dom.style.top = `${this.y}px`
    this.id = data.id
    this.dom = dom
    this.data = data
    this.container = container
    this.width = width
    this.height = height
  }
}