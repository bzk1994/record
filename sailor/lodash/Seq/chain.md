
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

`lodash` 函数接收 `value`，也就是 `users` 对象, 
在函数内部首先会进行一个 `if` 判断，3 个条件，`isObjectLike(value)` 是一个类对象、`!isArray(value) ` 不是一个数组、` !(value instanceof LazyWrapper)` 不是 `LazyWrapper` 构造函数的实例，如果都符合条件进入判断。

如果 `value` 是 `LodashWrapper` 构造函数的实例，直接返回 `value`。

判断如果 `value` 上有 `__wrapped__` 这个属性直接返回 `wrapperClone` 函数的调用返回，
不满足 3 个条件或者在上面的判断中没有 `return` 的情况下说明是第一次调用 `lodash` 进行包装，
此时的 `value` 还是一个单纯的对象，返回 `LodashWrapper` 构造函数的实例，这里我们对象这几个构造函数和方法的作用还不清楚，我们接着往下看 `LodashWrapper` 构造函数：

```js
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}
```

`LodashWrapper` 构造函数是创建 `lodash` 包装器对象的基本构造函数，这里会给实例添加几个私有属性。

将 `value` 赋值给 `__wrapped__` 属性，在 `lodash` 函数中会判断 `__wrapped__`，
`__actions__` 为空数组，
`__chain__` 为传入的 `chainAll` 转成布尔值、
`__index__` 为 0、
`__values__` 为 `undefined`。

在 `lodash.js` 末尾处我们会将 `lodash.js` 中申明的各种方法挂载到 `lodash` 函数上：

```js
lodash.shuffle = shuffle;
lodash.slice = slice;
lodash.sortBy = sortBy;
lodash.sortedUniq = sortedUniq;
lodash.sortedUniqBy = sortedUniqBy;
```

挂载这些方法之后会调用 `mixin` 函数：

```js
// Add aliases.
lodash.entries = toPairs;
lodash.entriesIn = toPairsIn;
lodash.extend = assignIn;
lodash.extendWith = assignInWith;

// Add methods to `lodash.prototype`.
mixin(lodash, lodash);
```

`mixin` 函数会将 `methods` 挂载到 `lodash.prototype` 上，来看一下它的实现。

```js
function mixin(object, source, options) {
  var props = keys(source),
    methodNames = baseFunctions(source, props);

  if (options == null &&
    !(isObject(source) && (methodNames.length || !props.length))) {
    options = source;
    source = object;
    object = this;
    methodNames = baseFunctions(source, keys(source));
  }
  var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
    isFunc = isFunction(object);

  arrayEach(methodNames, function (methodName) {
    var func = source[methodName];
    object[methodName] = func;
    if (isFunc) {
      object.prototype[methodName] = function () {
        var chainAll = this.__chain__;
        if (chain || chainAll) {
          var result = object(this.__wrapped__),
            actions = result.__actions__ = copyArray(this.__actions__);

          actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
          result.__chain__ = chainAll;
          return result;
        }
        return func.apply(object, arrayPush([this.value()], arguments));
      };
    }
  });

  return object;
}
```

`mixin` 函数接收 3 个参数，`object` 目标对象、`source` 要添加的函数的对象、`options` 配置对象。

首先为申明变量 `props` 赋值为 `keys(source)` 函数调用后返回的 `source` 的 `key` 数组，
变量 `methodNames` 赋值为 `baseFunctions(source, props)` 函数调用后返回的 `source` 中属性是 `functions` 方法名。

接着会对 `options` 进行非空判断，进行只传 2 个参数时候的一些参数处理，接着会遍历 `methodNames` 数组，也就是 `source` 中可枚举属性为 `function` 的 `key` 数组，在遍历回调中会取出 `source[methodName]` 对应的 `function`，将其以相同的 `key` 添加到给 `object` 对象，也就是实现了方法属性的拷贝。

接着会根据 `isFunc` 字段，判断 `object` 是否是一个 `function`，此时应该是 `lodash` 函数，符合判断条件，进入 `if` 判断，在判断中我们会给 `object.prototype` 以 `methodName` 为方法名，添加方法。

在这个方法中，我们会判断 `chain` 和 `chainAll` 变量：

```js
var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
```

`chain` 是一个布尔值，`options` 不是对象并且 `options` 实例或者原型没有 `chain` 属性或者 `options.chain` 有一个 `chain` 属性。

```js
var chainAll = this.__chain__;
```

`chainAll` 代表 `this` 有 `__chain__` 属性，在第一个调用 `lodash` 后，我们会将 `__chain__` 置为 `true`。

进入循环后会进行以下操作：

```js
var result = object(this.__wrapped__),
  actions = result.__actions__ = copyArray(this.__actions__);

actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
result.__chain__ = chainAll;
return result;
```

调用 `object` 并且传入 `this.__wrapped__`，`object` 会返回一个对象，用 `result` 变量保存，
调用 `copyArray` 函数将 `this.__actions__` 赋值给 `actions` 已经 `result.__actions__`，然后以 `func`、`args`、`thisArg` 拼装成一个对象插入 `actions` 数组，将 `result.__chain__` 赋值为 `chainAll`，最后将 `result` 返回。


