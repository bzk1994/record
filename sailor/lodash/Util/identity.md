## identity

> 这个方法返回首个提供的参数

```js
_.identity(value)
```

```js
/**
  * This method returns the first argument it receives.
  *
  * @static
  * @since 0.1.0
  * @memberOf _
  * @category Util
  * @param {*} value Any value.
  * @returns {*} Returns `value`.
  * @example
  *
  * var object = { 'a': 1 };
  *
  * console.log(_.identity(object) === object);
  * // => true
  */
function identity(value) {
  return value;
}
```

只是将传入的第一个参数返回。