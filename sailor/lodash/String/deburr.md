## deburr

> 转换 latin-1 supplementary letters#Character_table) 为基本拉丁字母，并删除变音符。

```js
_.deburr([string=''])
```

```js
/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * deburr('déjà vu')
 * // => 'deja vu'
 */
function deburr(string) {
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '')
}
```

`deburr` 函数首先会调用 `replace` 方法将匹配 `reLatin` 的将拉丁语 `Unicode` 字母映射到基本拉丁字母。

```js
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g
```

`reComboMark` 正则用于匹配变音符号，替换成空字符串。

```js
const reComboMark = RegExp(rsCombo, 'g')
string.replace(reComboMark, '')
```
