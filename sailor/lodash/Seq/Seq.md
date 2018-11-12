## _

```js
; (function () {
  ...
  var runInContext = (function runInContext(context) {
    ...
  })

  /*--------------------------------------------------------------------------*/

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

`lodash.js` 是一个自执行函数，函数内大致分为 3 个部分。

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

导出到全部对象。

## chain

> 创建一个经 lodash 包装的对象以启用显式链模式，要解除链必须使用 _#value 方法。

```js
/**
  * Creates a `lodash` wrapper instance that wraps `value` with explicit method
  * chain sequences enabled. The result of such sequences must be unwrapped
  * with `_#value`.
  *
  * @static
  * @memberOf _
  * @since 1.3.0
  * @category Seq
  * @param {*} value The value to wrap.
  * @returns {Object} Returns the new `lodash` wrapper instance.
  * @example
  *
  * var users = [
  *   { 'user': 'barney',  'age': 36 },
  *   { 'user': 'fred',    'age': 40 },
  *   { 'user': 'pebbles', 'age': 1 }
  * ];
  *
  * var youngest = _
  *   .chain(users)
  *   .sortBy('age')
  *   .map(function(o) {
  *     return o.user + ' is ' + o.age;
  *   })
  *   .head()
  *   .value();
  * // => 'pebbles is 1'
  */
function chain(value) {
  var result = lodash(value);
  result.__chain__ = true;
  return result;
}
```

### 栗子 🌰 

```js
var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];
 
var youngest = _
  .chain(users)
  .sortBy('age')
  .map(function(o) {
    return o.user + ' is ' + o.age;
  })
  .head()
  .value();
// => 'pebbles is 1'
```

在栗子 🌰 中，我们调用 `chain` 函数并传了 `users` 对象。

```js
function chain(value) {
  var result = lodash(value);
  result.__chain__ = true;
  return result;
}
```

函数首先会调用 `lodash` 函数，并且将 `value`，也就是 `users` 对象传入，将返回的值保存在 `result` 变量中，
接着设置 `__chain__` 属性为 `true`，最后返回 `result`。

调用 `chain` 函数后可以连缀调用 `sortBy` 方法，`lodash` 内部是如何实现将 `sortBy` 方法添加到 `result` 上的呢？ 又是如何实现函数的连缀调用呢？

我们来看看 `lodash` 函数：

```js
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}
```



<!-- 
```js
// Add chain sequence methods to the `lodash` wrapper.
lodash.prototype.at = wrapperAt;
lodash.prototype.chain = wrapperChain;
lodash.prototype.commit = wrapperCommit;
lodash.prototype.next = wrapperNext;
lodash.prototype.plant = wrapperPlant;
lodash.prototype.reverse = wrapperReverse;
lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
```

在 `runInContext` 函数的末尾会给 `lodash.prototype` 添加 `chain` 方法，为 `wrapperChain` 函数。

## wrapperChain

```js
/**
  * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
  */
function wrapperChain() {
  return chain(this);
}
```

`wrapperChain` 函数内部会返回 `chain` 函数的调用，并且传入 `this` 对象。

 -->
