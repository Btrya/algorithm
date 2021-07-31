// 插件主体
module.export = () => {
  return {
    visitor: {
      // 插件主要功能
      Identifier(path) {
        const _nodeName = path.node.name
        const _nodeType = path.node.type
      }
    }
  }
}  