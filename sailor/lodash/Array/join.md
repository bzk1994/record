## join

> 将数组中的所有元素转换为由 separator 分隔的字符串。

```js
/**
  * Converts all elements in `array` into a string separated by `separator`.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to convert.
  * @param {string} [separator=','] The element separator.
  * @returns {string} Returns the joined string.
  * @example
  *
  * _.join(['a', 'b', 'c'], '~');
  * // => 'a~b~c'
  */
function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}
```

`join` 是数组原生方法 `join` 的简单封装，只是判断 `array` 等于 `null` 返回空字符串。


```js
var arrayProto = Array.prototype
var nativeJoin = arrayProto.join

nativeJoin === Array.prototype.join
```
