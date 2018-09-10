## concat

> 创建一个用任何数组 或 值连接的新数组。

```js
_.concat(array, [values])
```

```js
/**
  * Creates a new array concatenating `array` with any additional arrays
  * and/or values.
  *
  * @static
  * @memberOf _
  * @since 4.0.0
  * @category Array
  * @param {Array} array The array to concatenate.
  * @param {...*} [values] The values to concatenate.
  * @returns {Array} Returns the new concatenated array.
  * @example
  *
  * var array = [1];
  * var other = _.concat(array, 2, [3], [[4]]);
  *
  * console.log(other);
  * // => [1, 2, 3, [4]]
  *
  * console.log(array);
  * // => [1]
  */
  function concat() {
    var length = arguments.length;
    if (!length) {
      return [];
    }
    var args = Array(length - 1),
        array = arguments[0],
        index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }
    return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
  }
```

`concat` 使用 `arguments` 获取传入参数， 申明 `length` 得到 `arguments.length`，使用 `while` 循环将多余参数保存到 `args`， 最后调用了 `arrayPush` 方法，此时传入 2 个参数，`array` 处理成数组，`baseFlatten` 扁平化数组，最后返回一个合并后的数组。
