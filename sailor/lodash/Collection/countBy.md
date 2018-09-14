## countBy

> 创建一个组成对象，key是经过 iteratee 处理的集合的结果，value 是处理结果的次数。 iteratee 会传入一个参数：(value)。

```js
_.countBy(collection, [iteratee=_.identity])
```

```js
/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @since 0.5.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'betty', 'active': true },
 *   { 'user': 'fred', 'active': false }
 * ]
 *
 * countBy(users, 'active');
 * // => { 'true': 2, 'false': 1 }
 */
function countBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
    if (hasOwnProperty.call(result, key)) {
      ++result[key]
    } else {
      baseAssignValue(result, key, 1)
    }
    return result
  }, {})
}
```

`countBy` 函数接收 2 个参数 `collection` 收集数组、`iteratee` 迭代器函数。

`countBy` 函数 `return` 了一个 `reduce`，以 `{}` 为初始值，在 `reduce` 的回调函数中，会将 `key` 结果迭代器函数处理，`hasOwnProperty` 判断当前对象是否有这个属性，如果有就将 `result[key]` 也就是 `value + 1`，否则就调用 `baseAssignValue` 函数实现一个简单属性的赋值。
