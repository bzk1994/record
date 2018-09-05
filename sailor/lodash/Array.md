# Array Methods

## chunk

```js
_.chunk(array, [size=0])
```

> 将数组拆分成多个 size 长度的块，并组成一个新数组。 如果数组无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。

```js
/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
```

`chunk` 函数接收 `2` 个参数，`array` 数组，`size` 尺寸，
首先会调用 `Math.max` 取出 `size`，申明 `length` 变量保存数组长度，如果 `array == null` 长度为 0。
判断没有长度或者 `size` 小于 1 ，`return` 空数组。

接着申明 `index` `resIndex` `result` 初始变量，`result` 是一个新数组，数组长度采用 `length / size` 向上取整，保证数组不均分时将多余的放在最后数组返回。

进入 `while` 循环 ，这里从 `slice.js` 引入了一个 `slice` 方法，
`slice` 方法主要是将传入数组根据 `array` 和 `end` 位置切割后返回，不包括 `end`， 将 `slice` 切割后的数组保存到 `result` 的第 `resIndex` 上（`resIndex` 不断累加），最后将 `result` 数组返回。

## slice

> 创建一个裁剪后的数组，从 start 到 end 的位置，但不包括 end 本身的位置。 

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

`slice` 接收 3 个参数， `array` 原始数组，`start` 开始， `end` 结束，
取出 `array` 的 `length`，没有就返回空数组，
申明 `start` 默认为 0，`end` 默认为数组长度，接下来就是对 `start` 和 `end` 小于 0 做了处理，

出现了一个很有意思的运算符 `>>>` (Zero-fill right shift) 带符号位的右移运算符，表示将一个数的二进制形式向右移动，包括符号位也参与移动，头部补0。所以，该运算总是得到正值。对于正数，该运算的结果与右移运算符（>>）完全一致，区别主要在于负数。`start >>>= 0` 主要就是保证 `start` 为一个正整数，如果无效就为 0。

接着也是 `while` 循环 `index` 累加，不断往 `result` 赋值，最后将  `result` 数组返回。

## compact

> 创建一个移除了所有假值的数组。例如：false、null、 0、""、undefined， 以及NaN 都是 “假值”。

```js
/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}
```

`compact` 接收一个数组，申明 `resIndex` `result` 初始变量，`array` 如果 `array` 等于 `null` 直接返回空数组，然后采用 `for...of` 循环，有 `value` 循环就给 `result` 累加赋值，最后返回 `result`。

## concat

> 创建一个用任何数组 或 值连接的新数组。

```js
/**
  * Creates a new array concatenating `array` with any additional arrays
  * and/or values.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to concatenate.
  * @param {...*} [values] The values to concatenate.
  * @returns {Array} Returns the new concatenated array.
  * @example
  *
  * var array = [1];
  * var other = _.concat(array, 2, [3], [[4]]);
  *
  * console.log(other);
  * // => [1, 2, 3, [4]]
  *
  * console.log(array);
  * // => [1]
  */
  function concat() {
    var length = arguments.length;
    if (!length) {
      return [];
    }
    var args = Array(length - 1),
        array = arguments[0],
        index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }
    return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
  }
```

`concat` 使用 `arguments` 获取传入参数， 申明 `length` 得到 `arguments.length`，使用 `while` 循环将多余参数保存到 `args`， 最后调用了 `arrayPush` 方法，此时传入 2 个参数，`array` 处理成数组，`baseFlatten` 扁平化数组，最后返回一个合并后的数组。

## difference

> 创建一个差异化后的数组。

```js
/**
* Creates an array of `array` values not included in the other given arrays
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons. The order and references of result values are
* determined by the first array.
*
* **Note:** Unlike `pullAll`, this method returns a new array.
*
* @since 0.1.0
* @category Array
* @param {Array} array The array to inspect.
* @param {...Array} [values] The values to exclude.
* @returns {Array} Returns the new array of filtered values.
* @see union, unionBy, unionWith, without, xor, xorBy, xorWith,
* @example
*
* difference([2, 1], [2, 3])
* // => [1]
*/
function difference(array, ...values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : []
}
```

