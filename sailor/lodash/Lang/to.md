## toArray

> 转换 value 为数组

```js
_.toArray(value)
```

```js

/** `Object#toString` result references. */
const mapTag = '[object Map]'
const setTag = '[object Set]'

/** Built-in value references. */
const symIterator = Symbol ? Symbol.iterator : undefined

/**
 * Converts `value` to an array.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * toArray({ 'a': 1, 'b': 2 })
 * // => [1, 2]
 *
 * toArray('abc')
 * // => ['a', 'b', 'c']
 *
 * toArray(1)
 * // => []
 *
 * toArray(null)
 * // => []
 */
function toArray(value) {
  if (!value) {
    return []
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value)
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]())
  }
  const tag = getTag(value)
  const func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values)

  return func(value)
}
```

`toArray` 函数首先会进行非空判断，然后调用 `isArrayLike` 判断是否是类数组，如果是 `isString`，调用 `stringToArray` 转成数组，否则调用 `copyArray` 返回一个浅拷贝的数组。

如果是 `symIterator` 类型调用 `iteratorToArray` 返回转化后的数组，
不满足已上情况调用 `getTag` 获取 `value` 的对象类型字符串，这个会根据 `map` 、`set` 类型返回 `mapToArray`、`setToArray` 方法。

## toFinite

> 将值转换为有限数字。

```js
_.toFinite(value)
```

```js
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e+308

/**
 * Converts `value` to a finite number.
 *
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value)
  if (value === INFINITY || value === -INFINITY) {
    const sign = (value < 0 ? -1 : 1)
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0
}
```

`toFinite` 函数内部有多个判断，`value` 取非为真返回 0，使用 `toInteger` 函数将 `value` 转化为整数，如果小于负的 `MAX_SAFE_INTEGER` 返回 `-MAX_SAFE_INTEGER`，如果大于 `MAX_SAFE_INTEGER` 返回 `MAX_SAFE_INTEGER`，最后 `value` 等于自身返回 `value`，不是的话说明是 `NaN`，返回 0。

## toInteger

> 将 `value` 转换为整数。

```js
_.toInteger(value)
```

```js
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @see isInteger, isNumber, toNumber
 * @example
 *
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 */
function toInteger(value) {
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
}
```

`toInteger` 函数调用 `toFinite` 将 `value` 转成有效数字，然后对其进行 `% 1` 取值，如果有 `remainder` 返回 `result - remainder `，否则返回 `result`。

## toLength

> 转换 value 为用作类数组对象的长度整数。 

```js
_.toLength(value)
```

```js

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295

/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 *
 * **Note:** This method is based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toLength(3.2)
 * // => 3
 *
 * toLength(Number.MIN_VALUE)
 * // => 0
 *
 * toLength(Infinity)
 * // => 4294967295
 *
 * toLength('3.2')
 * // => 3
 */
function toLength(value) {
  if (!value) {
    return 0
  }
  value = toInteger(value)
  if (value < 0) {
    return 0
  }
  if (value > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH
  }
  return value
}
```

`toLength` 函数首先会进行非空哦按段，然后将 `value` 转换成整数，小于 0 返回 0，大于 `MAX_ARRAY_LENGTH` 返回 `MAX_ARRAY_LENGTH`，最后返回 `value` 。

## toNumber

> 将值转换为数字。

```js
_.toNumber(value)
```

```js
/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt

/**
 * Converts `value` to a number.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }
  if (isObject(value)) {
    const other = typeof value.valueOf == 'function' ? value.valueOf() : value
    value = isObject(other) ? `${other}` : other
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value
  }
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}
```

`toNumber` 函数内部有很多类型判断，
如果是 `number` 类型返回 `value`，
如果是 `isSymbol` 返回 `NaN`，
如果是 `object` 调用内置的 `valueOf` 方法，
如果不是字符串，等于 0 返回 0，否则用 `+value` 隐式转换后返回，
最后使用正则去除空格后调用 `freeParseInt` 转换。

## toPlainObject

> 转换 value 为普通对象。 包括继承的可枚举属性。

```js
_.toPlainObject(value)
```

```js
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * assign({ 'a': 1 }, new Foo)
 * // => { 'a': 1, 'b': 2 }
 *
 * assign({ 'a': 1 }, toPlainObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  value = Object(value)
  const result = {}
  for (const key in value) {
    result[key] = value[value]
  }
  return result
}
```

`toPlainObject` 函数内部是一个 `for...in` 循环，申明空对象 `result` ，往对象上赋值，最后返回。

## toSafeInteger

> 将值转换为安全整数。

```js
_.toSafeInteger(value)
```

```js
/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/**
 * Converts `value` to a safe integer. A safe integer can be compared and
 * represented correctly.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toSafeInteger(3.2)
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toSafeInteger(Infinity)
 * // => 9007199254740991
 *
 * toSafeInteger('3.2')
 * // => 3
 */
function toSafeInteger(value) {
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toInteger(value)
  if (value < -MAX_SAFE_INTEGER) {
    return -MAX_SAFE_INTEGER
  }
  if (value > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER
  }
  return value
}
```

`toSafeInteger` 函数内部有多个判断，`value` 取非为真返回 0，使用 `toInteger` 函数将 `value` 转化为整数，如果小于负的 `MAX_SAFE_INTEGER` 返回 `-MAX_SAFE_INTEGER`，如果大于 `MAX_SAFE_INTEGER` 返回 `MAX_SAFE_INTEGER`。

## toString

> 如果 value 不是字符串，将其转换为字符串。 null 和 undefined 将返回空字符串。

```js
_.toString(value)
```

```js
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/** Used to convert symbols to primitives and strings. */
const symbolProto = Symbol ? Symbol.prototype : undefined
const symbolToString = symbolProto ? symbolProto.toString : undefined

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
function toString(value) {
  if (value == null) {
    return ''
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${map(value, (other) => other == null ? other : toString(other))}`
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}
```

`toString` 函数首先进行非空处理，如果是字符串直接返回，返回循环后的字符串模板，
如果是  `Symbol` 调用 `symbolToString` 方法，
最后判断使用 `es6` 模板转成字符串，等于字符串 0 或者等于 `INFINITY`，返回 `-1`，
否则返回 `result`。