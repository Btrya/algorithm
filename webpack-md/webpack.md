## webpack中的Module是什么？

webpack 支持 ESModule、CommonJS，AMD，Assets

1. ESM

关键字 export，允许将ESM中内容暴露给其他模块

关键字 import
```js
import { aa } from './a.js'

export { bb }
```

// package.json

type: module -> ESM
type: commonjs -> CommonJS

2. CommonJS

module.exports, 允许将commonJS中的内容暴露给其他模块

require

## webpack modules 如何表达自己的各种依赖关系

* ESM import 语句
* CommonJS require
* AMD define require
* css/sass/less @import

## chunk 和 bundle 的区别是什么？

chunk是过程，bundle是结果

1. chunk
chunk 是 webpack 打包过程中 modules 的集合， 是（打包过程中）的概念。

webpack 打包是从一个入口模块开始，入口模块引用其他模块，其他模块再引用其他模块...
webpack 通过引用关系逐个打包，这些modules最终就形成了一个chunk

如果有多个入口模块，可能会产出多条打包路径，每条路径最终都会形成一个chunk，有几个路径就有几个chunk

2. bundle

是我们最终输出的一个或者多个打包好的文件。

3. chunk 和 bundle 的关系是什么？

并不一定是一一对应的关系，大多数情况下，一个chunk会生产一个bundle，但也有例外。

## Plugin 和 loader 分别是做什么的？ 怎么工作的？
1. Loader

模块转换器，将非js模块转化为webpack能识别的js模块

本质上， webpack loader将左右类型的文件，转换为应用程序的 **依赖图** 可以直接引用的模块

2. Plugin

扩展插件， webpack 运行的各个阶段，都会广播出对应的事件。插件去监听对应的事件。

3. Compiler

对象，包含了 webpack 环境的所有配置信息。包括 option loader plugins
webpack 启动的时候实例化，它在全局是唯一的。可以把他理解为 webpack 的实例

4. Compliation

包含了当前的模块资源，编译生成资源。
webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一次新的 Compliation


## 能简单描述一下webpack的打包过程吗？
1. 初始化参数: shell webpack.config.js
2. 开始编译: 初始化一个Complier对象，加载所有的配置，开始执行编译
3. 确定入口: 根据entry中的配置，找出所有的入口文件
4. 编译模块: 从入口文件开始，调用所有的loader，再去递归的找依赖
5. 完成模块编译: 得到每个模块被翻译后的最终内容以及他们之间的依赖关系
6. 输出资源: 根据得到的依赖关系，组装成一个个包含多个module的chunk
7. 输出完成: 根据配置，确定要输出的文件名以及文件路径