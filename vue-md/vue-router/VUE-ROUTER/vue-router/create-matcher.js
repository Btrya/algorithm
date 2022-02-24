import createRouteMap from './create-route-map'
import { createRoute } from './history/base'
export default function createMatcher(routes) {
  // pathList 会把所有的路由组成一个数组 ['/', '/about']
  // pathMap {/: {}, /about: {}}
  let { pathList, pathMap } = createRouteMap(routes)
  // 通过用户输入的路径 获取对应的匹配记录 routes是用户自己配置的 但是用起来不方便
  function match(location) {
    let record = pathMap[location]
    return createRoute(record, {
      path: location
    })
  }
  function addRoutes(routes) { // 动态添加的路由
    createRouteMap(routes, pathList, pathMap)
  }
  return {
    match,
    addRoutes
  }
}