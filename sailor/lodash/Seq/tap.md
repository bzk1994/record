## tap

> 这个方法调用一个 interceptor 并返回 value。interceptor 传入一个参数：(value) 目的是 进入 链的中间以便执行操作。

```js
_.tap(value, interceptor)
```

```js
 /**
  * This method invokes `interceptor` and returns `value`. The interceptor
  * is invoked with one argument; (value). The purpose of this method is to
  * "tap into" a method chain sequence in order to modify intermediate results.
  *
  * @static
  * @memberOf _
  * @since 0.1.0
  * @category Seq
  * @param {*} value The value to provide to `interceptor`.
  * @param {Function} interceptor The function to invoke.
  * @returns {*} Returns `value`.
  * @example
  *
  * _([1, 2, 3])
  *  .tap(function(array) {
  *    // Mutate input array.
  *    array.pop();
  *  })
  *  .reverse()
  *  .value();
  * // => [2, 1]
  */
function tap(value, interceptor) {
  interceptor(value);
  return value;
}
```

`tap` 在函数内部调用传入 `interceptor` 函数，并将 `value` 作为参数传入，最后将 `value` 返回。

## thru

> 这个方法类似 _.tap， 除了它返回 interceptor 的返回结果

```js
_.thru(value, interceptor)
```

```js
/**
  * This method is like `_.tap` except that it returns the result of `interceptor`.
  * The purpose of this method is to "pass thru" values replacing intermediate
  * results in a method chain sequence.
  *
  * @static
  * @memberOf _
  * @since 3.0.0
  * @category Seq
  * @param {*} value The value to provide to `interceptor`.
  * @param {Function} interceptor The function to invoke.
  * @returns {*} Returns the result of `interceptor`.
  * @example
  *
  * _('  abc  ')
  *  .chain()
  *  .trim()
  *  .thru(function(value) {
  *    return [value];
  *  })
  *  .value();
  * // => ['abc']
  */
function thru(value, interceptor) {
  return interceptor(value);
}
```

`thru` 函数直接返回了调用 `interceptor` 函数的结果。

## 

> 

```js

```

```js

```

