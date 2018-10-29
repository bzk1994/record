## bindAll

> 绑定对象的方法到对象本身，覆盖已存在的方法。 

```js
_.bindAll(object, methodNames)
```

```js
/**
  * Binds methods of an object to the object itself, overwriting the existing
  * method.
  *
  * **Note:** This method doesn't set the "length" property of bound functions.
  *
  * @static
  * @since 0.1.0
  * @memberOf _
  * @category Util
  * @param {Object} object The object to bind and assign the bound methods to.
  * @param {...(string|string[])} methodNames The object method names to bind.
  * @returns {Object} Returns `object`.
  * @example
  *
  * var view = {
  *   'label': 'docs',
  *   'click': function() {
  *     console.log('clicked ' + this.label);
  *   }
  * };
  *
  * _.bindAll(view, ['click']);
  * jQuery(element).on('click', view.click);
  * // => Logs 'clicked docs' when clicked.
  */
var bindAll = flatRest(function (object, methodNames) {
  arrayEach(methodNames, function (key) {
    key = toKey(key);
    baseAssignValue(object, key, bind(object[key], object));
  });
  return object;
});
```

`bindAll` 函数是调用 `flatRest` 后返回的函数，并且传入了回调函数，在回调函数中会循环 `methodNames`，并且调用 `baseAssignValue` 函数实现属性的拷贝，这里会将原来的 `key` 的覆盖替换成 `bind(object[key], object)`，`bind` 实现会将 `object[key]` 的 `this` 绑定到 `object` 上。

## flatRest

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

`flatRest` 函数是调用 `createWrap` 的返回，


## flatRest

```js
/**
  * A specialized version of `baseRest` which flattens the rest array.
  *
  * @private
  * @param {Function} func The function to apply a rest parameter to.
  * @returns {Function} Returns the new function.
  */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}
```

`flatRest` 函数时调用 `setToString` 函数的返回，并且传入了 `overRest` 处理后 `func`。

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
var setToString = shortOut(baseSetToString);
```

`setToString` 是 `shortOut` 函数调用返回，并且传入了 `baseSetToString` 。

```js
/**
  * The base implementation of `setToString` without support for hot loop shorting.
  *
  * @private
  * @param {Function} func The function to modify.
  * @param {Function} string The `toString` result.
  * @returns {Function} Returns `func`.
  */
var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
```
如果支持 `defineProperty` 调用 `defineProperty` 为 `func` 添加 `toString` 属性，`value` 为 `constant(string)` 返回 `string` 的函数，否则赋值为 `identity` 直接返回 `value` 的方法。