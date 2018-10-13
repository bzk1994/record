## toPairs

> 创建一个对象自身可枚举属性的键值对数组。

```js
_.toPairs(object)
```

```js
/**
 * Creates an array of own enumerable string keyed-value pairs for `object`
 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
 * entries are returned.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias entries
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
var toPairs = createToPairs(keys);
```

`toPairs` 是 `createToPairs` 函数的返回值。

## createToPairs

```js
/**
 * Creates a `_.toPairs` or `_.toPairsIn` function.
 *
 * @private
 * @param {Function} keysFunc The function to get the keys of a given object.
 * @returns {Function} Returns the new pairs function.
 */
function createToPairs(keysFunc) {
  return function(object) {
    var tag = getTag(object);
    if (tag == mapTag) {
      return mapToArray(object);
    }
    if (tag == setTag) {
      return setToPairs(object);
    }
    return baseToPairs(object, keysFunc(object));
  };
}
```

`createToPairs` 返回一个 `function`，也就是 `toPairs` 函数，函数接收一个对象，
使用 `getTag` 得到 `[object Type]` 形式的类型字符串，如果是 `Map` 类型返回 `mapToArray` 函数调用后的数组：

```js
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
```

`mapToArray` 函数会循环往会以 `key: value` 的形式往 `result` 插入，最后将 `result` 返回。

如果是 `Tag` 类型返回 `setToPairs` 函数调用后的数组，与 `map` 类型一致。
最后是排除以上 2 种情况，调用 `baseToPairs` 函数：

// baseToPairs(object, keysFunc(object));

## 

> 

```js

```

```js

```