如果不满足 `chain || chainAll`：

```js
return func.apply(object, arrayPush([this.value()], arguments));
```

这里会调用 `apply` 函数将 `func` 绑定到 `object` 上， 并且将 `arrayPush([this.value()], arguments)` 传入。


第二次调用 `mixin` 函数：

```js
// Add aliases.
lodash.each = forEach;
lodash.eachRight = forEachRight;
lodash.first = head;

mixin(lodash, (function () {
  var source = {};
  baseForOwn(lodash, function (func, methodName) {
    if (!hasOwnProperty.call(lodash.prototype, methodName)) {
      source[methodName] = func;
    }
  });
  return source;
}()), { 'chain': false });
```

调用 `mixin` 函数，将 `lodash`，以及执行函数，`{'chain': false}` 配置对象传入，

```js
(function () {
  var source = {};
  baseForOwn(lodash, function (func, methodName) {
    if (!hasOwnProperty.call(lodash.prototype, methodName)) {
      source[methodName] = func;
    }
  });
  return source;
}())
```

在立即执行函数中遍历 `lodash` ，如果 `lodash.prototype` 中没有 `methodName` 对应的 `key` 会将 `func` 添加到 `source` 对象上，最后将 `source` 返回，所以这个立即执行函数会返回一个 `source` 对象，对象中拷贝了 `lodash` 的除了原型上所有属性，再次进入 `mixin` 函数对象 `lodash` 函数进行属性拷贝。






```js
_.chain(value)
```

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

`chain` 函数接收一个 `value`，在函数内会调用 `lodash` 函数返回一个包装后的 `result` 对象，将属性 `__chain__` 设置为 `true`，最后将 `result` 返回。

## lodash

```js
/**
  * @name _
  * @constructor
  * @category Seq
  * @param {*} value The value to wrap in a `lodash` instance.
  * @returns {Object} Returns the new `lodash` wrapper instance.
  * @example
  *
  * function square(n) {
  *   return n * n;
  * }
  *
  * var wrapped = _([1, 2, 3]);
  *
  * // Returns an unwrapped value.
  * wrapped.reduce(_.add);
  * // => 6
  *
  * // Returns a wrapped value.
  * var squares = wrapped.map(square);
  *
  * _.isArray(squares);
  * // => false
  *
  * _.isArray(squares.value());
  * // => true
  */
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
`lodash` 函数接收 `value`，在函数内部首先会进行一个判断，满足 3 个条件，`isObjectLike(value)` 是一个类对象、`!isArray(value) ` 不是一个数组、` !(value instanceof LazyWrapper)` 不是 `LazyWrapper` 构造函数的实例，进入 `if` 判断后，又是一个 `if` 判断，如果已经是 `LodashWrapper` 构造函数的实例的话直接返回 `value`，如果不是继续往下运行代码，判断如果 `value` 上有 `__wrapped__` 这个属性直接返回 `wrapperClone` 函数的调用返回，不满足 3 个条件或者在上面的判断中没有 `return` 的情况下说明是第一次调用 `lodash` 进行包装，此时的 `value` 还是一个单纯的对象，返回 `LodashWrapper` 构造函数的实例，这里我们对象这几个构造函数和方法的作用还不清楚，我们接着往下看 `LodashWrapper` 构造函数：

## LodashWrapper

```js
/**
  * The base constructor for creating `lodash` wrapper objects.
  *
  * @private
  * @param {*} value The value to wrap.
  * @param {boolean} [chainAll] Enable explicit method chain sequences.
  */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}
```

`LodashWrapper` 构造函数创建 `lodash` 包装器对象的基本构造函数，这里会给实例添加几个私有属性，将 `value` 赋值给 `__wrapped__` 属性。


## wrapperClone

```js
/**
  * Creates a clone of `wrapper`.
  *
  * @private
  * @param {Object} wrapper The wrapper to clone.
  * @returns {Object} Returns the cloned wrapper.
  */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__ = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}
```

在 `lodash` 函数中，满足 3 个条件，并且不是 `LodashWrapper` 实例的情况，会返回 `wrapperClone` 函数的返回对象。

那么在 `wrapperClone` 函数做了什么呢？

`wrapperClone` 函数首先会判断 `wrapper` 如果是 `LazyWrapper` 的实例，直接返回 `wrapper.clone()`，否则就调用 `LodashWrapper` 构造函数，并且传入 `wrapper.__wrapped__`、 ` wrapper.__chain__` 参数，生产一个 `result` 实例，随后为 `result` 添加属性 `__actions__` 为 `wrapper.__actions__` 的拷贝、`__index__`、`__values__` ，最后将 `result` 返回。

## LazyWrapper

```js
/**
  * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
  *
  * @private
  * @constructor
  * @param {*} value The value to wrap.
  */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}
```

在 `LazyWrapper` 构造函数中我们为实例添加了 `__wrapped__` 属性为传入的 `value`，以及其他属性。
