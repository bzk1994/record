## Vue filter 源码解析

### filter 注册 && 使用

在 `Vue.js` 中允许你使用 `filter` 格式化一些常见的文本，在项目中我们会这样使用 `filter` :

```js
<!-- 在双花括号中 -->
{{ message | format }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="message | format"></div>
```

而申明 `filter` 有 2 种的方式，创建 `Vue` 实例之前定义全局 `filter` ：

```js
Vue.filter('format', function(name) {
  return `Hello, ${name} !`
})
```

这样申请的 `filter` 可以在每个组件中调用，而不用再次注册。

而在组件的中的 `filter` 我们会这样调用：

```js
filters: {
  format: function (name) {
   return `Hello, ${name} !`
  }
}
```

组件内注册的 `filters` 只能在当前组件中调用。

如果想获取对应的 `filter`，可以调用 `filter` 函数传入对象 `filter name`，会返回已注册的过滤器:

```js
var myFilter = Vue.filter('format')
```

### filter 初始化

`filter` 的初始化是在 `Vue` 构造函数实例化的时候：

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

`initMixin` 为 `Vue` 添加了 `init` 方法。 </br>
`stateMixin` 为 `Vue` 添加了 `$data`、`$props`、`$set`、`$delete`、`$watch` 方法。 </br>
`eventsMixin` 为 `Vue` 添加了 `$on`、`$once`、`$off`、`$emit` 方法。 </br>
`lifecycleMixin` 为 `Vue` 添加了 `_update`、`$forceUpdate`、`$destroy` 方法。 </br>

关于 `filter` 的代码在 `renderMixin` 函数内部：

```js
export function renderMixin (Vue: Class<Component>) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function (): VNode {
  ...
  }
}
```

`renderMixin` 函数首先会调用 `installRenderHelpers` 并且传入 `Vue.prototype`，然后给 `Vue` 添加 `$nextTick`、`_render` 方法，而在 `installRenderHelpers` 函数中会给 `Vue.prototype` 增加很多辅助函数。

```js
export function installRenderHelpers (target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
}
```
关于 `filter` 就是 `target._f = resolveFilter`，`resolveFilter` 就是解析 `filter` 的赋值函数，我们来看一下 `resolveFilter` :

```js
/**
 * Runtime helper for resolving filters
 */
export function resolveFilter (id: string): Function {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}
```

`resolveFilter` 函数接收一个参数 `id`，在内部调用了 `resolveAsset` 函数，并且传入 `this.$options`、`filters`、`id`、`true`。

`identity` 函数，包装成一个返回原值的函数：

```js
/**
 * Return same value
 */
export const identity = (_: any) => _
```

`resolveAsset` 函数主要用来处理 `Vue` 实例内部的 `directives`、 `components` 、`filters` ：

```js
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
export function resolveAsset (
  options: Object,
  type: string,
  id: string,
  warnMissing?: boolean
): any {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  const assets = options[type]
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if (hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitalize(camelizedId)
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
  // fallback to prototype chain
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}
```

`resolveAsset` 首先会以 `type` 此时也就是 `filter` 为 `key` 从 `options` 取出 `filter` 对象，首先会检 `id` 是否已经注册，这里会尝试以驼峰、中划线形式取出 `filter`，最后将 `res` 返回。


## filter 调用

接下来我们来看看这个 `filter` 函数时如何在 `Vue` 实例中调用的，我们知道在 `installRenderHelpers` 函数中，我们将 `resolveFilter` 函数赋值给了 `Vue.prototype` 的 `_f`:

```js
export function installRenderHelpers (target: any) {
  ...
  target._f = resolveFilter
  ...
}
```

我们来看一下这个 `_f` 是在何时被调用的，全局搜索一下，是在 `wrapFilter` 函数内部：