`difference` 接收2个参数，`array` 数组，`..values` 剩余参数。

通过 `isArrayLikeObject` 判断是否是数组，如果是调用 `baseDifference` 方法，否则返回一个空数组。

```js
baseFlatten(values, 1, isArrayLikeObject, true)
```

`baseFlatten` 会返回一个扁平化的数组。

调用 `baseDifference` 函数中将 `array` 和 `baseFlatten` 函数返回的扁平化的数组作为参数传入，最后返回处理后的函数。

## baseDifference

```js
/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}
```

`baseDifference` 接收 `array` `values` `iteratee` `comparator` 四个函数，但是 `difference` 只传 2 个函数，没有 `iteratee` `comparator` 不进入 `if` 循环，判断数组长度大于 200，使用 `SetCache` 类缓存 `values`。

进入 `for..of` 循环，此时 `iteratee === null` ，申明 `computed` 赋值为 `value`，接着使用 `while` 循环，将满足条件的 `value` 插入数组，最后将 `result` 返回。


## baseFlatten

> 返回扁平化的数组。

```js
/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}
```

在 `difference` 函数中调用：

```js
baseFlatten(values, 1, isArrayLikeObject, true)
```

`baseFlatten` 接收 `array` 数组、`depth` 深度, `predicate`, `isStrict` 严格, `result` 默认为空数组，
判断 `array == null` 如果等于 `null` ， 返回传入的 `result`。

进入 `for...of ` 循环，这个判断 `depth > 0` 并且调用传入 `predicate` 函数，就是 `isArrayLikeObject`， 满足条件再次判断 `depth > 1` ，就递归调用 `baseFlatten` 扁平化数组，
不满足就将 `...value` 插入 `result` 数组，此时 `isStrict` 为 `true`，并不会进入 `else if` 判断， 最后将 `result` 数组返回。

## isArrayLikeObject

> 这个方法类似 _.isArrayLike，除了它还检查值是否是个对象。

```js
/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}
```

`isArrayLikeObject` 接收 `value` 作为参数，通过 `isObjectLike` 和 `isArrayLike` 判断 `value` 是对象并且是一个数组。

## isObjectLike

> 检查 value 是否是 类对象。 类对象应该不是 null 以及 typeof 的结果是 "object"。

```js
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
function isObjectLike(value) {
  return typeof value == 'object' && value !== null
}
```

`isObjectLike` 接收 `value` 作为参数，通过 `typeof` 判断类型 `object` 对象并且 `value` 不等于 `null`，因为 `typeof null` 等于 `object`。


## isArrayLike

> 检查 `value` 是否是类数组。

```js
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */
function isArrayLike(value) {
  return value != null && typeof value != 'function' && isLength(value.length)
}
```

`isArrayLike` 接收 `value` 作为参数，判断 `value` 不等于 `null` 并且类型不为 `function`，并且通过 `isLength` 判断 `value` 是一个有效的数组长度。

## isLength

> 检查 `value` 是否是一个有效的数组长度。

```js
/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * isLength(3)
 * // => true
 *
 * isLength(Number.MIN_VALUE)
 * // => false
 *
 * isLength(Infinity)
 * // => false
 *
 * isLength('3')
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
```

`isLength` 接收 `value` 作为参数，通过 `typeof` 判断 `value` 是 `number` 类型，`value` 大于 `-1` 并且 `value % 1 == 0` 是判断为整数，`value <= MAX_SAFE_INTEGER` 小于等于最大有效数字。


## isFlattenable

> 判断是否是一个能展开的 `value`。

```js
import isArguments from '../isArguments.js'

/** Built-in value reference. */
const spreadableSymbol = Symbol.isConcatSpreadable

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol])
}
```

