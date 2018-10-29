## iteratee

> 创建一个调用 func 的函数。 如果 func 是一个属性名，传入包含这个属性名的对象，回调返回对应属性名的值。 如果 func 是一个对象，传入的元素有相同的对象属性，回调返回 true。 其他情况返回 false

```js
/**
  * Creates a function that invokes `func` with the arguments of the created
  * function. If `func` is a property name, the created function returns the
  * property value for a given element. If `func` is an array or object, the
  * created function returns `true` for elements that contain the equivalent
  * source properties, otherwise it returns `false`.
  *
  * @static
  * @since 4.0.0
  * @memberOf _
  * @category Util
  * @param {*} [func=_.identity] The value to convert to a callback.
  * @returns {Function} Returns the callback.
  * @example
  */
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
}
```

`iteratee` 函数是 `baseIteratee` 函数的返回，调用 `baseIteratee` 函数时会判断 `func` 类型，如果是 `func` 直接传入，否则调用 `baseClone` 将浅拷贝后的 `func` 传入。

## baseIteratee

```js
 /**
  * The base implementation of `_.iteratee`.
  *
  * @private
  * @param {*} [value=_.identity] The value to convert to an iteratee.
  * @returns {Function} Returns the iteratee.
  */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}
```

`baseIteratee` 函数实现了一个基本的迭代器，这里会判断 `value` 类型如果是 `function`，直接返回 `value`，如果 `value` 等于 `null`，返回一个 `identity` 函数，用来返回传入第一个参数，如果 `value` 是一个 `object`，这里会有一个 3 元表达式，`isArray` 判断是数组，返回调用 `baseMatchesProperty` 函数的结果

```js
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function (object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
```

`baseMatchesProperty` 函数会调用 `isKey` 判断是否是属性名，`isStrictComparable` 是否适用于全等判断，全部为真返回 `matchesStrictComparable` 函数调用

```js
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}
```

`matchesStrictComparable` 函数会返回一个 `function`，`function` 主要用来进行严等判断。

如果 `value` 不是数组，返回调用 `baseMatches` 函数的结果

```js
function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function (object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }
```

这里会调用 `getMatchData` 函数获取对象的属性名称、值和比较标志，返回一个数组

```js
function getMatchData(object) {
  var result = keys(object),
    length = result.length;

  while (length--) {
    var key = result[length],
      value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}
```

判断 `matchData.length == 1 && matchData[0][2]` 为真，就返回调用 `matchesStrictComparable` 函数的返回，否则就返回一个 `function` ，在 `function` 中会返回 `object === source` ，如果为 `false`，返回
`baseIsMatch` 函数的调用返回。

最后如果不满足已上类型，直接返回 `property` 函数的调用。

```js
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
```

这里会调用 `isKey` 判断 `path` 如果是 `key` 属性，调用 `baseProperty` 函数并且传入 `toKey` 调用后的 `path`，`baseProperty` 函数会返回一个获取函数值的函数。

```js
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}
```

`basePropertyDeep` 函数会返回 `function`，调用 `function` 后会返回 `baseGet` 函数的调用返回

```js
function basePropertyDeep(path) {
    return function (object) {
      return baseGet(object, path);
    };
  }
```

```js
function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
      length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }
```

`baseGet` 函数取出 `path`，`while` 循环从 `object` 取出 `path` 对应值。





## 

> 

```js

```

```js

```

## 

> 

```js

```

```js

```