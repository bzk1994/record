## remove

> 移除经过 predicate 处理为真值的元素，并返回被移除的元素。predicate 会传入3个参数：(value, index, array) 

```js
/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `filter`, this method mutates `array`. Use `pull`
 * to pull elements from an array by value.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, reject, filter
 * @example
 *
 * const array = [1, 2, 3, 4]
 * const evens = remove(array, n => n % 2 == 0)
 *
 * console.log(array)
 * // => [1, 3]
 *
 * console.log(evens)
 * // => [2, 4]
 */
function remove(array, predicate) {
  const result = []
  if (!(array != null && array.length)) {
    return result
  }
  let index = -1
  const indexes = []
  const { length } = array

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result.push(value)
      indexes.push(index)
    }
  }
  basePullAt(array, indexes)
  return result
}
```

`remove` 函数接收 2 个参数，`remove` 要修改数组、 `predicate` 迭代函数。

申明 `result` 空数组保存结果，接着是对 `array` 的非空处理，然后申明一些初始变量。

接着进入 `while` 循环，`index` 累加，申明 `value` 保存当前 `value`， 这里会判断调用 `predicate` 函数的结果，如果为真，就将 `value` 插入 `result` 数组，`index` 下标插入 `indexes` 数组，`while` 循环结束后，会调用 `basePullAt` 删除 `array` 符合的元素，此方法会修改原 `array` 数组，最后将符合条件的 `result` 返回。


## reverse

> 反转数组，使第一个元素成为最后一个元素，第二个元素成为倒数第二个元素，依此类推。

```js
 /**
  * Reverses `array` so that the first element becomes the last, the second
  * element becomes the second to last, and so on.
  *
  * **Note:** This method mutates `array` and is based on
  * [`Array#reverse`](https://mdn.io/Array/reverse).
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to modify.
  * @returns {Array} Returns `array`.
  * @example
  *
  * var array = [1, 2, 3];
  *
  * _.reverse(array);
  * // => [3, 2, 1]
  *
  * console.log(array);
  * // => [3, 2, 1]
  */
function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}
```

`reverse` 函数只是简单包装了一个原生数组的 `reverse` 方法。 

```js
var arrayProto = Array.prototype
var nativeReverse = arrayProto.reverse
```

`nativeReverse` 就是`Array.prototype.reverse` ，只是增加了一个非空判断。

## slice

> 创建一个裁剪后的数组，从 start 到 end 的位置，但不包括 end 本身的位置。 

```js
_.slice(array, [start=0], [end=array.length])
```

```js
/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 */
function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}
```

`slice` 函数接收 3 个参数，`array` 要切割数组、`start` 起始位置、`end` 结束位置。

申明 `length` 变量保存 `array` 长度，默认为 0，如果 `length` 为 `false`，返回空数组，
对 `start` 和 `end` 进行赋值处理，`start` 默认为 0，`end` 默认为数组长度，
接着是当 `start < 0` 时和 `end < 0` 的处理。

```js
length = start > end ? 0 : ((end - start) >>> 0)
start >>>= 0
```

> `>>>` 带符号位的右移运算符（>>>）表示将一个数的二进制形式向右移动，包括符号位也参与移动，头部补 0。所以，该运算总是得到正值。对于正数，该运算的结果与右移运算符（>>）完全一致，区别主要在于负数。

参考：[运算符](http://javascript.ruanyifeng.com/grammar/operator.html#toc16)

申明 `index` 初始值 `-1`，申明 `result` 保存循环结果，进入 `while` 循环，将 `array[index + start]` 赋值给 `result[index]`，最后将 `result` 返回。


## sortedIndex

> 使用二进制的方式检索来决定 value 应该插入在数组中位置。它的 index 应该尽可能的小以保证数组的排序。

```js
/**
 * Uses a binary search to determine the lowest index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * sortedIndex([30, 50], 40)
 * // => 1
 */