对象的 `Symbol.isConcatSpreadable` 属性等于一个布尔值，表示该对象用于 `Array.prototype.concat()` 时，是否可以展开。

`isFlattenable` 接收 `value` 作为参数，通过 `Array.isArray` 、`isArguments` 判断 ``value`` 是数组或是 一个 `arguments` 对象或者是一个能展开的 `Symbol`。

## isArguments

> 检查 `value` 是否是 类 `arguments` 对象。

```js
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}
```

`isArguments` 接收 `value` 作为参数，通过 `isObjectLike` 和 `getTag` 判断 `value` 是一个 `Arguments` 对象。

## getTag

> 进行类型的判断。

```js
/** `Object#toString` result references. */
const dataViewTag = '[object DataView]'
const mapTag = '[object Map]'
const objectTag = '[object Object]'
const promiseTag = '[object Promise]'
const setTag = '[object Set]'
const weakMapTag = '[object WeakMap]'

/** Used to detect maps, sets, and weakmaps. */
const dataViewCtorString = `${DataView}`
const mapCtorString = `${Map}`
const promiseCtorString = `${Promise}`
const setCtorString = `${Set}`
const weakMapCtorString = `${WeakMap}`

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
let getTag = baseGetTag

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (getTag(new Map) != mapTag) ||
    (getTag(Promise.resolve()) != promiseTag) ||
    (getTag(new Set) != setTag) ||
    (getTag(new WeakMap) != weakMapTag)) {
  getTag = (value) => {
    const result = baseGetTag(value)
    const Ctor = result == objectTag ? value.constructor : undefined
    const ctorString = Ctor ? `${Ctor}` : ''

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag
        case mapCtorString: return mapTag
        case promiseCtorString: return promiseTag
        case setCtorString: return setTag
        case weakMapCtorString: return weakMapTag
      }
    }
    return result
  }
}
```

`getTag` 其实是在 `baseGetTag` 的基础上进行了处理，主要是为了兼容 `IE 11` 上的 `data views, maps, sets, and weak maps`，还有 `Node.js < 6` 时候的 `promises`。

> TODO: 占坑

## baseGetTag

> `lodash` 重写的类型判断

```js
const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty
const toString = objectProto.toString
const symToStringTag = typeof Symbol != 'undefined' ? Symbol.toStringTag : undefined

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value)
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag)
  const tag = value[symToStringTag]
  let unmasked = false
  try {
    value[symToStringTag] = undefined
    unmasked = true
  } catch (e) {}

  const result = toString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}
```

`baseGetTag` 接收一个 `value` 作为参数，首先会判断在等于 `null` 情况下，全等于 `undefined` 就返回 `[object Undefined]` ，否则就是 `null`，返回 `[object Null]`。

```js
const symToStringTag = typeof Symbol != 'undefined' ? Symbol.toStringTag : undefined
```

通过判断 `typeof` 判断 `Symbol`，如果不等于 `undefined`，就采用 `Symbol.toStringTag` 方法。
对象的 `Symbol.toStringTag` 属性，指向一个方法。在该对象上面调用 `Object.prototype.toString` 方法时，如果这个属性存在，它的返回值会出现在 `toString` 方法返回的字符串之中，表示对象的类型。

```js
if (!(symToStringTag && symToStringTag in Object(value))) {
  return toString.call(value)
}
```

这里判断 `symToStringTag` 说明当前环境支持 `Symbol` ，并且通过 `in` 判断通过 `Object(value)` 转化后的对象是否有这个属性，没有这个属性，`if` 判断成立，返回 `toString.call(value)`，也就是`Object.prototype.toString.call(value)`，会返回 `[object String]` 这样的字符串。

```js
const isOwn = hasOwnProperty.call(value, symToStringTag)
```

通过 `hasOwnProperty` 方法判断 `value` 上是否有这个 `symToStringTag` 属性。

这个通过 `try catch` 包裹 `value[symToStringTag] = undefined`，并且将 `unmasked` 置为 `true`，

接下来就是对于 `Symbol` 类型的处理。

```js
if (unmasked) {
  if (isOwn) {
    value[symToStringTag] = tag
  } else {
    delete value[symToStringTag]
  }
}
```
 
```js
const result = toString.call(value)
```

最后还是返回 `result`，也就是 `Object.prototype.toString.call(value)`。

> DataView 

可使用 `DataView` 对象在 `ArrayBuffer` 中的任何位置读取和写入不同类型的二进制数据。

## differenceBy

> 这个方法类似 `_.difference`，除了它接受一个 `iteratee` 调用每一个数组和值。`iteratee` 会传入一个参数：(value)。

```js
/**
 * This method is like `difference` except that it accepts `iteratee` which
 * is invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * **Note:** Unlike `pullAllBy`, this method returns a new array.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [1.2]
 */
