## omit

> 反向版 _.pick。 这个方法返回忽略属性之外的自身和继承的可枚举属性。

```js
_.omit(object, [props])
```

```js
/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function (object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function (path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
```

`omit` 函数是 `flatRest` 函数的调用返回，传入了回调函数，回调函数接收 2 个参数，`object` 遍历对象、`paths` 忽略 `key` 数组。

回调函数内部申明 `result` 空对象，对 `object` 进行非空判断，调用 `arrayMap` 对 `paths` 进行遍历，在回调中会调用 `castPath` 转化成路径数组，并对 `isDeep` 保存当前深度，接着调用 `copyObject` 函数进行属性拷贝。

如果 `isDeep` 为真，这里调用 `baseClone` 函数又对 `result` 进行了拷贝，实现了深拷贝防止指向同一指针的 `value`，接着会进行 `while` 循环， `length` 累减，调用 `baseUnset` 函数：

```js
/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}
```

`baseUnset` 函数会判断如果 `object` 如果有 `path` 路径调用 `delete` 删除这个 `key`，最后将处理好的 `result` 返回。

## omitBy

> 反向版 _.pickBy。 这个方法返回经 predicate 判断不是真值的属性的自身和继承的可枚举属性。

```js
_.omitBy(object, [predicate=_.identity])
```

```js
/**
 * The opposite of `_.pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */
function omitBy(object, predicate) {
  return pickBy(object, negate(getIteratee(predicate)));
}
```

`omitBy` 函数接收 `object` 源对象、`predicate` 迭代函数。

函数内部会返回 `pickBy` 函数的调用返回， `pickBy` 传入了 2 个参数 `object` 源对象，`negate(getIteratee(predicate))` 函数的调用返回，而 `negate` 函数的参数又是 `getIteratee` 函数传入 `predicate` 的返回。

## getIteratee

```js
/**
 * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
 * this function returns the custom method, otherwise it returns `baseIteratee`.
 * If arguments are provided, the chosen function is invoked with them and
 * its result is returned.
 *
 * @private
 * @param {*} [value] The value to convert to an iteratee.
 * @param {number} [arity] The arity of the created iteratee.
 * @returns {Function} Returns the chosen function or its result.
 */
function getIteratee() {
  var result = lodash.iteratee || iteratee;
  result = result === iteratee ? baseIteratee : result;
  return arguments.length ? result(arguments[0], arguments[1]) : result;
}
```

`getIteratee` 函数会判断 `arguments.length` ，如果有就调用 `result` 函数，也就是 `iteratee`，然后传入
`arguments`，否则返回 `result`。


## negate

```js
/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function () {
    var args = arguments;
    switch (args.length) {
      case 0: return !predicate.call(this);
      case 1: return !predicate.call(this, args[0]);
      case 2: return !predicate.call(this, args[0], args[1]);
      case 3: return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}
```

`negate` 函数返回了一个 `function`，在这个 `function` 会对 `args.length` 长度进行处理，然对`predicate` 调用后的值取非返回。
