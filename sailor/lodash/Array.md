# Array Methods

## 

> 

```js

```

```js

```

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




> 执行 `array` 的二进制搜索，以确定 `value` 的索引。
```js

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
const HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1

/**
 * The base implementation of `sortedIndex` and `sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
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
TODO: 占坑
