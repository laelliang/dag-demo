export const getNodeLinkList = (nodes: any[], startNode: any, endNode: any) => {
  const nodeLink: any[] = []

  const dfs = (node: any, path: any[]) => {
    // 起点等于终点时
    if (node.id === startNode.id) {
      nodeLink.push([node, ...path])
      return;
    }
    
    // 找父节点
    for (const id of node.pid) {
      const neighbor = nodes.find(val => val.id === id)
      dfs(neighbor, [node, ...path])
    }
  }

  dfs(endNode, [])

  return nodeLink
}
