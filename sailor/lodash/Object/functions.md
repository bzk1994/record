## functions

> 返回一个 function 对象自身可枚举属性名的数组。

```js
_.functions(object)
```

```js
/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the function names.
 * @see functionsIn
 * @example
 *
 * function Foo() {
 *   this.a = () => 'a'
 *   this.b = () => 'b'
 * }
 *
 * Foo.prototype.c = () => 'c'
 *
 * functions(new Foo)
 * // => ['a', 'b']
 */
function functions(object) {
  if (object == null) {
    return []
  }
  return Object.keys(object).filter((key) => typeof object[key] == 'function')
}
```

`functions` 函数接收一个 `object`，栗子中是一个构造函数，在函数中首先会进行一个非空判断，然后调用 `Object.keys(object)` 函数获取 `object` 的 `key` 数组，连缀调用 `filter` 函数进行过滤，在 `filter` 的回调函数中中会判断 `object[key]` 类型是否为真，然后将过滤的数组返回。

## functionsIn

> 返回一个 function 对象自身和继承的可枚举属性名的数组。

```js
_.functionsIn(object)
```

```js
/**
  * Creates an array of function property names from own and inherited
  * enumerable properties of `object`.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Object
  * @param {Object} object The object to inspect.
  * @returns {Array} Returns the function names.
  * @see _.functions
  * @example
  *
  * function Foo() {
  *   this.a = _.constant('a');
  *   this.b = _.constant('b');
  * }
  *
  * Foo.prototype.c = _.constant('c');
  *
  * _.functionsIn(new Foo);
  * // => ['a', 'b', 'c']
  */
function functionsIn(object) {
  return object == null ? [] : baseFunctions(object, keysIn(object));
}
```

`functionsIn` 函数返回一个三元表达式，如果 `object == null` 返回空数组，否则返回调用 `baseFunctions` 函数的结果，并传入 `object` 检索对象、`keysIn(object)` 检索对象的 `key` 数组。

## baseFunctions

```js
/**
  * The base implementation of `_.functions` which creates an array of
  * `object` function property names filtered from `props`.
  *
  * @private
  * @param {Object} object The object to inspect.
  * @param {Array} props The property names to filter.
  * @returns {Array} Returns the function names.
  */
  function baseFunctions(object, props) {
    return arrayFilter(props, function (key) {
      return isFunction(object[key]);
    });
  }
```

`baseFunctions` 返回一个 `arrayFilter` 函数，传入 `props` 和一个回调函数，在回调函数中会调用 `isFunction` 函数判断 `object[key]` 是否是一个 `function`。

## arrayFilter

```js
/**
  * A specialized version of `_.filter` for arrays without support for
  * iteratee shorthands.
  *
  * @private
  * @param {Array} [array] The array to iterate over.
  * @param {Function} predicate The function invoked per iteration.
  * @returns {Array} Returns the new filtered array.
  */
function arrayFilter(array, predicate) {
  var index = -1,
    length = array == null ? 0 : array.length,
    resIndex = 0,
    result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
```

`arrayFilter` 函数内部是一个 `while` 循环，`index` 累加，会调用传入 `predicate` 函数，如果为真就将 `resIndex` 累加，`value` 插入 `result` 数组，最近将 `result` 返回。