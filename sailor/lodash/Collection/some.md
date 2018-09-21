## some

> 通过 predicate 检查集合中的元素是否存在任意真值的元素，只要 predicate 返回一次真值，遍历就停止，并返回 true。 predicate 会传入3个参数：(value, index|key, collection)。

```js
_.some(collection, [predicate=_.identity])
```

```js
/**
 * Checks if `predicate` returns truthy for **any** element of `array`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * some([null, 0, 'yes', false], Boolean)
 * // => true
 */
function some(array, predicate) {
  let index = -1
  const length = array == null ? 0 : array.length

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true
    }
  }
  return false
}
```

`some` 函数接收 2 个参数， `array` 数组、`predicate` 断言函数。

开始是一些初始变量的赋值，然后进入 `while` 循环， `index` 累加，在循环中调用 `predicate` 断言函数,如果返回为真就 `return true`，中断循环。