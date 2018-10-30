## range

> 创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 如果 start 是负数，而 end 或 step 没有指定，那么 step 从 -1 为开始。 如果 end 没有指定，start 设置为 0。 如果 end 小于 start，会创建一个空数组，除非指定了 step。 

```js
_.range([start=0], end, [step=1])
```

```js
/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start`, and `start` is then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @since 0.1.0
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see inRange, rangeRight
 * @example
 *
 * range(4)
 * // => [0, 1, 2, 3]
 *
 * range(-4)
 * // => [0, -1, -2, -3]
 *
 * range(1, 5)
 * // => [1, 2, 3, 4]
 *
 * range(0, 20, 5)
 * // => [0, 5, 10, 15]
 *
 * range(0, -4, -1)
 * // => [0, -1, -2, -3]
 *
 * range(1, 4, 0)
 * // => [1, 1, 1]
 *
 * range(0)
 * // => []
 */
const range = createRange()
```

`range` 函数是调用 `createRange` 函数返回的函数。

## createRange

```js
/**
 * Creates a `range` or `rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return (start, end, step) => {
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start)
    if (end === undefined) {
      end = start
      start = 0
    } else {
      end = toFinite(end)
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step)
    return baseRange(start, end, step, fromRight)
  }
}
```

`createRange` 函数会 `return` 一个 `function`，次函数接收 3 个函数，首先会调用 `toFinite` 处理 `start` 为有限数，如果 `end` 等于 `undefined`，将 `start` 赋值给 `end`，`start` 置为 0，否则将 `end` 转化为有限数，这里主要是做参数的处理， 接着是处理增量 `step`，最后返回 `baseRange` 函数的调用返回。

## baseRange

```js
/**
  * The base implementation of `_.range` and `_.rangeRight` which doesn't
  * coerce arguments.
  *
  * @private
  * @param {number} start The start of the range.
  * @param {number} end The end of the range.
  * @param {number} step The value to increment or decrement by.
  * @param {boolean} [fromRight] Specify iterating from right to left.
  * @returns {Array} Returns the range of numbers.
  */
function baseRange(start, end, step, fromRight) {
  var index = -1,
    length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
    result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}
```

`baseRange` 函数首先是申明一些初始变量，接着会进入 `while` 循环，这里会根据传入的 `fromRight` 返回升序或者降序，`length` 累减，`start += step` 累加，最后将 `result` 返回。

## rangeRight

> 

```js
_.rangeRight([start=0], end, [step=1])
```

```js

/**
 * This method is like `range` except that it populates values in
 * descending order.
 *
 * @since 4.0.0
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see inRange, range
 * @example
 *
 * rangeRight(4)
 * // => [3, 2, 1, 0]
 *
 * rangeRight(-4)
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 5)
 * // => [4, 3, 2, 1]
 *
 * rangeRight(0, 20, 5)
 * // => [15, 10, 5, 0]
 *
 * rangeRight(0, -4, -1)
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 4, 0)
 * // => [1, 1, 1]
 *
 * rangeRight(0)
 * // => []
 */
const rangeRight = createRange(true)
```

`rangeRight` 函数是调用 `createRange` 函数返回的函数，与 `range` 不同的是传入了 `true` 作为参数，而在`createRange` 函数中会根据 `fromRight` 变量以升序降序排列返回数组。
