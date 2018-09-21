## now

> 获得 Unix 纪元(1970 1月1日 00:00:00 UTC) 直到现在的毫秒数。

```js
_.now()
```

```js
/**
  * Gets the timestamp of the number of milliseconds that have elapsed since
  * the Unix epoch (1 January 1970 00:00:00 UTC).
  *
  * @static
  * @memberOf _
  * @since 2.4.0
  * @category Date
  * @returns {number} Returns the timestamp.
  * @example
  *
  * _.defer(function(stamp) {
  *   console.log(_.now() - stamp);
  * }, _.now());
  * // => Logs the number of milliseconds it took for the deferred invocation.
  */
   
  // ts
  declare var self: Window;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  var ctxNow = Date && Date.now !== root.Date.now && Date.now;
  var now = ctxNow || function () {
    return root.Date.now();
  };
```

`now` 函数做了一些兼容，这里对 `root` 变量进行了穿透赋值，有 `global` 对象就是 `Node.js` 平台，有 `Window` 就是浏览器平台，最后返回 `Date` 实例的 `now()` 方法。


