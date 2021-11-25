(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

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
    observe(value); // 递归实现深度检测
    // 闭包

    Object.defineProperty(data, key, {
      get: function get() {
        // 获取值的时候做一些操作
        return value;
      },
      set: function set(newValue) {
        // 也可以做一些操作
        console.log('更新数据', newValue);
        if (newValue === value) return;
        observe(newValue); // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象

        value = newValue;
      }
    });
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

    observe(data); // 响应式原理
  }

  function initComputed(vm) {}

  // ast 语法树 是用对象来描述原生语法的    虚拟dom 用对象来描述dom节点的
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // abc-aaa

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // <aaa:asdads>

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>

  function start(tagName, attrs) {
    console.log('开始标签:', tagName, '属性是:', attrs);
  }

  function chars(text) {
    console.log("文本是:", text);
  }

  function end(tagName) {
    console.log('结束标签:', tagName);
  }

  function parseHTML(html) {
    // 不停的去解析html
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        // 如果当前索引为0 肯定是一个标签 开始标签 结束标签
        var startTagMatch = parseStartTag(); // 通过这方法获取到匹配的结果 tagName, attrs

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue; // 如果开始标签匹配完毕后 继续下一次匹配
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
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
          advance(attr[0].length); // 将属性删除

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
  }

  function compileToFunction(template) {
    parseHTML(template);
    return function render() {};
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据的劫持
      var vm = this; // vue 中使用 thi.$options 指代的就是用户传递的属性

      vm.$options = options; // 初始化状态

      initState(vm); // 分割代码
      // 如果用户传入了 el 属性，需要把页面渲染出来
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

    };
  }

  // Vue 的核心代码 只是Vue的一个声明

  function Vue(options) {
    // 进行Vue的初始化操作
    this._init(options);
  } // 通过引入文件的方式 给Vue原型上添加方法


  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
