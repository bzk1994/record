## forIn

> 使用 iteratee 遍历对象的自身和继承的可枚举属性。 iteratee 会传入3个参数：(value, key, object)。 如果返回 false，iteratee 会提前退出遍历。

```js
_.forIn(object, [iteratee=_.identity])
```

```js
/**
  * Iterates over own and inherited enumerable string keyed properties of an
  * object and invokes `iteratee` for each property. The iteratee is invoked
  * with three arguments: (value, key, object). Iteratee functions may exit
  * iteration early by explicitly returning `false`.
  *
  * @static
  * @memberOf _
  * @since 0.3.0
  * @category Object
  * @param {Object} object The object to iterate over.
  * @param {Function} [iteratee=_.identity] The function invoked per iteration.
  * @returns {Object} Returns `object`.
  * @see _.forInRight
  * @example
  *
  * function Foo() {
  *   this.a = 1;
  *   this.b = 2;
  * }
  *
  * Foo.prototype.c = 3;
  *
  * _.forIn(new Foo, function(value, key) {
  *   console.log(key);
  * });
  * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
  */
function forIn(object, iteratee) {
  return object == null
    ? object
    : baseFor(object, getIteratee(iteratee, 3), keysIn);
}
```

`forIn` 函数接收 2 个参数，`object` 遍历对象、`iteratee` 迭代函数。

如果 `object` 为 `null` 返回 `object`，否则返回调用 `baseFor` 函数。

## baseFor

```js
/**
  * The base implementation of `baseForOwn` which iterates over `object`
  * properties returned by `keysFunc` and invokes `iteratee` for each property.
  * Iteratee functions may exit iteration early by explicitly returning `false`.
  *
  * @private
  * @param {Object} object The object to iterate over.
  * @param {Function} iteratee The function invoked per iteration.
  * @param {Function} keysFunc The function to get the keys of `object`.
  * @returns {Object} Returns `object`.
  */
var baseFor = createBaseFor();
```

`baseFor` 函数时调用 `createBaseFor` 函数的返回函数。

## createBaseFor

```js
/**
  * Creates a base function for methods like `_.forIn` and `_.forOwn`.
  *
  * @private
  * @param {boolean} [fromRight] Specify iterating from right to left.
  * @returns {Function} Returns the new base function.
  */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
```

`createBaseFor` 接收一个 `fromRight` 参数，但是 `baseFor` 调用并没有传参，`createBaseFor` 会返回一个 `function` ，这个函数才是 `baseFor` 函数：

```js
function(object, iteratee, keysFunc) {
  var index = -1,
      iterable = Object(object),
      props = keysFunc(object),
      length = props.length;

  while (length--) {
    var key = props[fromRight ? length : ++index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
};
```

函数内部会调用 `keysFunc` 函数，也就是 `keysIn` 获取对象的 `key` 数组，进行 `while` 循环，`length` 累减，这里会判断 `fromRight` 是否为真，如果为真就从右开始取值，然后调用 `iteratee` 函数返回为 `false`，就中断循环，最后将 `object` 返回。

## forInRight

> 这个方法类似 _.forIn。 除了它是反方向开始遍历的。

```js
/**
  * This method is like `_.forIn` except that it iterates over properties of
  * `object` in the opposite order.
  *
  * @static
  * @memberOf _
  * @since 2.0.0
  * @category Object
  * @param {Object} object The object to iterate over.
  * @param {Function} [iteratee=_.identity] The function invoked per iteration.
  * @returns {Object} Returns `object`.
  * @see _.forIn
  * @example
  *
  * function Foo() {
  *   this.a = 1;
  *   this.b = 2;
  * }
  *
  * Foo.prototype.c = 3;
  *
  * _.forInRight(new Foo, function(value, key) {
  *   console.log(key);
  * });
  * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
  */
function forInRight(object, iteratee) {
  return object == null
    ? object
    : baseForRight(object, getIteratee(iteratee, 3), keysIn);
}
```

`forInRight` 函数内部与 `forIn` 函数内部相似，只是调用了 `baseForRight` 函数。

## baseForRight

```js
/**
  * This function is like `baseFor` except that it iterates over properties
  * in the opposite order.
  *
  * @private
  * @param {Object} object The object to iterate over.
  * @param {Function} iteratee The function invoked per iteration.
  * @param {Function} keysFunc The function to get the keys of `object`.
  * @returns {Object} Returns `object`.
  */
var baseForRight = createBaseFor(true);
```

我们可以看到 `baseForRight` 函数在调用 `createBaseFor` 函数时传入了 `true`，在 `createBaseFor` 内部会判断 `fromRight` 为真就反向遍历。

```js
while (length--) {
  var key = props[fromRight ? length : ++index];
  if (iteratee(iterable[key], key, iterable) === false) {
    break;
  }
}
```