function differenceBy(array, ...values) {
  let iteratee = last(values)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), iteratee)
    : []
}
```

`differenceBy` 接收 2 个参数，`array` 数组，`values` 剩余参数，
首先通过 `last` 取出的最后一个数组，如果是对象并且是数组，将 `iteratee` 置为 `null`，最后判断 `array` 是否是对象并且是数组，还是通过返回 `baseDifference`  函数的结果，相比与 `difference` 函数，多传了一个，`iteratee` 处理函数。

```js
if (iteratee) {
  values = map(values, (value) => iteratee(value))
}
```

`values` 是的每一项都会经过 `iteratee` 函数的处理。

## differenceWith

> 这个方法类似 `_.difference` ，除了它接受一个 `comparator` 调用每一个数组元素的值。 `comparator` 会传入 2 个参数：(arrVal, othVal)。

```
/**
 * This method is like `difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `pullAllWith`, this method returns a new array.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 *
 * differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual)
 * // => [{ 'x': 2, 'y': 1 }]
 */
function differenceWith(array, ...values) {
  let comparator = last(values)
  if (isArrayLikeObject(comparator)) {
    comparator = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
    : []
}
```

`differenceWith` 函数与 `differenceBy` 相似，只不过调用 `baseDifference` 函数的时候第三个参数为 `undefined`，多了第四个参数 `comparator`。


```js
if (comparator) {
  includes = arrayIncludesWith
  isCommon = false
}
```

如果有 `comparator` 会将引入的 `arrayIncludesWith` 的赋值给 `includes`，并且将 `isCommon` 赋值为 `false`，在 `for...of` 循环时不会进入第一个 `if` 判断，根据 `includes` 返回的布尔值将 `value` 插入 `result`，最后将 `result` 返回。

```js
function arrayIncludesWith(array, target, comparator) {
  if (array == null) {
    return false
  }

  for (const value of array) {
    if (comparator(target, value)) {
      return true
    }
  }
  return false
}
```

`arrayIncludesWith` 函数会循环传入的数组，并且用 `comparator` 函数进行比较后返回。

## drop

> 裁剪数组中的前 N 个数组，返回剩余的部分。

```js
/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @since 0.5.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * drop([1, 2, 3])
 * // => [2, 3]
 *
 * drop([1, 2, 3], 2)
 * // => [3]
 *
 * drop([1, 2, 3], 5)
 * // => []
 *
 * drop([1, 2, 3], 0)
 * // => [1, 2, 3]
 */
function drop(array, n=1) {
  const length = array == null ? 0 : array.length
  return length
    ? slice(array, n < 0 ? 0 : n, length)
    : []
}
```

`drop` 函数接收 2 个数组， `array` 数组，`n` 裁剪的个数，默认为 1 ，首先申明 `length` 数组长度，默认为 0，有 `length` 就调用 `slice` 返回切割后的数组,否则返回空数组。

## dropRight

> 从右边开始裁剪数组中的 N 个数组，返回剩余的部分。

```js
/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * dropRight([1, 2, 3])
 * // => [1, 2]
 *
 * dropRight([1, 2, 3], 2)
 * // => [1]
 *
 * dropRight([1, 2, 3], 5)
 * // => []
 *
 * dropRight([1, 2, 3], 0)
 * // => [1, 2, 3]
 */
function dropRight(array, n=1) {
  const length = array == null ? 0 : array.length
  return length ? slice(array, 0, n < 0 ? 0 : -n) : []
}
```

`dropRight` 函数和 `drop` 函数类似，调用 `slice` 函数的参数有所不同，`n < 0` 就为 0，否则就为 `-n`，为负数时，`slice` 会从后面开始切割。

## dropRightWhile

> 从右边开始裁剪数组，起点从 predicate 返回假值开始。predicate 会传入3个参数：(value, index, array)。

```js
/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * dropRightWhile(users, ({ active }) => active)
 * // => objects for ['barney']
 */
function dropRightWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true, true)
    : []
}
```

`dropRightWhile` 函数接收 2 个参数，`array` 数组， `array` 不为 `null` 并且有长度，调用 `baseWhile` 函数。

## baseWhile

> 根据传入的条件处理后返回数组。

```js
/**
 * The base implementation of methods like `dropWhile` and `takeWhile`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
function baseWhile(array, predicate, isDrop, fromRight) {
  const { length } = array
  let index = fromRight ? length : -1

  while ((fromRight ? index-- : ++index < length) &&
    predicate(array[index], index, array)) {}

  return isDrop
    ? slice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
    : slice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index))
}
```

`baseWhile` 接收四个参数，`array` 数组、`predicate` 迭代调用函数、`isDrop` 是否舍弃 、`fromRight` 是否从右到左。

首先申明 `length` 取出 `array` 的长度，接着是一个 `while`，这里是一个 `&&` 连接符号，全部满足进行循环， 第一个条件是三元表达式，是否从右到左 `index` 累减去，否则累加小于数组长度，第二个条件是 `predicate` 函数的运行结果，最后根据 `isDrop` 返回不同的 `slice` 函数，`slice` 传入的下标位置不同，截取不同位置，最后将 `slice` 后得到的数组返回。

## dropWhile

> 裁剪数组，起点从 predicate 返回假值开始。predicate 会传入3个参数：(value, index, array)。

```js
/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * dropWhile(users, ({ active }) => active)
 * // => objects for ['pebbles']
 */
function dropWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true)
    : []
}
```

`dropWhile` 处理逻辑与 `dropRightWhile` 一样，调用 `baseWhile` 没有传第四个参数，默认从左往右开始截取。

## fill

> 指定 value 填充数组，从 start 到 end 的位置，但不包括 end 本身的位置。 

```js
/**
 * Fills elements of `array` with `value` from `start` up to, but not
 * including, `end`.
 *
 * **Note:** This method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Array
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.fill(array, 'a');
 * console.log(array);
 * // => ['a', 'a', 'a']
 *
 * _.fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 */
function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill(array, value, start, end);
}
```

`fill` 函数接收 4 个参数，`array` 数组、`value` 填充的值、`start` 开始位置，`end` 结束位置。

首先取出 `length`，没有 `length` 返回一个空数组，这里判断开始位置默认为 0，end 默认为数组长度，
然后调用 `baseFill` 函数，返回填充后的数组。


## baseFill

> 指定 value 填充数组，从 start 到 end 的位置，但不包括 end 本身的位置。

```js
/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 */
function baseFill(array, value, start, end) {
  var length = array.length;

  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
```

`fill` 函数接收 4 个参数，`array` 数组、`value` 填充的值、`start` 开始位置，`end` 结束位置。

首先保存数组长度，处理 `start` 、 `end` 边界条件，通过 `toInteger` 转成整数，`while` 循环，`start` 累加，往 `array` 赋值，最后将 `array` 返回。

## findIndex

> 这个方法类似 _.find。除了它返回最先通过 predicate 判断为真值的元素的 index ，而不是元素本身。

```js
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, getIteratee(predicate, 3), index);
}
```

`findIndex` 函数接收 3 个参数，`array` 数组、`predicate` 迭代函数，`fromIndex` 搜索开始下标。

首先获取数组长度，没有长度返回 `-1`，`index` 起始下标处理，如果 `index` 小于 0 ，取 `length + index` 和 0 的最大值，最后调用 `baseFindIndex` 返回处理后的数组。


## baseFindIndex

> 返回数组中符合迭代函数的下标。

```js
/**
 * The base implementation of `findIndex` and `findLastIndex`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}
```

`findIndex` 函数接收 4 个参数，`array` 数组、`predicate` 迭代函数，`fromIndex` 搜索开始下标，`fromRight` 是否从右到左。

开始取出 `array` 长度，初始下标，通过 `while` 循环不断迭代， `fromRight` 为真 说明从右到左，`index` 累减，否则 `index` 累加小于数组长度，这个判断判断 `predicate` 函数的返回值判断是否符合条件，满足的话返回对象下标，否则返回 -1。

## findLastIndex

> 这个方式类似 _.findIndex ， 不过它是从右到左的。

```js
/**
  * This method is like `_.findIndex` except that it iterates over elements
  * of `collection` from right to left.
  *
  * @static
  * @memberOf _
  * @since 2.0.0
  * @category Array
  * @param {Array} array The array to inspect.
  * @param {Function} [predicate=_.identity] The function invoked per iteration.
  * @param {number} [fromIndex=array.length-1] The index to search from.
  * @returns {number} Returns the index of the found element, else `-1`.
  * @example
  *
  * var users = [
  *   { 'user': 'barney',  'active': true },
  *   { 'user': 'fred',    'active': false },
  *   { 'user': 'pebbles', 'active': false }
  * ];
  *
  * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
  * // => 2
  *
  * // The `_.matches` iteratee shorthand.
  * _.findLastIndex(users, { 'user': 'barney', 'active': true });
  * // => 0
  *
  * // The `_.matchesProperty` iteratee shorthand.
  * _.findLastIndex(users, ['active', false]);
  * // => 2
  *
  * // The `_.property` iteratee shorthand.
  * _.findLastIndex(users, 'active');
  * // => 0
  */
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0
      ? nativeMax(length + index, 0)
      : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, getIteratee(predicate, 3), index, true);
}
```

`findLastIndex` 函数和 `findIndex` 相似，只是调用 `baseFindIndex` 函数传了第四个参数为 `true`，
在 `baseFindIndex` 中 `fromRight` 为真就从右往左开始循环。

## head

> 获得数组的首个元素。

```js
/**
 * Gets the first element of `array`.
 *
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @see last
 * @example
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
function head(array) {
  return (array != null && array.length)
    ? array[0]
    : undefined
}
```

如果 `array` 不为 `null` 并且有长度返回 `array` 的第一个。

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

## baseIndexOf

```js
/**
 * The base implementation of `indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex)
}
```

## flatten

数组扁平化。

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

## flattenDeep

> 数组扁平化，转成一维数组。

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

## flattenDepth

> 数组扁平化，可传入深度。

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

## fromPairs

> 反向版 _.toPairs，这个方法返回一个由键值对构成的对象。

```js
/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
  var index = -1,
    length = pairs == null ? 0 : pairs.length,
    result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}
```

`fromPairs` 接收 `pairs` 参数，通过 `while` 循环，以 `pair[0]` 为 `key` 、`pair[1]` 为 `value` 向 `result` 对象赋值，最近将 `result` 返回。

## indexOf

> 根据 value 使用 SameValueZero 等值比较返回数组中首次匹配的 index， 如果 fromIndex 为负值，将从数组尾端索引进行匹配，如果将 fromIndex 设置为 true，将使用更快的二进制检索机制。

```js
/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * indexOf([1, 2, 1, 2], 2)
 * // => 1
 *
 * // Search from the `fromIndex`.
 * indexOf([1, 2, 1, 2], 2, 2)
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = fromIndex == null ? 0 : +fromIndex
  if (index < 0) {
    index = Math.max(length + index, 0)
  }
  return baseIndexOf(array, value, index)
}
```

## baseIndexOf

## initial

> 获取数组中除了最后一个元素之外的所有元素。

```js
/**
 * Gets all but the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * initial([1, 2, 3])
 * // => [1, 2]
 */
