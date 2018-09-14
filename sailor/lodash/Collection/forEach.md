## forEach

> 调用 iteratee 遍历集合中的元素， iteratee 会传入3个参数：(value, index|key, collection)。 如果显式的返回 false ，iteratee 会提前退出。 

```js
_.forEachRight(collection, [iteratee=_.identity])
```

```js
/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `forIn`
 * or `forOwn` for object iteration.
 *
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see forEachRight, forIn, forInRight, forOwn, forOwnRight
 * @example
 *
 * forEach([1, 2], value => console.log(value))
 * // => Logs `1` then `2`.
 *
 * forEach({ 'a': 1, 'b': 2 }, (value, key) => console.log(key))
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayEach : baseEach
  return func(collection, iteratee)
}
```

`forEach` 接收 2 个参数， `collection` 数组集合，`iteratee` 迭代器函数。

首先会判断 `collection` 是否是数组，将 `arrayEach` 或者 `baseEach` 赋值给 `func` 变量，最后将 `func` 函数调用返回。

## arrayEach

```js
function arrayEach(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}
```

`arrayEach` 函数接收 2 个参数，`array` 数组、`iteratee` 迭代器函数。

申请 `index` 、`length` 初始变量，进入 `while` 循环，随后在循环中调用迭代器函数，如果迭代器函数返回 `false` 将会跳出 `while` 循环，返回 `array`，弥补了原生 `arrayEach` 不能跳出循环的缺陷。

## forEachRight

> 这个方法类似 _.forEach，除了它是从右到左遍历的集合中的元素的。

```js
_.forEachRight(collection, [iteratee=_.identity])
```

```js
/**
 * This method is like `forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 2.0.0
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see forEach, forIn, forInRight, forOwn, forOwnRight
 * @example
 *
 * forEachRight([1, 2], value => console.log(value))
 * // => Logs `2` then `1`.
 */
function forEachRight(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayEachRight : baseEachRight
  return func(collection, iteratee)
}
```

`forEachRight` 与 `forEach` 函数实现基本一致，只是调用 `arrayEachRight` 、`baseEachRight` 方法有所不同，`arrayEachRight` 是 `while` 递减。
