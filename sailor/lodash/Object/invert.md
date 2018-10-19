## invert

> 创建一个键值倒置的对象。 如果 object 有重复的值，后面的值会覆盖前面的值。 如果 multiVal 为 true，重复的值则组成数组。

```js
_.invert(object)
```

```js
const toString = Object.prototype.toString

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @since 0.7.0
 * @category Object
 * @param {Object} object The object to invert.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invert(object)
 * // => { '1': 'c', '2': 'b' }
 */
function invert(object) {
  const result = {}
  Object.keys(object).forEach((key) => {
    let value = object[key]
    if (value != null && typeof value.toString != 'function') {
      value = toString.call(value)
    }
    result[value] = key
  })
  return result
}
```

`invert` 接收一个原始对象 `object`，申明 `result` 空对象，`Object.keys` 获取对象 `object` 的 `key` 数组，进行遍历，这里会调用 `toString` 将 `value` 处理成 `String` 作为 `key`，然后将原来的 `key` 作为 `value` 赋值给 `result`，最后将 `result` 返回。

## 

> 这个方法类似 _.invert。 除了它接受 iteratee 调用每一个元素，可在返回值中定制key。 iteratee 会传入1个参数：(value)。

```js
_.invertBy(object, [iteratee=_.identity])
```

```js
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * This method is like `invert` except that the inverted object is generated
 * from the results of running each element of `object` thru `iteratee`. The
 * corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value. The iteratee is invoked
 * with one argument: (value).
 *
 * @since 4.1.0
 * @category Object
 * @param {Object} object The object to invert.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invertBy(object, value => `group${value}`)
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 */
function invertBy(object, iteratee) {
  const result = {}
  Object.keys(object).forEach((key) => {
    const value = iteratee(object[key])
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key)
    } else {
      result[value] = [key]
    }
  })
  return result
}
```

`invertBy` 函数接收 2 个参数，`object` 倒置对象、`iteratee` 迭代函数。

申明空对象 `result`，`Object.keys` 获取对象 `object` 的 `key` 数组，调用 `forEach` 进行遍历，在回调函数中，调用 `iteratee` 函数生成 `value`，如果 `result` 中有这个 `key` 将 `key` 插入到 `result[value]`，否则包装成数组赋值给 `result[value]`，最后将 `result` 返回。
