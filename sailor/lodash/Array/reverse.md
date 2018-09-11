
## reverse

> 反转数组，使第一个元素成为最后一个元素，第二个元素成为倒数第二个元素，依此类推。

```js
 /**
  * Reverses `array` so that the first element becomes the last, the second
  * element becomes the second to last, and so on.
  *
  * **Note:** This method mutates `array` and is based on
  * [`Array#reverse`](https://mdn.io/Array/reverse).
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to modify.
  * @returns {Array} Returns `array`.
  * @example
  *
  * var array = [1, 2, 3];
  *
  * _.reverse(array);
  * // => [3, 2, 1]
  *
  * console.log(array);
  * // => [3, 2, 1]
  */
function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}
```

var arrayProto = Array.prototype
var nativeReverse = arrayProto.reverse

`reverse` 函数只是简单包装了一个原生数组的 `reverse` 方法 `Array.prototype.reverse` ，做了一个非空判断。
