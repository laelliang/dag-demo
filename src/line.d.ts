import type { INode } from './node.d'
export interface ILine {
  dom: SVGGElement
  id: number
  pid: number
  parentNode: INode
  node: INode
  startXY: number[]
  endXY: number[]
  lineSpacing: number
  namespace: string
}
