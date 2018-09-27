## rearg

> 创建一个调用 func 的函数。 所传递的参数根据 indexes 调整到对应位置。 第一个 index 对应到第一个传参，第二个 index 对应到第二个传参，以此类推。

```js
_.rearg(func, indexes)
```

```js
  /**
   * Creates a function that invokes `func` with arguments arranged according
   * to the specified `indexes` where the argument value at the first index is
   * provided as the first argument, the argument value at the second index is
   * provided as the second argument, and so on.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to rearrange arguments for.
   * @param {...(number|number[])} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var rearged = _.rearg(function(a, b, c) {
   *   return [a, b, c];
   * }, [2, 0, 1]);
   *
   * rearged('b', 'c', 'a')
   * // => ['a', 'b', 'c']
   */
  var rearg = flatRest(function (func, indexes) {
    return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
  });
```

## 

> 

```js

```

```js

```