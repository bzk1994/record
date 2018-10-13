## vue 的 filter 中为什么不能访问 this ?

### filter 申明 && 使用

在 `Vue.js` 中允许你使用 `filter` 一些常见的文本格式化，在项目中我们会这样使用 `filter` :

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

而在组件的选项中我们这样调用：

```js
filters: {
  format: function (name) {
   return `Hello, ${name} !`
  }
}
```

如果想获取对应的 `filter`，可以调用 `filter` 函数传入对象 `filter name`，返回已注册的过滤器:

```js
var myFilter = Vue.filter('format')
```

### filter 初始化

`Vue` 

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

```js
/**
 * Runtime helper for resolving filters
 */
export function resolveFilter (id: string): Function {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}
```

`Vue` 实例化后，会调用内置 `_init` 方法初始化生命周期、 `data`、`props`、`computed`、`watcher` 等，在 `initGlobalAPI` 给 `Vue` 添加静态方法:

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

### filter 函数挂载


<!-- 一般我们在全局中会这样调用 `filter` 函数：

```js
Vue.filter('format', function(name) {
  return `Hello, ${name} !`
})
```
这个 `filter` 是在没有创建 `Vue` 实例之前定义的，在代码中我们也没有看到任何对方法做 `this` 绑定的动作，因此全局注册的 `filter` 不能通过 `this` 访问到 `Vue` 实例。 -->


initMixin

initRender
## installRenderHelpers

## resolveAsset resolveFilter

## parseFilters

## wrapFilter

```js
/**
 * Runtime helper for resolving filters
 */
export function resolveFilter (id: string): Function {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}
```

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


https://github.com/vuejs/vue/issues/5998