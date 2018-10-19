## keys

> 创建 object 自身可枚举属性名为一个数组。 

```js
_.keys(object)
```

```js
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @see values, valuesIn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo)
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * keys('hi')
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
}
```

`keys` 函数返回了一个三元表达式，`isArrayLike` 判断如果是类数组，就调用 `arrayLikeKeys` 函数返回处理后的数组，否则就是一个 `Object`，调用 `Object.keys` 方法返回对象 `key` 数组。

## keysIn

> 创建 object 自身 或 继承的可枚举属性名为一个数组。 


```js
_.keysIn(object)
```

```js
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
```

`keysIn` 函数内会调用 `isArrayLike` 判断 `object` 是否是数组，是数组就调用 `arrayLikeKeys` 函数返回处理后的数组，否则就调用 `baseKeysIn` 函数。

## baseKeysIn

```js
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
    result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
```

`baseKeysIn` 函数会调用 `isObject` 方法判断 `object` 类型，如果不是对象，返回调用 `nativeKeysIn` 函数处理后的数组, `nativeKeysIn` 函数时简单的 `Object.keys()` 实现：

```js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
```

申明 `result` 数组，`for...in` 遍历 `Object`，将 `key` 插入 `result`，最后将 `result` 返回。

接着进入 `for...in` 循环，这里有一个比较复杂得判断，

`key` 等于 `constructor` 并且 `isProto` 也就是 `isPrototype(object)` 是原型对象，或者 `!hasOwnProperty.call(object, key)` `object` 的属性上没有这个 `key`，然后在取非，也就是说不是 `constructor` 并且不是原型对象或者不是 `constructor` 并且 `object` 除原型外有这个属性，就将 `key` 插入 `result`，最后将 `result` 返回。
