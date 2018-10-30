## stubArray

> 此方法返回一个新的空数组。

```js
_.stubArray()
```

```js
/**
  * This method returns a new empty array.
  *
  * @static
  * @memberOf _
  * @since 4.13.0
  * @category Util
  * @returns {Array} Returns the new empty array.
  * @example
  *
  * var arrays = _.times(2, _.stubArray);
  *
  * console.log(arrays);
  * // => [[], []]
  *
  * console.log(arrays[0] === arrays[1]);
  * // => false
  */
function stubArray() {
  return [];
}
```

真的是返回一个空数组。

## stubFalse

> 此方法返回 false。

```js
_.stubFalse()
```

```js
/**
  * This method returns `false`.
  *
  * @static
  * @memberOf _
  * @since 4.13.0
  * @category Util
  * @returns {boolean} Returns `false`.
  * @example
  *
  * _.times(2, _.stubFalse);
  * // => [false, false]
  */
function stubFalse() {
  return false;
}
```

真的是返回一个 `false`。

## stubObject

> 此方法返回一个新的空对象。

```js
_.stubObject()
```

```js
/**
  * This method returns a new empty object.
  *
  * @static
  * @memberOf _
  * @since 4.13.0
  * @category Util
  * @returns {Object} Returns the new empty object.
  * @example
  *
  * var objects = _.times(2, _.stubObject);
  *
  * console.log(objects);
  * // => [{}, {}]
  *
  * console.log(objects[0] === objects[1]);
  * // => false
  */
function stubObject() {
  return {};
}
```

真的是返回一个 `{}`。

## stubString

> 此方法返回一个空字符串。

```js
_.stubString()
```

```js
/**
  * This method returns an empty string.
  *
  * @static
  * @memberOf _
  * @since 4.13.0
  * @category Util
  * @returns {string} Returns the empty string.
  * @example
  *
  * _.times(2, _.stubString);
  * // => ['', '']
  */
function stubString() {
  return '';
}
```

真的是返回一个 `''`。

## stubTrue

> 此方法返回 true 。

```js
_.stubTrue()
```

```js
/**
  * This method returns `true`.
  *
  * @static
  * @memberOf _
  * @since 4.13.0
  * @category Util
  * @returns {boolean} Returns `true`.
  * @example
  *
  * _.times(2, _.stubTrue);
  * // => [true, true]
  */
function stubTrue() {
  return true;
}
```

真的是返回一个 `''`。
