export interface IContainer {
  dom: HTMLElement
  svgDom: SVGSVGElement
  namespace: string
  lines: Array<any>
  nodes: Array<any>
  parse(data: Array<any>): void
  setNode(callback: Function): void
}

export interface DataItem {
  id: number,
  pid: number[],
  type: number,
  auditMode: number,
  pass: boolean,
  title: string,
  condition: string
}

export interface TreeDataItem {
  pid: number[],
  id: number,
  data: DataItem,
  children?: TreeDataItem[]
}