```js
function wrapFilter (exp: string, filter: string): string {
  const i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return `_f("${filter}")(${exp})`
  } else {
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return `_f("${name}")(${exp}${args !== ')' ? ',' + args : args}`
  }
}
```

`wrapFilter` 函数会调用 `_f` 也就是 `resolveFilter` 函数，如果 `i < 0`，说明没有传参，调用 `_f("${filter}")()` 立即执行函数，传入 `filter` 返回对应 `filter` 然后传入 `exp` 返回 `filter` 处理后的值，传参的话会将参数切割，传入 `_f` 函数。

我们向上追溯，发现在 `parseFilters` 内部调用了 `wrapFilter` ：

```js
export function parseFilters (exp: string): string {
  ...
  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i])
    }
  }

  return expression
}
```

`parseFilters` 函数内部会将 `filters` 处理成数组，这也是我们可以使用串联 `filter` 的原因， 循环调用，然后将 `filter` 函数调用值返回。

调用 `parseFilters` 函数主要有 `getBindingAttr`、`processAttrs`、`parseText` 这 3 个函数。

`getBindingAttr` 函数主要用来解析元素的 `attr` 属性值：

```js
export function getBindingAttr (
  el: ASTElement,
  name: string,
  getStatic?: boolean
): ?string {
  const dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name)
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    const staticValue = getAndRemoveAttr(el, name)
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}
```

`getBindingAttr` 函数会从 `el` 也就是抽象语法树 `AST` 中取出 `attrs` ，如果有 `:` 、`v-bind` 绑定指令， 返回调用 `parseFilters` 也就是 `filter` 处理后的值，如果没有绑定指令返回静态的值。

`processAttrs` 函数用来处理 `attr` 的属性:

```js
function processAttrs (el) {
  const list = el.attrsList
  let i, l, name, rawName, value, modifiers, isProp
  for (i = 0, l = list.length; i < l; i++) {
    ...
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '')
        value = parseFilters(value)
    }
    ...
  }
}
```

`processAttrs` 会循环处理 `attrsList`，返回经过 `parseFilters` 处理的 `value`。


`parseText` 函数则是用来处理标签内的表达式了：

```js
export function parseText (
  text: string,
  delimiters?: [string, string]
): TextParseResult | void {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    const exp = parseFilters(match[1].trim())
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
```

`parseText` 函数内部会采用正则匹配出 `match`，然后调用 `parseFilters` 得到 `exp`，然后将处理后作为对象返回。

## filter 初始化

`Vue` 初始化后，会调用 `initGlobalAPI` 为 `Vue` 添加静态方法:

```js
function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}
```

可以看到在 `initGlobalAPI` 中添加了 `config` 配置对象、`util` 工具函数、`set`、`delete`、`nextTick` 方法、`initUse` 添加插件 `use` 方法、`initMixin`、`initExtend` 添加 `mixin` 、`extend`，`initAssetRegisters` 注册初始化方法。

其中涉及到了 `filter` 的是：

```js
ASSET_TYPES.forEach(function (type) {
  Vue.options[type + 's'] = Object.create(null);
});
```

循环 `ASSET_TYPES` 数组，初始化 `components` 、`directives` 、`filters` 。

```js
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
```

`ASSET_TYPES` 数组是一个常量，保存了 `Vue` 实例中的 3 个属性。

接着来看看 `initAssetRegisters` 函数：

```js
function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}
```

我们接下看只看 `filter`  部分，在 `initAssetRegisters` 函数中会给 `Vue` 添加 `filter` 函数，函数接收 `id` 过滤器名 、`definition` 过滤器处理函数 2 个参数，如果没有 `definition` 会返回 `this.options[type + 's'][id]` 获取对应的过滤器，如果有 `definition` ，会以 `id` 为 `key`、 `definition` 为值 赋值到 `options.filters` 对象上，最后将 `definition` 返回，此时 `Vue` 的 `filter` 是个函数，这个函数返回一个对象，保存了所有的 `filter` 。

### filter 不能访问 this


一般我们在全局中会这样调用 `filter` 函数：

```js
Vue.filter('format', function(name) {
  return `Hello, ${name} !`
})
```
这个 `filter` 是在没有创建 `Vue` 实例之前定义的，在代码中我们也没有看到任何对方法做 `this` 绑定的动作，因此全局注册的 `filter` 不能通过 `this` 访问到 `Vue` 实例，而在组件的中的 `filter` ，也没有发现有改变 `filter` 函数 `this` 指向的代码。


### 尤大大的解释

在 `vue` 的 [Issues #5998](https://github.com/vuejs/vue/issues/5998) 中可以看到尤大大的解释，过滤器应该是纯函数，建议使用 `computed` 或者 `methods` 格式化文本，所以 `vue` 的源码中也没有改变 `filter` 函数上下文的代码。