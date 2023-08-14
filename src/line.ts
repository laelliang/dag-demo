import type { ILine } from './line.d'
import type { INode } from './node.d'
export default class Line implements ILine {
  dom: SVGGElement
  id: number
  pid: number
  parentNode: INode
  node: INode
  startXY: number[]
  endXY: number[]
  lineSpacing: number = 8
  namespace: string = "http://www.w3.org/2000/svg"
  constructor(parentNode: INode, node: INode) {
    this.id = node.id
    this.pid = parentNode.id
    this.parentNode = parentNode
    this.node = node

    // 父节点在左边
    if (node.x - parentNode.x >= this.lineSpacing * 2) {
      this.startXY = [parentNode.x + parentNode.width + this.lineSpacing, parentNode.y + parentNode.height / 2]
      this.endXY = [node.x - this.lineSpacing, node.y + node.height / 2]
    } else {
      this.startXY = [parentNode.x - this.lineSpacing, parentNode.y + parentNode.height / 2]
      this.endXY = [node.x + node.width + this.lineSpacing, node.y + node.height / 2]
    }

    const g = document.createElementNS(this.namespace, "g")

    const path = document.createElementNS(this.namespace, "path")
    const d = `M ${this.startXY.join(' ')} C ${(this.startXY[0] + this.endXY[0]) / 2} ${this.startXY[1]}, ${(this.startXY[0] + this.endXY[0]) / 2} ${this.endXY[1]}, ${this.endXY.join(' ')}`
    path.setAttribute('d', d)
    path.setAttribute('fill', "none")
    path.setAttribute('stroke', "#4175e4")

    const sCircle = document.createElementNS(this.namespace, "circle")
    sCircle.setAttribute('cx', String(this.startXY[0]))
    sCircle.setAttribute('cy', String(this.startXY[1]))
    sCircle.setAttribute('r', '2')
    sCircle.setAttribute('fill', '#0094ff')
    sCircle.setAttribute('stroke', '#4175e4')
    sCircle.setAttribute('stroke-width', '#2')

    const eCircle = document.createElementNS(this.namespace, "circle")
    eCircle.setAttribute('cx', String(this.endXY[0]))
    eCircle.setAttribute('cy', String(this.endXY[1]))
    eCircle.setAttribute('r', '2')
    eCircle.setAttribute('fill', '#0094ff')
    eCircle.setAttribute('stroke', '#4175e4')
    eCircle.setAttribute('stroke-width', '#2')

    g.appendChild(path)
    g.appendChild(sCircle)
    g.appendChild(eCircle)
    this.dom = g as SVGGElement

  }

}