function initial(array) {
  const length = array == null ? 0 : array.length
  return length ? slice(array, 0, -1) : []
}
```

`initial` 函数接收一个数组参数，首先会取出数组长度，最后调用 `slice` 函数处理后的数组，此时传参为 `0 -1`，会从第零个开始截取到最后第二个。

## intersection

> 创建一个包含所有使用 SameValueZero 进行等值比较后筛选的唯一值数组。
> 返回数组中所有数组共享元素的新数组。

```js
/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersection([2, 1], [2, 3])
 * // => [2]
 */
function intersection(...arrays) {
  const mapped = map(arrays, c)
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : []
}
```

调用 `map` 函数，返回经过 `castArrayLikeObject` 函数处理的数组，判断处理后的数组和原数组第 0 个相等，就调用 `baseIntersection` 函数返回处理后的数组。
 
`intersection`

## castArrayLikeObject

```js
/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : []
}
```

`castArrayLikeObject` 函数只是 `isArrayLikeObject` 的简单封装，如果 `value` 是对象数组则返回 `value`，否则返回空数组。

## map

```js
/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
```

`map` 函数接收 2 个参数， `array` 数组、`iteratee` 迭代器函数，申明 `result` 空数组，通过 `while` 循环，`index` 不断累加，将经过迭代器函数处理的 `value` 插入 `result`，最后将 `result` 返回。


### baseIntersection

```js
/**
 * The base implementation of methods like `intersection` that accepts an
 * array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  const includes = comparator ? arrayIncludesWith : arrayIncludes
  const length = arrays[0].length
  const othLength = arrays.length
  const caches = new Array(othLength)
  const result = []

  let array
  let maxLength = Infinity
  let othIndex = othLength

  while (othIndex--) {
    array = arrays[othIndex]
    if (othIndex && iteratee) {
      array = map(array, (value) => iteratee(value))
    }
    maxLength = Math.min(array.length, maxLength)
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined
  }
  array = arrays[0]

  let index = -1
  const seen = caches[0]

  outer:
  while (++index < length && result.length < maxLength) {
    let value = array[index]
    const computed = iteratee ? iteratee(value) : value

    value = (comparator || value !== 0) ? value : 0
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength
      while (--othIndex) {
        const cache = caches[othIndex]
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer
        }
      }
      if (seen) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}
```

TODO: 占坑

## intersectionBy

> 这个方法类似 _.intersection，除了它接受一个 iteratee 调用每一个数组和值。iteratee 会传入一个参数：(value)。

```
/**
 * This method is like `intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [2.1]
 */
