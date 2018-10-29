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

```js

```

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

## 

> 

```js

```

```js

```