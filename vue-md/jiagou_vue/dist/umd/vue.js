(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // 我要重写数组的哪些方法？
  // push shift unshift pop reverse sort splice 会导致数组本身发生变化
  // slice是不会的
  var oladArrayMethods = Array.prototype; // value.__proto__ = arrayMethods 原型链查找 会向上查找，先查找我重写的，重写的没有会继续向上查找
  // arrayMethods.__proto__ = oladArrayMethods

  var arrayMethods = Object.create(oladArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // AOP 切片编程
      var result = oladArrayMethods[method].apply(this, args); // 调用原生的数组方法
      // push unshift 添加的元素可能还是一个对象

      var inserted; // 当前用户插入的元素

      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          // 3个参数  有 删除 修改的功能 arr.splice(0, 1, {name: 1})
          inserted = args.slice(2);
          break;
      }

      if (inserted) {
        ob.observeArray(inserted); // 将新增属性继续观测
      }

      ob.dep.notify(); // 如果用户调用了push方法 我会通知当前这个dep去更新

      return result;
    };
  });

  /**
   * @param {*} data 当前数据是不是对象
   */
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  }
  /**
   * 
   * @param {*} data 对该值设置属性
   * @param {*} key  设置的属性名
   * @param {*} value  设置的值
   */

  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      // 不可枚举
      configurable: false,
      // 不可被配置
      value: value
    });
  }
  /**
   * 取值代理
   * @param {*} vm 实例
   * @param {*} source 取值位置
   * @param {*} key 键
   */

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];
  var strats = {};

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      // 如果已经合并过了 就不需要再次合并了
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    } // 默认合并策略 但是有些属性需要有特殊的合并方式 比如生命周期/data


    function mergeField(key) {
      if (strats[key]) {
        return options[key] = strats[key](parent[key], child[key]);
      }

      if (_typeof(parent[key]) === 'object' && _typeof(child[key]) === 'object') {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else if (child[key] == null) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }

  var id$1 = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id$1++;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 让这个watcher 记住我当前的dep
        Dep.target.addDep(this);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher); // 观察者模式
      }
    }]);

    return Dep;
  }();

  var stack$1 = []; // 目前可以做到 将watcher保留起来和移除

  function pushTarget(watcher) {
    Dep.target = watcher;
    stack$1.push(watcher);
  }
  function popTarget() {
    stack$1.pop();
    Dep.target = stack$1[stack$1.length - 1];
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      this.dep = new Dep(); // 单独给数组用的
      // vue 如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
      // vue3 proxy 不需要递归 也不需要增加set和get方法
      // 给每一个监控过的对象都增加一个__ob__属性
      // Object.defineProperty(value, '__ob__', {
      //   enumerable: false, // 不可枚举
      //   configurable: false, // 不可被配置
      //   value: this
      // })

      def(value, '__ob__', this); // 对数组监控

      if (Array.isArray(value)) {
        // 如果是数组的话 并不会对索引进行观测 因为会导致性能问题
        // 前端开发中 很少很少去操作索引 push shift unshift pop 数组方法重写
        value.__proto__ = arrayMethods; // 函数劫持/代理
        // 如果数组里放的是对象我再监控

        this.observeArray(value);
      } else {
        // 遍历对象
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // [name, age, address]

        keys.forEach(function (key, index) {
          defineReactive(data, key, data[key]); // 定义响应式
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(arr) {
        for (var i = 0; i < arr.length; ++i) {
          observe(arr[i]);
        }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    var dep = new Dep(); // 这个dep是给对象用的
    // 这里这个value可能是数组 也可能是对象，返回的结果是observer的实例，当前这个value对应的observer

    var childOb = observe(value); // 递归实现深度检测
    // 闭包

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function get() {
        // 获取值的时候做一些操作 这里取到的每个属性都对应着自己的watcher
        if (Dep.target) {
          // 如果当前有watcher
          dep.depend(); // 意味着我要将watcher存起来

          if (childOb) {
            // 数组的依赖收集
            childOb.dep.depend(); // 收集了数组的相关依赖
            // 如果数组中还有数组

            if (Array.isArray(value)) {
              depenArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newValue) {
        // 也可以做一些操作
        if (newValue === value) return;
        observe(newValue); // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象

        value = newValue;
        dep.notify(); // 通知依赖的watcher来进行一个更新操作
      }
    });
  }

  function depenArray(value) {
    for (var i = 0; i < value.length; ++i) {
      var current = value[i]; // 将数组中的每一个都取出来 数据变化后 也去更新视图
      // 数组中的数组的依赖收集

      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        depenArray(current);
      }
    }
  }

  function observe(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    }

    return new Observer(data); // 用来观测数据
  }

  function initState(vm) {
    var opts = vm.$options; // vue的数据来源：属性 方法 数据 计算属性 watch

    if (opts.props) {
      // 属性传递
      initProps(vm, opts.props);
    }

    if (opts.methods) {
      initMethods(vm, opts.methods);
    }

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) {
      initComputed(vm, opts.computed);
    }

    if (opts.watch) ;
  }

  function initProps(vm) {}

  function initMethods(vm) {}

  function initData(vm) {
    // 数据初始化工作
    var data = vm.$options.data; // 用户传递的data

    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}; // 对象劫持 用户改变了数据 我希望可以得到通知 => 刷新页面
    // MVVM模式 数据变化可以驱动视图变化
    // Object.defineProperty() 给属性增加set方法和get方法
    // 为了让用户更好的使用 vm.name 代理到 vm._data.name

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data); // 响应式原理
  }

  function initComputed(vm) {}

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // abc-aaa

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // <aaa:asdads>

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>
  var root = null; // ast语法树的树根

  var currentParent; // 标识当前父亲是谁

  var stack = [];
  var ELEMENT_TYPE = 1;
  var TEXT_TYPE = 3;

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: ELEMENT_TYPE,
      children: [],
      attrs: attrs,
      parent: null
    };
  }

  function start(tagName, attrs) {
    // 遇到开始标签 就创建一个ast元素s
    var element = createASTElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element; // 把当前元素标记成父ast树

    stack.push(element); // 将开始标签存放到栈中
  }

  function chars(text) {
    text = text.replace(/\s/g, '');

    if (text) {
      currentParent.children.push({
        text: text,
        type: TEXT_TYPE
      });
    }
  }

  function end(tagName) {
    var element = stack.pop(); // 拿到的是ast对象
    // 这里tagName和element一定是同一个标签，如果不一致就要报错
    // 我要标识当前这个p是属于这个div的儿子的

    currentParent = stack[stack.length - 1];

    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element); // 实现了一个树的父子关系
    }
  }

  function parseHTML(html) {
    // 不停的去解析html字符串
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        // 如果当前索引为0 肯定是一个标签 开始标签 结束标签
        var startTagMatch = parseStartTag(); // 通过这个方法获取到匹配的结果 tagName,attrs

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs); // 1解析开始标签

          continue; // 如果开始标签匹配完毕后 继续下一次 匹配
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]); // 2解析结束标签

          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text); // 3解析文本
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 将标签删除

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 将属性进行解析
          advance(attr[0].length); // 将属性去掉

          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        if (_end) {
          // 去掉开始标签的 >
          advance(_end[0].length);
          return match;
        }
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    // 处理属性 拼接成属性的字符串
    var str = '';

    for (var i = 0; i < attrs.length; ++i) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          // style="color: red;" => {style: {color: 'red'}}
          var obj = {};
          attr.value.split(";").forEach(function (item) {
            var _item$split = item.split(":"),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ": ").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children && children.length > 0) {
      return "".concat(children.map(function (child) {
        return gen(child);
      }));
    } else {
      return false;
    }
  }

  function gen(node) {
    if (node.type == 1) {
      // 元素标签
      return generate(node);
    } else {
      // 文本
      var text = node.text;
      var tokens = [];
      var match, index; // 每次的偏移量 buffer.split()

      var lastIndex = defaultTagRE.lastIndex = 0; // 正则的问题 lastIndex的问题 exec每次会叠加 要置0

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      } // _v("a" + _s(name) + "b" + _s(age) + "c")


      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function generate(el) {
    var children = genChildren(el);
    var code = "_c(\"".concat(el.tag, "\", ").concat(el.attrs.length > 0 ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")\n  ");
    return code;
  }

  // ast 语法树 是用对象来描述原生语法的    虚拟dom 用对象来描述dom节点的
  function compileToFunction(template) {
    // 1. 解析html字符串 将html字符串 => ast语法树
    var root = parseHTML(template); // 需要将 ast 语法树生成最终的 render 函数 就是字符串拼接 (模板引擎)

    var code = generate(root); // console.log(code) // _c("div", {id: "app",style: {"color":" red","font-size":" 16px"}},_c("p", undefined,_v("hello"+_s(name))),_c("span", undefined,_v(_s(age))))
    // 所有的模板引擎实现 都需要new Function + with

    var renderFn = new Function("with(this) { return ".concat(code, " }"));
    return renderFn;
  }

  var id = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, callback, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.callback = callback;
      this.options = options;
      this.id = id++;
      this.getter = exprOrFn; // 将内部传过来的回调函数放到getter属性上

      this.depsId = new Set(); // set不能放重复项

      this.deps = [];
      this.get(); // 调用get方法 会让渲染watcher执行
    }

    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        // watcher里不能放重复的dep  dep里不能放重复的watcher
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.depsId.add(id);
          this.deps.push(dep);
          dep.addSub(this);
        }
      }
    }, {
      key: "get",
      value: function get() {
        pushTarget(this); // 把watcher存起来 Dep.target

        this.getter(); // 渲染watcher的执行

        popTarget(); // 移除watcher
      }
    }, {
      key: "update",
      value: function update() {
        this.get();
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    // 1.判断是更新还是要渲染
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldElm = oldVnode; // div id="app"

      var parentElm = oldElm.parentNode; // body

      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm); // 将渲染好的结果返回

      return el;
    } // 递归创建真实节点 替换掉老的节点

  }

  function createElm(vnode) {
    // 根据虚拟节点创建真实的节点
    var tag = vnode.tag;
        vnode.data;
        vnode.key;
        var children = vnode.children,
        text = vnode.text; // 是标签就创建标签

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        // 递归创建儿子节点 将儿子节点扔到父节点中
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      // 如果不是标签就是文本
      // 虚拟dom上映射真实dom 方便后续更新操作
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  } // 更新属性


  function updateProperties(vnode) {
    var newProps = vnode.data || {};
    var el = vnode.el;

    for (var key in newProps) {
      if (key === 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    // 虚拟节点变成真实节点
    Vue.prototype._update = function (vnode) {
      var vm = this; // 我要通过虚拟节点 渲染出真实的dom

      vm.$el = patch(vm.$el, vnode); // 需要用虚拟节点创建出真实节点 替换掉真实的$el
    };
  }
  function mountComponent(vm, el) {
    vm.$options; // render方法

    vm.$el = el; // 代表真实的dom元素
    // Wathcer 用来渲染的
    // vm._render 通过解析的render方法 渲染出虚拟dom
    // vm._update 通过虚拟dom创建真实dom

    callHook(vm, 'beforeMount'); // 渲染页面

    var updateComponent = function updateComponent() {
      // 无论是渲染还是更新都会调用此方法
      // 返回的是虚拟dom 生成真实dom
      vm._update(vm._render());
    }; // 渲染watcher 每个组件都有一个watcher


    new Watcher(vm, updateComponent, function () {}, true); // true表示它是一个渲染watcher

    callHook(vm, 'mounted');
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook]; // [fn, fn, ...]

    if (handlers) {
      // 找到对应的钩子依次执行
      for (var i = 0; i < handlers.length; ++i) {
        handlers[i].call(vm);
      }
    }
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据的劫持
      var vm = this; // vue 中使用 thi.$options 指代的就是用户传递的属性
      // vm.constructor.options 将用户传递的 和 全局的进行一个合并 比如 A extends Vue

      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, 'beforeCreate'); // 初始化状态

      initState(vm); // 分割代码

      callHook(vm, 'created'); // 如果用户传入了 el 属性，需要把页面渲染出来
      // 如果用户传入了 el 就要实现挂载流程

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 默认先会查找有没有render方法，没有render会采用template，template也没有就用el中的内容

      if (!options.render) {
        // 对模板进行编译
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML; // 有兼容性问题，可以创建一个div然后扔进去
        }

        var render = compileToFunction(template);
        options.render = render; // 我们需要将template 转化成 render方法 vue1.0 2.0有了虚拟dom
      } // options.render
      // 挂载这个组件


      mountComponent(vm, el);
    };
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var key = data.key;

    if (key) {
      delete data.key;
    }

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, key, children, undefined);
  }
  function createTextNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }

  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  } // 虚拟节点 就是通过 _c _v 实现都用对象来描述dom的操作

  function renderMixin(Vue) {
    // _c 是创建元素的虚拟节点
    // _v 创建文本的虚拟节点
    // _s JSON.stringify
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments); // tag, data, children1, children2...
    };

    Vue.prototype._v = function (text) {
      return createTextNode(text);
    };

    Vue.prototype._s = function (val) {
      return val == null ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    }; // 渲染成为一个虚拟节点


    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm); // 去实例上取值

      return vnode;
    };
  }

  function initGlobalAPI(Vue) {
    // 整合了所有的全局相关的内容
    Vue.options = {};

    Vue.mixin = function (mixin) {
      // 如何实现两个对象的合并
      this.options = mergeOptions(this.options, mixin);
    }; // 生命周期的合并策略 [beforeCreate, beforeCreate]
    // Vue.mixin({
    //   a: 1,
    //   beforeCreate() {
    //     console.log('mixin 1')
    //   },
    // })
    // Vue.mixin({
    //   b: 2,
    //   beforeCreate() {
    //     console.log('mixin 2')
    //   },
    // })

  }

  // Vue 的核心代码 只是Vue的一个声明

  function Vue(options) {
    // 进行Vue的初始化操作
    this._init(options);
  } // 通过引入文件的方式 给Vue原型上添加方法


  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue); // 初始化全局的api

  initGlobalAPI(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
