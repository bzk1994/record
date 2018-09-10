## flatten

> 向上一级展平数组嵌套

```js
/**
 * Flattens `array` a single level deep.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep, flattenDepth
 * @example
 *
 * flatten([1, [2, [3, [4]], 5]])
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, 1) : []
}
```

`flatten` 函数接收一个数组参数，取出数组长度，如过不是 0 就调用 `baseFlatten` 函数传参 `array, 1` 返回扁平化一层后的数组，否则返回空数组。

## flattenDeep

> 递归展平数组。

```js
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Recursively flattens `array`.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flatten, flattenDepth
 * @example
 *
 * flattenDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, INFINITY) : []
}
```

`flattenDeep` 接收 `array` 函数，取到 `length` 数组长度，如果 `length` 不为 0 就调用 `baseFlatten` 函数，并且传入参数 `array` 数组、`INFINITY` 无穷大，返回递归展平的数组，否则返回空数组。

## flattenDepth

> 根据 depth 递归展平数组的层级。

```js
/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @since 4.4.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep
 * @example
 *
 * const array = [1, [2, [3, [4]], 5]]
 *
 * flattenDepth(array, 1)
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2)
 * // => [1, 2, 3, [4], 5]
 */
function flattenDepth(array, depth) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  depth = depth === undefined ? 1 : +depth
  return baseFlatten(array, depth)
}
```

`flattenDepth` 函数接收 2 个参数，`array` 数组、`depth` 展平深度。

首先取出 `length` 长度，`depth` 长度默认为 1 ，最后调用 `baseFlatten` 函数，并且传入数组和展平深度，最后返回递归展平后的数组。
