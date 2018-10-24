## chain

> 创建一个经 lodash 包装的对象以启用显式链模式，要解除链必须使用 _#value 方法。

## chain 调用

当调用 `chain` 函数时，我们会将 `users` 作为参数传入。

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

```js
function chain(value) {
  var result = lodash(value);
  result.__chain__ = true;
  return result;
}
```

`chain` 函数接收一个 `value`，在函数内会调用 `lodash` 函数返回一个包装后的 `result` 对象，将属性 `__chain__` 设置为 `true`，最后将 `result` 返回，那么这个 `result` 是调用 `lodash` 函数返回的对象，该对象有 `sortBy` 方法，`lodash` 内部是如何实现将 `sortBy` 添加到 `result` 的呢？

我们来看一下这个 `lodash` 函数：

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

`lodash` 函数接收 `value`，在函数内部首先会进行一个判断，满足 3 个条件，`isObjectLike(value)` 是一个类对象、`!isArray(value) ` 不是一个数组、` !(value instanceof LazyWrapper)` 不是 `LazyWrapper` 构造函数的实例，进入 `if` 判断后，又是一个 `if` 判断，如果已经是 `LodashWrapper` 构造函数的实例的话直接返回 `value`，如果不是继续往下运行代码，判断如果 `value` 上有 `__wrapped__` 这个属性直接返回 `wrapperClone` 函数的调用返回，不满足 3 个条件或者在上面的判断中没有 `return` 的情况下说明是第一次调用 `lodash` 进行包装，此时的 `value` 还是一个单纯的对象，返回 `LodashWrapper` 构造函数的实例，这里我们对象这几个构造函数和方法的作用还不清楚，我们接着往下看 `LodashWrapper` 构造函数：

```js
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}
```

`LodashWrapper` 构造函数是创建 `lodash` 包装器对象的基本构造函数，这里会给实例添加几个私有属性，将 `value` 赋值给 `__wrapped__` 属性、`__actions__` 为空数组、`__chain__` 为传入的 `__chain__` 取非非成布尔值、`__index__` 为 0、`__values__` 为 `undefined`。

在 `lodash.js` 末尾处我们会将 `lodash.js` 中申明的各种方法挂载到 `lodash` 函数上：

```js
lodash.shuffle = shuffle;
lodash.slice = slice;
lodash.sortBy = sortBy;
lodash.sortedUniq = sortedUniq;
lodash.sortedUniqBy = sortedUniqBy;
```















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
