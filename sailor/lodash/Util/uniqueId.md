## uniqueId

> 创建唯一ID。 如果提供了 prefix，会被添加到ID前缀上。

```js
_.uniqueId([prefix=''])
```

```js
/** Used to generate unique IDs. */
const idCounter = {}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @since 0.1.0
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @see random
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
function uniqueId(prefix='$lodash$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id =++idCounter[prefix]
  if (prefix === '$lodash$') {
    return `${id}`
  }

  return `${prefix + id}`
}
```

`uniqueId` 接收一个 `prefix`，默认为 `$lodash$`，如果对象中没有有 `prefix` 对应的键值，就赋值为 0，
否则将 `++idCounter[prefix]`，得到累加后的 `id`，判断 `prefix` 等于 `$lodash$` ，直接返回 `id`，否则返回 `prefix + id` 拼接 `prefix` 后的 `id`。
