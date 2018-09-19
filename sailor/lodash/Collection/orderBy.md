## orderBy

> 这个方法类似 _.sortBy，除了它允许指定 iteratees 结果如何排序。 如果没指定 orders，所有值以升序排序。 其他情况，指定 "desc" 降序，指定 "asc" 升序其对应值。

```js
_.orderBy(collection, [iteratees=[_.identity]], [orders])
```

```js
/**
 * This method is like `sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 * You may also specify a compare function for an order.
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[identity]]
 *  The iteratees to sort by.
 * @param {(string|function)[]} [orders] The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 * @see reverse
 * @example
 *
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ]
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * orderBy(users, ['user', 'age'], ['asc', 'desc'])
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * // Sort by `user` then by `age` using custom compare functions for each
 * orderBy(users, ['user', 'age'], [
 *   (a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }),
 *   (a, b) => a - b,
 * ])
 *
 */
function orderBy(collection, iteratees, orders) {
  if (collection == null) {
    return []
  }
  if (!Array.isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees]
  }
  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders]
  }
  return baseOrderBy(collection, iteratees, orders)
}
```

`orderBy` 函数接收 3 个参数，`collection` 迭代集合、`iteratees` 迭代函数、`orders` 排序顺序。

首选是 `collection` 默认为空数组，判断 `iteratees` 迭代器函数 、`orders` 排序如果不是数组就都包装成数组，最后调用 `baseOrderBy` 方法返回排序后的数组。

## baseOrderBy

```js
/**
 * The base implementation of `orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  let index = -1
  iteratees = iteratees.length ? iteratees : [(value) => value]

  const result = baseMap(collection, (value, key, collection) => {
    const criteria = iteratees.map((iteratee) => iteratee(value))
    return { 'criteria': criteria, 'index': ++index, 'value': value }
  })

  return baseSortBy(result, (object, other) => compareMultiple(object, other, orders))
}
```

`baseOrderBy` 函数接收 3 个参数，`collection` 迭代集合、`iteratees` 迭代函数、`orders` 排序顺序。

申明初始 `index`，`iteratees`， 迭代函数如果没有 `length` 就简单包装成一个 `return` 原值的函数数组。
接下来会申明 `result` 变量用来保存 `baseMap` 函数调用返回，`baseMap` 是一个简单的迭代函数方法，此时接收
`collection` 迭代集合和一个回调函数，在回调函数中会循环调用 `iteratees` 中的方法处理 `value` ，最后 `return` 处理后的对象，并加上了 `criteria` 处理后的 `value` 以及 `index` 。
在函数最后调用了 `baseSortBy` 函数，将 `result` 和一个回调函数传入进行排序。

## baseMap

> 简单迭代函数。

```js
/**
  * The base implementation of `_.map` without support for iteratee shorthands.
  *
  * @private
  * @param {Array|Object} collection The collection to iterate over.
  * @param {Function} iteratee The function invoked per iteration.
  * @returns {Array} Returns the new mapped array.
  */
function baseMap(collection, iteratee) {
  var index = -1,
    result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}
```

## baseSortBy

```js
/**
 * The base implementation of `sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  let { length } = array

  array.sort(comparer)
  while (length--) {
    array[length] = array[length].value
  }
  return array
}
```

`baseSortBy` 函数接收 2 个参数，`array` 数组和比较函数，使用 `sort` 排序后，会使用 `while` 循环，将 `array` 的每个赋值成 `array` 的 `length` 的 value，这里主要是将排序后的数组中的每一个恢复成原来的 `value`，最后将 `array` 返回。

## compareMultiple

> 将值的多个属性与另一个进行比较排序。

```js
/**
 * Used by `orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {(string|function)[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  let index = -1
  const objCriteria = object.criteria
  const othCriteria = other.criteria
  const length = objCriteria.length
  const ordersLength = orders.length

  while (++index < length) {
    const order = index < ordersLength ? orders[index] : null
    const cmpFn = (order && typeof order === 'function') ? order: compareAscending
    const result = cmpFn(objCriteria[index], othCriteria[index])
    if (result) {
      if (order && typeof order !== 'function') {
        return result * (order == 'desc' ? -1 : 1)
      }
      return result
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index
}
```

`compareMultiple` 函数接收 3 个参数，`object` 比较对象、`other` 另一个比较对象、`orders` 排序顺序，此时 `compareMultiple` 为 `sort` 的回调函数。

申明初始变量 `objCriteria` `othCriteria` 是 `baseOrderBy` 函数中迭代器函数处理后的 `value`， 保存`value` 的 `length` ，`orders` 的 `length` 。

在 `while` 循环中， `index` 累加，保存 `order` 、 `cmpFn` 变量，如果没有 `order` 就使用 `compareAscending` 按照默认升序处理，最后返回 `result`。