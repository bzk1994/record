## groupBy

> 创建一个对象组成，key 是经 iteratee 处理的结果， value 是产生 key 的元素数组。 iteratee 会传入1个参数：(value)。

```js
_.groupBy(collection, [iteratee=_.identity])
```

```js
/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
function groupBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value)
    } else {
      baseAssignValue(result, key, [value])
    }
    return result
  }, {})
}
```

`groupBy` 与 `countBy` 函数相似， 接收 2 个参数， `collection` 集合、`iteratee` 迭代器函数。

`groupBy` 函数 `return` 了一个 `reduce`，以 `{}` 为初始值，在 `reduce` 的回调函数中，会将 `key` 结果迭代器函数处理，`hasOwnProperty` 判断当前对象是否有这个属性，如果有就将 `result[key]` 迭代函数处理后得到的 `value` 插入数组，否则就调用 `baseAssignValue` 函数实现一个简单属性的赋值。


