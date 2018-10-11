## vue 的 filter 中为什么不能访问 this ?

在 `Vue` 源码注册 `filter` 应该是在 `initGlobalAPI` 方法中：

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

在 `initGlobalAPI` 方法中做了初始化，并且给 `Vue` 添加了全局的静态方法，其中涉及到了 `filter` 的是：

```js
ASSET_TYPES.forEach(function (type) {
  Vue.options[type + 's'] = Object.create(null);
});
```

循环 `ASSET_TYPES` 数组，初始化 `component` 、`directive` 、`filter` 。

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

我们接下看只看 `filter`  部分，在 `initAssetRegisters` 函数中会给 `Vue` 添加 `filter` 函数，函数接收 `di` 、`definition` 2 个参数，如果没有 `definition` 会返回 `this.options[type + 's'][id]` 获取对应的全局过滤器，如果有 `definition` ，忽略其他判断，会将 `definition` 赋值到 `options.filters` 上，最后将 `definition` 返回。
一般我们在全局中会这样调用 `filter` 函数：

```js
Vue.filter('format', function(name) {
  return `Hello, ${name} !`
})
```

这个 `filter` 是在没有创建 `Vue` 实例之前定义的，在代码中我们也没有看到任何对方法做 `this` 绑定的动作，因此全局注册的 `filter` 不能通过 `this` 访问到 `Vue` 实例。

而在组件的选项中我们这样调用：

```js
filters: {
  format: function (name) {
   return `Hello, ${name} !`
  }
}
```

## installRenderHelpers

## resolveAsset resolveFilter

## parseFilters

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