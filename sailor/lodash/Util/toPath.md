## toPath

> 创建 value 为属性路径的数组

```js
_.toPath(value)
```

```js
/**
 * Converts `value` to a property path array.
 *
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * toPath('a.b.c')
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c')
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (Array.isArray(value)) {
    return map(value, toKey)
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(value))
}
```

`toPath` 函数首先会判断 `value` 是否为数组，如果是数组返回调用 `map` 函数返回的数组，
否则返回一个 3 元表达式，如果是 `Symbol` 类型，将 `value` 包装成数组返回，否则就返回调用 `copyArray` 函数进行数组复制，并且传入 `stringToPath` 函数处理后的 `value`。


## stringToPath

```js
/**
  * Converts `string` to a property path array.
  *
  * @private
  * @param {string} string The string to convert.
  * @returns {Array} Returns the property path array.
  */
var stringToPath = memoizeCapped(function (string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});
```

```js

```

## memoizeCapped

> 

```js

```

```js

```