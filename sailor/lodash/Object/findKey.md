## findKey

> 这个方法类似 _.find。 除了它返回最先被 predicate 判断为真值的元素 key，而不是元素本身。

```js
_.findKey(object, [predicate=_.identity])
```

```js
/**
 * This method is like `find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @since 1.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @see find, findIndex, findLast, findLastIndex, findLastKey
 * @example
 *
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * }
 *
 * findKey(users, ({ age }) => age < 40)
 * // => 'barney' (iteration order is not guaranteed)
 */
function findKey(object, predicate) {
  let result
  if (object == null) {
    return result
  }
  Object.keys(object).some((key) => {
    const value = object[key]
    if (predicate(value, key, object)) {
      result = key
      return true
    }
  })
  return result
}
```

`findKey` 接收 2 个参数，`object` 遍历对象、`predicate` 比较函数。

首先是非空判断，调用 `Object.keys` 获取 `key` 数组采用 `some` 方法遍历， 然后调用 `predicate` 函数，如果为真，则将 `key` 赋值给 `result` ，返回 `true` 中断循环，最后将 `result` 返回。

## findLastKey

> 这个方法类似 _.findKey。 不过它是反方向开始遍历的。

```js
_.findLastKey(object, [predicate=_.identity])
```

```js
/**
 * This method is like `findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @see find, findIndex, findKey, findLast, findLastIndex
 * @example
 *
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * }
 *
 * findLastKey(users, ({ age }) => age < 40)
 * // => returns 'pebbles' assuming `findKey` returns 'barney'
 */
function findLastKey(object, predicate) {
  return baseFindKey(object, predicate, baseForOwnRight)
}
```

`findLastKey` 接收 2 个参数，`object` 遍历对象、`predicate` 比较函数， 是 `baseFindKey` 函数的调用返回。

## baseFindKey

```js
/**
 * The base implementation of methods like `findKey` and `findLastKey`
 * which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFindKey(collection, predicate, eachFunc) {
  let result
  eachFunc(collection, (value, key, collection) => {
    if (predicate(value, key, collection)) {
      result = key
      return false
    }
  })
  return result
}
```

`baseFindKey` 函数调用传入的 `eachFunc` 函数，并且传入 `collection` 和回调函数，在回调函数中会调用 `predicate` 比较函数，如果为真将 `key` 赋值给 `result`，返回 `false` 中断循环，最后将 `result` 返回。

## baseForOwnRight

```js
/**
 * The base implementation of `forOwnRight`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys)
}
```

`baseForOwnRight` 函数是 `baseForRight` 函数的调用返回的函数，只是传入了 `keys`:

```js
function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
}
```

`keys` 函数主要返回对象的 `key` 数组。

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
function baseForRight(object, iteratee, keysFunc) {
  const iterable = Object(object)
  const props = keysFunc(object)
  let { length } = props

  while (length--) {
    const key = props[length]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }
  return object
}
```

`baseForRight` 函数接收 3 个函数，`object` 遍历对象、`iteratee` 迭代函数、`keysFunc` 也就是 `keys` 函数。

取出 `props` `key` 数组，采用 `while` 循环，`length` 累减，如果调用 `iteratee` 迭代函数返回为 `flase`，中断循环，返回 `object`。