function sortedIndex(array, value) {
  return baseSortedIndex(array, value)
}
```

`sortedIndex` 函数 `baseSortedIndex` 函数的包装。

`baseSortedIndex` 函数：

```js
function baseSortedIndex(array, value, retHighest) {
  let low = 0
  let high = array == null ? low : array.length

  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      const mid = (low + high) >>> 1
      const computed = array[mid]
      if (computed !== null && !isSymbol(computed) &&
          (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    return high
  }
  return baseSortedIndexBy(array, value, (value) => value, retHighest)
}
```

`baseSortedIndex` 函数接收 3 个参数，`array` 数组、`value` 要插入的值、`retHighest` 是否返回最大索引。

申明 `low` 变量为 0，申明 `high` 变量为数组长度，默认为 0。

这里会进行一些判断， `value` 是 `number` 类型、`value` 不是 `NaN`、`high` 小于最大数组长度，
进入 `if` 判断后，会进行 `while` 循环。

此时 `low + high` 为正数，运算的结果与右移运算符（>>）完全一致。

```js
const mid = (low + high) >>> 1
```

> 右移运算符（>>）表示将一个数的二进制值向右移动指定的位数，头部补0，即除以2的指定次方（最高位即符号位不参与移动）。

```js
5 >> 1
// 2
// 相当于 5 / 2 = 2

21 >> 2
// 5
// 相当于 21 / 4 = 5
```

申明 `computed` 保存 `mid` 下标对应的  `value`，这里会判断 `computed` 不为 `null`、`computed` 不是 `symbol` 类型，以及是否传入 `retHighest` 对 `computed < value` 的比较，如果全部符合，就将 `low` 赋值为 `mid + 1` ，继续循环，直到进入 `else` 循环将 `mid` 赋值给 `high`，或者循环结束 `return high`。

```js
return baseSortedIndexBy(array, value, (value) => value, retHighest)
```

如果不满足上面的条件，`baseSortedIndex` 函数最后会调用 `baseSortedIndexBy` 函数，将它的调用结果返回。

## sortedIndexBy

> 这个方法类似 _.sortedIndex，除了它接受一个 iteratee 调用每一个数组和值来计算排序。iteratee 会传入一个参数：(value)。

```js
/**
 * This method is like `sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 5 }]
 *
 * sortedIndexBy(objects, { 'n': 4 }, ({ n }) => n)
 * // => 0
 */
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, iteratee)
}
```

`sortedIndexBy` 函数是 `baseSortedIndexBy` 函数的包装。

`baseSortedIndexBy` 函数：

```js
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value)

  let low = 0
  let high = array == null ? 0 : array.length
  const valIsNaN = value !== value
  const valIsNull = value === null
  const valIsSymbol = isSymbol(value)
  const valIsUndefined = value === undefined

  while (low < high) {
    let setLow
    const mid = Math.floor((low + high) / 2)
    const computed = iteratee(array[mid])
    const othIsDefined = computed !== undefined
    const othIsNull = computed === null
    const othIsReflexive = computed === computed
    const othIsSymbol = isSymbol(computed)

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
    } else if (othIsNull || othIsSymbol) {
      setLow = false
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value)
    }
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX)
}
```

`baseSortedIndexBy` 是 `sortedIndex` 这一系列函数的基本实现，接收 4 个参数，`array` 要检查数组、`value` 检查值、`iteratee` 迭代函数、`retHighest` 是否返回最大索引。

首先会调用 `iteratee` 处理 `value`，申明一系列初始变量，方面后面调用。

```js
let low = 0
let high = array == null ? 0 : array.length
const valIsNaN = value !== value
const valIsNull = value === null
const valIsSymbol = isSymbol(value)
const valIsUndefined = value === undefined
```

接着会进入 `while` 循环，在循环中也申明了一系列变量：

```js
const mid = Math.floor((low + high) / 2) // 取中间 index
const computed = iteratee(array[mid]) // 中间值
const othIsDefined = computed !== undefined
const othIsNull = computed === null
const othIsReflexive = computed === computed
const othIsSymbol = isSymbol(computed)
```

接着就是很多类型判断，这里会根据类型将 `setLow` 赋值，然后会判断 `setLow` 如果为真，`low` 赋值为 `mid + 1`，否则就将 `high` 赋值为 `mid` ，继续循环。

最后返回 `high` 与 `MAX_ARRAY_INDEX` 之间的最小值。

## sortedIndexOf

> 这个方法类似 _.indexOf，除了它是执行二进制来检索已经排序的数组的。

```js
/**
 * This method is like `indexOf` except that it performs a binary
 * search on a sorted `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * sortedIndexOf([4, 5, 5, 5, 6], 5)
 * // => 1
 */
