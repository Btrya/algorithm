// ast 语法树 是用对象来描述原生语法的    虚拟dom 用对象来描述dom节点的
import { parseHTML } from "./parser-html.js";
import { generate } from "./generate.js";

export function compileToFunction(template) {
  // 1. 解析html字符串 将html字符串 => ast语法树
  let root = parseHTML(template)
  // 需要将 ast 语法树生成最终的 render 函数 就是字符串拼接 (模板引擎)
  let code = generate(root)
  // console.log(code) // _c("div", {id: "app",style: {"color":" red","font-size":" 16px"}},_c("p", undefined,_v("hello"+_s(name))),_c("span", undefined,_v(_s(age))))
  // 所有的模板引擎实现 都需要new Function + with
  let renderFn = new Function(`with(this) { return ${code} }`) 
  return renderFn
}