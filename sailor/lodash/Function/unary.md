## unary

> 创建一个最多接受一个参数的函数，忽略多余的参数。

```js
_.unary(func)
```

```js
/**
  * Creates a function that accepts up to one argument, ignoring any
  * additional arguments.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Function
  * @param {Function} func The function to cap arguments for.
  * @returns {Function} Returns the new capped function.
  * @example
  *
  * _.map(['6', '8', '10'], _.unary(parseInt));
  * // => [6, 8, 10]
  */
function unary(func) {
  return ary(func, 1);
}
```

## ary

```js
/**
  * Creates a function that invokes `func`, with up to `n` arguments,
  * ignoring any additional arguments.
  *
  * @static
  * @memberOf _
  * @since 3.0.0
  * @category Function
  * @param {Function} func The function to cap arguments for.
  * @param {number} [n=func.length] The arity cap.
  * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
  * @returns {Function} Returns the new capped function.
  * @example
  *
  * _.map(['6', '8', '10'], _.ary(parseInt, 1));
  * // => [6, 8, 10]
  */
function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = (func && n == null) ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}
```