function intersectionBy(...arrays) {
  let iteratee = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  if (iteratee === last(mapped)) {
    iteratee = undefined
  } else {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, iteratee)
    : []
}
```

## intersectionWith

> 这个方法类似 _.intersection，除了它接受一个 comparator 调用每一个数组和值。iteratee 会传入2个参数：((arrVal, othVal)。

```js
/**
 * This method is like `intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * intersectionWith(objects, others, isEqual)
 * // => [{ 'x': 1, 'y': 2 }]
 */
function intersectionWith(...arrays) {
  let comparator = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  comparator = typeof comparator == 'function' ? comparator : undefined
  if (comparator) {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, undefined, comparator)
    : []
}
```

TODO: 占坑

## join

> 将数组中的所有元素转换为由 separator 分隔的字符串。

```js
/**
  * Converts all elements in `array` into a string separated by `separator`.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to convert.
  * @param {string} [separator=','] The element separator.
  * @returns {string} Returns the joined string.
  * @example
  *
  * _.join(['a', 'b', 'c'], '~');
  * // => 'a~b~c'
  */
function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}
```

`join` 是数组原生方法 `join` 的简单封装，只是判断 `array` 等于 `null` 返回空字符串。


```js
var arrayProto = Array.prototype
var nativeJoin = arrayProto.join

