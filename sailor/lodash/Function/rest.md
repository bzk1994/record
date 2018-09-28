## rest

> 创建一个调用 func 的函数。 this 绑定到这个函数 并且 从 start 之后的参数都作为数组传入。 

```js
_.rest(func, [start=func.length-1])
```

```js
  /**
   * Creates a function that invokes `func` with the `this` binding of the
   * created function and arguments from `start` and beyond provided as
   * an array.
   *
   * **Note:** This method is based on the
   * [rest parameter](https://mdn.io/rest_parameters).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Function
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.rest(function(what, names) {
   *   return what + ' ' + _.initial(names).join(', ') +
   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
   * });
   *
   * say('hello', 'fred', 'barney', 'pebbles');
   * // => 'hello fred, barney, & pebbles'
   */
  function rest(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = start === undefined ? start : toInteger(start);
    return baseRest(func, start);
  }
```

`rest` 函数接收 2 个参数，`func` 要处理的函数、`start` 参数开始位置。

调用 `toInteger` 函数对 `start` 取整，然后返回 `baseRest` 的调用返回。

## baseRest

```js
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}
```

`baseRest` 返回一个调用 `setToString` 后的返回值。


## setToString

```js
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
function setToString(func, string) {
  return Object.defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': () => string,
    'writable': true
  })
}
```

`setToString` 方法是调用 `defineProperty` 方法为 `func` 的原型拦截了 `toString` 方法，设置为传入的 `string`。


## overRest

```js
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function () {
    var args = arguments,
      index = -1,
      length = nativeMax(args.length - start, 0),
      array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
```

`overRest` 接收 3 个参数， `func` 重置参数的函数、`start` 参数起始位置、`transform` 剩余数组转换。

通过 `nativeMax` 也就是 `Math.max`，得到 `start` ,然后会返回一个 `function`，函数内部会进行 2 个 `while` 循环，第一个 `while` 会将 `start` 之后的参数保存到 `array`，然后将 `start` 之前的参数保存到 `otherArgs`，最后返回 `apply` 函数的调用结果。


```js
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
```

`apply` 内部也是基原生的 `apply` 方法实现。