function sortedIndexOf(array, value) {
  const length = array == null ? 0 : array.length
  if (length) {
    const index = baseSortedIndex(array, value)
    if (index < length && eq(array[index], value)) {
      return index
    }
  }
  return -1
}
```

`sortedIndexOf` 函数接收 2 个参数，`array` 数组、`value` 匹配的值。

申明 `length` 保存数组 `length`，默认为 0，
如果 `length` 为真，调用 `baseSortedIndex` 获取 `value` 位于 `array` 的下标。

如果 `index < length` 并且调用 `eq` 比较 `array[index]` 和 `value` 是否相等，如果相等返回 `index` 下标，否则返回 -1 。

## sortedLastIndex

> 此方法类似于_.sortedIndex，除了它返回应将值插入数组的最高索引，以便维护其排序顺序。

```js
/**
 * This method is like `sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * sortedLastIndex([4, 5, 5, 5, 6], 5)
 * // => 4
 */
function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true)
}
```

`sortedIndex` 函数与 `sortedLastIndex` 函数相似，只是调用 `baseSortedIndex` 函数的时候传入第三个参数为 `true`，`baseSortedIndex` 函数会返回最大的匹配值索引。

## sortedUniq

> 这个方法类似 _.uniq，除了它会排序并优化数组。

```js
_.sortedUniq(array)
```

```js
/**
 * This method is like `uniq` except that it only works
 * for sorted arrays.
 * If the input array is known to be sorted `sortedUniq` is
 * faster than `uniq`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * sortedUniq([1, 1, 2])
 * // => [1, 2]
 */
function sortedUniq(array) {
  return (array != null && array.length)
    ? baseSortedUniq(array)
    : []
}
```

`sortedUniq` 函数返回一个三元表达式，如果 `array` 不为 `null` 并且有 `length`，会返回 `baseSortedUniq` 函数的处理后的不重复数组，否则返回空数组。

`baseSortedUniq` 函数：

```js
function baseSortedUniq(array, iteratee) {
  let seen
  let index = -1
  let resIndex = 0

  const { length } = array
  const result = []

  while (++index < length) {
    const value = array[index], computed = iteratee ? iteratee(value) : value
    if (!index || !eq(computed, seen)) {
      seen = computed
      result[resIndex++] = value === 0 ? 0 : value
    }
  }
  return result
}
```

`baseSortedUniq` 函数接收 2 个参数，`array` 检查数组、 `iteratee` 迭代函数。

首先申明一系列变量：

```js
let seen
let index = -1 // 起始 index
let resIndex = 0 // result 下标

const { length } = array // 数组长度
const result = [] // 要返回数组
```

进入 `while` 循环，`index` 累加，这里会申明 `value` 变量保存下标对应的 `value`， `computed` 迭代器函数 `iteratee` 处理后的 `value`。

接着进行判断，判断 `!index` 为真，`index` 初始值为 -1，循环累加，是第一个循环时，`index` 为 0 的情况，或者 `computed` 与 `seen` 不相等， 进入判断后会将 `seen` 赋值为 `computed`，这里保存了临时变量 `seen`，实现数组的去重，将 `value` 插入 `result`。

循环结束后，将 `result` 返回。

## sortedUniqBy

> 这个方法类似 _.uniqBy，除了它接受一个 iteratee 调用每一个数组和值来排序并优化数组。

```js
_.sortedUniqBy(array, [iteratee])
```

```js
/**
 * This method is like `uniqBy` except that it's designed and optimized
 * for sorted arrays.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor)
 * // => [1.1, 2.3]
 */
function sortedUniqBy(array, iteratee) {
  return (array != null && array.length)
    ? baseSortedUniq(array, iteratee)
    : []
}
```

`sortedUniq` 函数与 `sortedUniqBy` 函数相似，只是调用 `baseSortedUniq` 时传入了 `iteratee` 迭代函数。