nativeJoin === Array.prototype.join
```

## last

> 获取数组中的最后一个元素。

```js
/**
 * Gets the last element of `array`.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 */
function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}
```

没有传入 `array` 的情况取到 `length`，然后返回数组最后一个，没有就返回 `undefined`。

## lastIndexOf

> 这个方法类似 _.indexOf，除了它是从右到左遍历元素的。

```js
/**
 * This method is like `indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * lastIndexOf([1, 2, 1, 2], 2)
 * // => 3
 *
 * // Search from the `fromIndex`.
 * lastIndexOf([1, 2, 1, 2], 2, 2)
 * // => 1
 */
function lastIndexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = length
  if (fromIndex !== undefined) {
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1)
  }
  return value === value
    ? strictLastIndexOf(array, value, index)
    : baseFindIndex(array, baseIsNaN, index, true)
}
```

`lastIndexOf` 接收 3 个参数，`array` 数组、`value` 检索值、`fromIndex` 起始位置。

首先取出数组长度，没有返回 -1，如果有 `fromIndex`，处理起始 `index` ，随后判断 `value === value`，这里是做了 `value` 是 `NaN` 的处理，不是 `NaN` 返回 `strictLastIndexOf` 函数取得的下标，是 `NaN` 的话就调用 `baseFindIndex` ，并将 `baseIsNaN` 最为迭代函数传入，返回数组中符合迭代函数的下标。

## strictLastIndexOf

> 严格相等的 lastIndexOf 。

```js
/**
 * A specialized version of `lastIndexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictLastIndexOf(array, value, fromIndex) {
  let index = fromIndex + 1
  while (index--) {
    if (array[index] === value) {
      return index
    }
  }
  return index
}
```
`strictLastIndexOf` 接收 3 个参数，`array` 数组、`value` 检索值、`fromIndex` 起始位置。

在 `while` 中将 `index` 累减，判断 `value` 相等返回对应下标。

## nth

> 获取数组索引的 value

```js
/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned.
 *
 * @since 4.11.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=0] The index of the element to return.
 * @returns {*} Returns the nth element of `array`.
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 *
 * nth(array, 1)
 * // => 'b'
 *
 * nth(array, -2)
 * // => 'c'
 */
function nth(array, n) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return
  }
  n += n < 0 ? length : 0
  return isIndex(n, length) ? array[n] : undefined
}
```

## pull

> 移除所有经过 SameValueZero 等值比较为 true 的元素。

```js
/**
 * Removes all given values from `array` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `without`, this method mutates `array`. Use `remove`
 * to remove elements from an array by predicate.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @returns {Array} Returns `array`.
 * @see pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pull(array, 'a', 'c')
 * console.log(array)
 * // => ['b', 'b']
 */
function pull(array, ...values) {
  return pullAll(array, values)
}
```


## pullAll

> 这个方式类似 _.pull，除了它接受数组形式的一系列值。 

```js
/**
 * This method is like `pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `difference`, this method mutates `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @returns {Array} Returns `array`.
 * @see pull, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pullAll(array, ['a', 'c'])
 * console.log(array)
 * // => ['b', 'b']
 */
function pullAll(array, values) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values)
    : array
}
```