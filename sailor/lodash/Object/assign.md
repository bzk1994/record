## assign

> 分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。

```js
_.assign(object, [sources])
```

```js
/**
  * Assigns own enumerable string keyed properties of source objects to the
  * destination object. Source objects are applied from left to right.
  * Subsequent sources overwrite property assignments of previous sources.
  *
  * **Note:** This method mutates `object` and is loosely based on
  * [`Object.assign`](https://mdn.io/Object/assign).
  *
  * @static
  * @memberOf _
  * @since 0.10.0
  * @category Object
  * @param {Object} object The destination object.
  * @param {...Object} [sources] The source objects.
  * @returns {Object} Returns `object`.
  * @see _.assignIn
  * @example
  *
  * function Foo() {
  *   this.a = 1;
  * }
  *
  * function Bar() {
  *   this.c = 3;
  * }
  *
  * Foo.prototype.b = 2;
  * Bar.prototype.d = 4;
  *
  * _.assign({ 'a': 0 }, new Foo, new Bar);
  * // => { 'a': 1, 'c': 3 }
  */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});
```

`assign` 函数是调用 `createAssigner` 后返回的函数，调用 `createAssigner` 时传入了回调函数：

```js
function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
}
```

这里会判断传入的参数 `source` 是否是原型对象或者是类数组，如果是的话会返回 `copyObject` ，并 `return`。
都不是的话说明是一个对象，使用 `for...in` 循环，调用 `hasOwnProperty` 判断 `source` 有对应的除原型外的 `key` ，调用 `assignValue` 拷贝 `value` 值。




## createAssigner

```js
/**
  * Creates a function like `_.assign`.
  *
  * @private
  * @param {Function} assigner The function to assign values.
  * @returns {Function} Returns the new assigner function.
  */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
```

`createAssigner` 接收 `assigner` 函数，也就是 `assign` 函数传入的回调函数，`createAssigner` 内部会 `return` `baseRest` 函数返回的函数，这个才是最终的 `assign` 函数，在调用 `baseRest` 函数的时候也传入一个回调函数：

```js
function(object, sources) {
  var index = -1,
      length = sources.length,
      customizer = length > 1 ? sources[length - 1] : undefined,
      guard = length > 2 ? sources[2] : undefined;

  customizer = (assigner.length > 3 && typeof customizer == 'function')
    ? (length--, customizer)
    : undefined;

  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    customizer = length < 3 ? undefined : customizer;
    length = 1;
  }
  object = Object(object);
  while (++index < length) {
    var source = sources[index];
    if (source) {
      assigner(object, source, index, customizer);
    }
  }
  return object;
}
```

回调函数接收 `object` 、`sources` 2 个参数，首先是申明一些初始变量，对 `sources` 参数进行一些判断取值，然后使用 `while` 循环，`index` 累加，并且调用传入的 `assigner` 函数进行对传入的 `object` 属性拷贝，最后将 `object` 返回。

## baseRest

```js
/**
  * The base implementation of `_.rest` which doesn't validate or coerce arguments.
  *
  * @private
  * @param {Function} func The function to apply a rest parameter to.
  * @param {number} [start=func.length-1] The start position of the rest parameter.
  * @returns {Function} Returns the new function.
  */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}
```

`baseRest` 返回 `setToString` 函数的函数调用，并且传入 `overRest` 函数和 `func` 的字符串。


## overRest

```js
/**
  * A specialized version of `baseRest` which transforms the rest array.
  *
  * @private
  * @param {Function} func The function to apply a rest parameter to.
  * @param {number} [start=func.length-1] The start position of the rest parameter.
  * @param {Function} transform The rest array transform.
  * @returns {Function} Returns the new function.
  */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
```

`overRest` 函数接收 3 个参数，`func` 回调函数、`start` 起始下标，默认为 0 、`transform` 函数式调用时传入的 `identity` 函数，用来返回接收到的第一个参数。

`overRest` 函数返回一个 `function` ，在这个 `function` 中首先会申明一些初始参数，然后进行 `while` 循环，从 `start` 开始复制 `args`，然后申明 `otherArgs` 数组，又进行一次 `while` 循环，复制 `otherArgs` 数组，随后调用 `transform` 函数，返回 `array` 的第一个，赋值给 `otherArgs` 数组，最后使用 `apply` 返回改变`this` 指向的函数。

## setToString

```js
/**
  * Sets the `toString` method of `func` to return `string`.
  *
  * @private
  * @param {Function} func The function to modify.
  * @param {Function} string The `toString` result.
  * @returns {Function} Returns `func`.
  */
var setToString = shortOut(baseSetToString);
```

`setToString` 函数是 `shortOut` 函数传入 `baseSetToString` 变量的调用返回，主要是设置 `toString` 方法返回 `func` 的字符串。

## baseSetToString

```js
/**
  * The base implementation of `setToString` without support for hot loop shorting.
  *
  * @private
  * @param {Function} func The function to modify.
  * @param {Function} string The `toString` result.
  * @returns {Function} Returns `func`.
  */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
```

`baseSetToString` 是一个三元表达式，如果不支持 `defineProperty` 就调用 `identity` 函数，用来返回接收到的第一个参数，否则就调用 `defineProperty` 给 `func` 添加 `toString` 方法，并将 `value` 设置成传入的  `func` 字符串。

## shortOut

```js
/**
  * Creates a function that'll short out and invoke `identity` instead
  * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
  * milliseconds.
  *
  * @private
  * @param {Function} func The function to restrict.
  * @returns {Function} Returns the new shortable function.
  */
function shortOut(func) {
  var count = 0,
    lastCalled = 0;

  return function () {
    var stamp = nativeNow(),
      remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}
```

`shortOut` 接收传入的 `func` 函数，返回一个 `function`，在 `function` 中申明了 `stamp` 变量保存 `nativeNow()`，也就是现在的毫秒数，然后将 `remaining` 赋值为 `HOT_SPAN` 减去 `stamp` 、`lastCalled` 之差：

```js
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
  HOT_SPAN = 16;
```

调用 `shortOut` 函数时会在函数内部维持一个闭包，保持对 `count` 、`lastCalled` 变量的引用，`lastCalled` 变量记录了上次调用的毫秒数，在第二次调用时会判断 `remaining` 调用时间差，如果大于 `HOT_COUNT` 800，返回 `arguments[0]`，否则将 `count` 重铸，最后返回调用 `apply` 后的 `func` 函数。



