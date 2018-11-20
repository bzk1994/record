# Lodash 源码解析 架构

`lodash.js` 内部是一个自执行函数。

```js
; (function () {
  ...
  var runInContext = (function runInContext(context) {
    ...
  })

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function () {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));
```

函数内大致分为 3 个部分。

* 10 ~ 1373 初始变量、base 函数、 util 函数的申明
* 1377 ~ 17070 runInContext 函数
* 17070 ~ 17101 export 部分

`_` 变量是调用 `runInContext` 返回的 `lodash` 函数。

### AMD 的兼容

```js
// Some AMD build optimizers, like r.js, check for condition patterns like:
if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
  // Expose Lodash on the global object to prevent errors when Lodash is
  // loaded by a script tag in the presence of an AMD loader.
  // See http://requirejs.org/docs/errors.html#mismatch for more details.
  // Use `_.noConflict` to remove Lodash from the global object.
  root._ = _;

  // Define as an anonymous module so, through path mapping, it can be
  // referenced as the "underscore" module.
  define(function () {
    return _;
  });
}
```

`AMD` 规范中，`define` 函数有一个公有属性 `define.amd`，用来说明当前的模块加载器是 `AMD` 协议。

这里判断 `define` 是 `function`、 `define.amd` 是 `object`，并且为真，排除 `null` 类型，进入判断后会将 `define.amd` 赋值给 `root._`，并且调用 `define` 函数定义匿名模块。

### Node 的兼容

```js
/** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

// Check for `exports` after `define` in case a build optimizer adds it.
else if (freeModule) {
  // Export for Node.js.
  (freeModule.exports = _)._ = _;
  // Export for CommonJS support.
  freeExports._ = _;
}
```

`Node` 采用 `CommonJS` 模块规范。

`freeExports` 变量判断 `exports` 是 `object`、`exports` 为真、`!exports.nodeType` 证明 `exports` 不是 `html dom` 元素

### 原生模块的兼容

```js
else {
  // Export to the global object.
  root._ = _;
}
```

导出到全局对象 `root`。
