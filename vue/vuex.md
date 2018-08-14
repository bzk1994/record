

## Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

<p align="center">
  <img width="700px" src="https://raw.githubusercontent.com/vuejs/vuex/dev/docs/.vuepress/public/vuex.png">
</p>

阅读 vuex 源码的思维导图:

![阅读 vuex 源码的思维导图](https://images-cdn.shimo.im/KdTrPikRo9wmi0yj/vuex.png!thumbnail)

[vuex 的文档](https://vuex.vuejs.org/zh/) 对辅助看源码有不小的帮助，不妨在看源码之前仔细地撸一遍文档。


## 带着问题去看源码
0. global event bus 有何缺陷
1. $store 如何注入到所有子组件
2. mapState 实现
3. mapGetter 如何映射
4. Mutation 同步 && Action 异步
5. dispatch 方法实现
6. module 分割实现 && 局部状态 namespaced
7. 如何调用 vue-devtools
8. 内置 logger 插件实现
9. hotUpdate
10. 时空穿梭功能实现

## 目录

```
├── src
│   ├── helpers.js                  辅助函数
│   ├── index.esm.js
│   ├── index.js                    入口
│   ├── mixin.js                    混入 vuexInit
│   ├── module                      class module
│   │   ├── module-collection.js
│   │   └── module.js
│   ├── plugins                     插件
│   │   ├── devtool.js
│   │   └── logger.js
│   ├── store.js                    store install
│   └── util.js                     工具函数
```

## 入口文件

vuex 的入口文件在 `src/index.js`

```
import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```

引入了 `Store` 、`install` 和一些辅助工具函数，将引入的变量组装成一个对象向外暴露。
当我们在项目中引入 `import Vuex from 'vuex'` 的之后， `Vuex` 就是这个组装后默认导出的对象了。
当然我们也可以通过解构的方式。

```
import { Store, install } from 'vuex'`
```

## install 方法

来看一下 `install` 方法，在 `src/store.js` 。

```
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  // vuexInit
  applyMixin(Vue)
}
```

方法首先判断变量 `Vue` (store.js 顶部申明的变量) 是否与传入 `_Vue` 全等，如果全等并且在非生产环境，抛出异常。

随后将传入的 `_Vue` 赋值给 `Vue`，这里主要是为了避免重复安装。

然后调用引入的 `applyMixin` 方法，并将 `Vue` 作为参数传入。

`applyMixin` 在 `src/mixin.js` 作为默认方法导出：

```
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })

  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```
取出传入 `Vue` 的 静态属性 `version` 做不同处理。

2.0 采用 `mixin` 将 `vuexInit` 合并到 `beforeCreate` 生命周期钩子。

1.0 重写 `_init` 方法 将 `vuexInit` 合并到   `_init` 方法中。

在 `vuexInit` 方法中，首先判断如果有 `options.store` 说明是 `root` 节点，并且判断 `store` 是 `function` 就执行将函数返回值赋值给 `this.$store` ，否则 `options.store` 直接赋值。
然后判断有父节点，并且父节点有 `$store`, 就将父节点的 `$store` 赋值给 `this.$store` ，这样就保证只有一个全局的 `$store` 变量

## class Store

我们在使用 `Vuex` 的时候，会实例化 `Store` 类，并且将一些 `options` 作为参数传入。

```
export class Store {
  constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    if (process.env.NODE_ENV !== 'production') {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `store must be called with the new operator.`)
    }

    const {
      plugins = [],
      strict = false
    } = options

    // store internal state
    this._committing = false
    this._actions = Object.create(null)
    this._actionSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()

    // bind commit and dispatch to self
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // strict mode
    this.strict = strict

    const state = this._modules.root.state

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state)

    // apply plugins
    plugins.forEach(plugin => plugin(this))

    if (Vue.config.devtools) {
      devtoolPlugin(this)
    }
  }
}
```

我们来逐行看一下 `Store` 构造函数中的 `constructor` 代码。

```
if (!Vue && typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
```

判断 `store.js` 开始申明的 `Vue` 变量、`window` 不为 `undefined` （说明在浏览器环境下）、`window` 上有 `Vue` 变量、如果全部符合就执行 `install` 方法进行自动安装。

这么做主要是为了防止在某些情况下避免自动安装，具体情况请看 [issues #731](https://github.com/vuejs/vuex/issues/731)


然后在非生产环境执行，运行一些断言函数。

```
assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
```

判断当前 `Vue` 变量， 在创建 `store` 实例之前必须调用 `Vue.use(Vuex)`。

```
assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
```

判断支持 `Promise` 对象， 因为 `vuex` 的 `registerAction` 时会将不是 `Promise` 的方法包装成 `Promise` , `store` 实例的 `dispatch` 方法也使用了 `Promise.all`，这也是为什么 `action` 支持异步调用的原因。

```
assert(this instanceof Store, `store must be called with the new operator.`)
```
判断 `this` 必须是 `Store` 的实例。

断言函数的实现非常简单。

```
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
```

将传入的 `condition` 在函数内取非，为 `true` 就抛出异常。

接下来是从 `options` 解构出 `plugins` `strict`。

```
const {
  plugins = [],
  strict = false
} = options
```

plugins: `vuex` 的插件，数组，会在后面循环调用。

strict: 是否是严格模式，后面判断如果是严格模式的会执行 `enableStrictMode` 方法，确保只能通过 `mutation` 操作 `state`。

接下来就是一些初始参数的赋值。

```
// 通过 mutation 修改 state 的标识
this._committing = false
// 注册 action 储存到 _actions
this._actions = Object.create(null)
// 储存订阅 store 的 action
this._actionSubscribers = []
// 注册 mutation 储存到 _mutations
this._mutations = Object.create(null)
// 注册 getter 储存到 _wrappedGetters
this._wrappedGetters = Object.create(null)
// ModuleCollection 实例解析后的 modules 模块收集器
this._modules = new ModuleCollection(options)
// 在 installModule 函数中 如果有命名空间就储存到 _modulesNamespaceMap 中
this._modulesNamespaceMap = Object.create(null)
// 储存订阅者
this._subscribers = []
// 用 Vue 实例 实现 Store 的 watch 方法
this._watcherVM = new Vue()
```

使用 `call` 将 `dispatch` `commit` 的 `this` 绑定到当前的 `Store` 实例上。

```
// bind commit and dispatch to self
const store = this
const { dispatch, commit } = this
this.dispatch = function boundDispatch (type, payload) {
  return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
  return commit.call(store, type, payload, options)
}
```

将解构出的 `strict` 变量赋值给 `this.strict` ，会在实例中使用。

```
// strict mode
this.strict = strict
```

### init module

接下来会调用 `installModule` 安装 `modules`。

```
// init root module.
// this also recursively registers all sub-modules
// and collects all module getters inside this._wrappedGetters
installModule(this, state, [], this._modules.root)
```
第一次调用将 `this`、`state`（this._modules.root.state）、空数组、`this._modules.root`（root module）作为参数传入。

`installModule` 代码：

```
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```

首先先根据 `path` 判断是否是 `root`，刚开始传入的 `path` 为空数组， 所以是 `isRoot = true`,
随后调用 `ModuleCollection` 类的 `getNamespace` 方法 根据 `path` 获取命名空间，因为 `this._modules` 是 `ModuleCollection` 类的实例。

接着判断 `module.namespaced` 是否为 `true`, `namespaced` 是在每个 `module` 的配置中设置的，如果为 `true` 就将 `namespace` 为 `key`，`module` 为值存到 `construction` 的 `_modulesNamespaceMap` 变量上。
在 `helper.js` 我们会用 `getModuleByNamespace` 获取 `_modulesNamespaceMap` 下对应命名空间模块。

```
// set state
if (!isRoot && !hot) {
  const parentState = getNestedState(rootState, path.slice(0, -1))
  const moduleName = path[path.length - 1]
  store._withCommit(() => {
    Vue.set(parentState, moduleName, module.state)
  })
}
```
非 `root module` 并且没有 `hot` 热更新，初始化的时候并没有进入 `if` 判断，注册子模块的时候才会进入
调用 `getNestedState` 方法取出父 `module` 的 `state`。

`path` 是一个数组，按模块嵌套排列，`path.slice(0, -1)` 传入除去自身的数组，就是父级。

```
function getNestedState (state, path) {
  return path.length
    ? path.reduce((state, key) => state[key], state)
    : state
}
```

`getNestedState` 返回一个三元表达式，如果有 `path.length` 就调用
 `reduce` 方法取出对应嵌套的 `state` ，没有返回直接传入的 `state`。

然后调用 `store` 的 `_withCommit` 方法：

```
_withCommit (fn) {
  const committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}
```

`_withCommit` 中执行传入的 `fn` 之前会将 `this._committing` 置为 `true` ，执行 `fn` 函数后，将 `committing` 回复恢复之前的状态。
这里主要是为了保证修改 `state` 只能通过调用 `_withCommit`，会调用 `enableStrictMode` 去检测 `state` 是否以预期的方式改变，我们在使用 `vuex` 中，就是通过 `mutation` 去改变 `state`。


调用 makeLocalContext 方法：

```
const local = module.context = makeLocalContext(store, namespace, path)
```

`makeLocalContext` 主要用来初始化 `dispatch` `getter` `commit` `state`，通过 `defineProperties` 劫持 `getters` `state`。

```
/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}
```

声明 `noNamespace` 变量判断是否有命名空间，然后创建 `local` 对象，改对象有两个属性 `dispatch` `commit`，它们的值分别是2个三元表达式，如果是没有命名空间的，`dispatch` 就赋值为 `store.dispatch`，有命名空间就拼上再返回，`commit` 也是一样的道理。

然后通过 `Object.defineProperties` 劫持 `local` 对象的 `getters` `state`。
```
// getters and state object must be gotten lazily
// because they will be changed by vm update
Object.defineProperties(local, {
  getters: {
    get: noNamespace
      ? () => store.getters
      : () => makeLocalGetters(store, namespace)
  },
  state: {
    get: () => getNestedState(store.state, path)
  }
})
```

劫持 `getters` 的时候也是一个三元表达式，没有命名空间就将 `local` 的 `getters` 代理到 `store.getters` 上，有的话就将 `local` 的 `getters` 代理到 `makeLocalGetters` 函数的返回上。

我们来看一下 `makeLocalGetters` 方法：

```
function makeLocalGetters (store, namespace) {
  const gettersProxy = {}

  const splitPos = namespace.length
  Object.keys(store.getters).forEach(type => {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) return

    // extract local getter type
    const localType = type.slice(splitPos)

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: () => store.getters[type],
      enumerable: true
    })
  })

  return gettersProxy
}
```

`makeLocalGetters` 接收 `store` 和 `namespace` 作为参数。
首先申明 `gettersProxy` 变量，申明 `splitPos` 变量为命名空间长度，随后遍历 `store.getters` ,
接着匹配应命名空间，失败就 `return` ，成功往下执行，然后取出命名空间后的 `getter` `type`,
使用 `defineProperty` 为 `gettersProxy` 的 `localType` 添加 `get` 方法，劫持 `gettersProxy` 的 `localType` 的 `get` 返回 `store` 上对应的 `getter`，简单来说就是做了一个有命名空间情况下的代理。

`makeLocalContext` 函数最后会将 `local` 返回。

```
const local = module.context = makeLocalContext(store, namespace, path)
```

将 `makeLocalContext` 返回保存到 `local` `module.context`。

下面就是循环注册 `mutation` `action` `getter`。

```
module.forEachMutation((mutation, key) => {
  const namespacedType = namespace + key
  registerMutation(store, namespacedType, mutation, local)
})

module.forEachAction((action, key) => {
  const type = action.root ? key : namespace + key
  const handler = action.handler || action
  registerAction(store, type, handler, local)
})

module.forEachGetter((getter, key) => {
  const namespacedType = namespace + key
  registerGetter(store, namespacedType, getter, local)
})
```

调用 `module` 类的 `forEachMutation` `forEachAction` `forEachGetter`，取出对应的 `mutations` `actions` `getters` 和回调函数作为参数。

来看看 `registerMutation` 方法:
```
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}
```

通过 `type` 取出 `store._mutations` 上对应的 `mutation`，没有就穿透赋值为空数组，然后将 `wrappedMutationHandler` 函数 `push` 到 `entry` 数组中，函数的参数也就是 `mutation` 时候的参数，函数中调用 `call` 将 `handler` 函数 `this` 指向 `store`, 并将 `local.state`，`payload` 作为参数传入，
这样 `_mutations[types]` 储存了所有的 `mutation`。

来看看 `registerMutation` 方法:
```
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```

通过 `type` 取出 `store._actions` 上对应的 `action`，没有就穿透赋值为空数组，然后将 `wrappedActionHandler` 函数 `push` 到 `entry` 数组中，函数中使用 `call` 将 `handler` 指向 `store`, `call` 的第二个参数是 `dispatch` `commit` `getters` 等包装后的对象，所以我们可以在 `commit` 的第一个参数中解构出需要的属性

```
// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  }
}
```

`payload` 也就是额外参数，`cb` 回调函数倒是不怎么用到。
然后通过简易的 `isPromise` 方法判断 `res` 是否为 `Promise`，只是简单判断了 `then` 是是否为一个函数。

```
export function isPromise (val) {
  return val && typeof val.then === 'function'
}
```

如果不是的话，调用 `Promise.resolve(res)` 将 `res` 包装成一个 `Promise`。

之后就是根据 `_devtoolHook` 判断当前浏览器是否有 `devtoolHook` 插件，应该是通过 `Promise.catch` 抛出错误，让 `devtoolHook` 捕获。

来看看 `registerGetter` 方法：
```
function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}
```

开始判断如果有相同 `getter` 就抛出异常，
没有的话就以 `type` 为 `key`，`wrappedGetter` 为 `value` 储存到 `store._wrappedGetters` 对象上，每一个 `getter` 都是一个 `function`。


循环注册 `mutation action getter` 后，只剩下最后一段代码：

``` 
module.forEachChild((child, key) => {
  installModule(store, rootState, path.concat(key), child, hot)
})
```

调用 `Module` 类的 `forEachChild` 方法，并且将回调函数传入。

```
forEachChild (fn) {
  forEachValue(this._children, fn)
}
```

`forEachChild` 方法也调用了 `forEachValue` 遍历 `_children` 的 `key` 循环调用传入的 `fn`。
`_children` 是在 `ModuleCollection` 类中通过嵌套模块的递归注册建立父子关系的。

最后递归调用 `installModule` 完成所以嵌套模块的安装，到此 `installModule` 方法结束。

### resetStoreVM

`resetStoreVM` 主要用来重置 `Vue` 实例，实现响应式的 `state` `computed`。
```
// initialize the store vm, which is responsible for the reactivity
// (also registers _wrappedGetters as computed properties)
resetStoreVM(this, state)
```

我们接着来看 `resetStoreVM` 方法：

```
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

函数开始就取出 `store._vm`，初始值是 `undefind`，会在后面用到。

循环 `wrappedGetters` 处理所有 `getter`。
```
// bind store public getters
store.getters = {}
const wrappedGetters = store._wrappedGetters
const computed = {}
forEachValue(wrappedGetters, (fn, key) => {
  // use computed to leverage its lazy-caching mechanism
  computed[key] = () => fn(store)
  Object.defineProperty(store.getters, key, {
    get: () => store._vm[key],
    enumerable: true // for local getters
  })
})
```

将 `store` 的 `getters` 赋值为空对象， 取出保存所有注册 `getter` 的 `_wrappedGetters` 对象，申明 `computed` 对象。
接着循环 `wrappedGetters` 对象，将对应的 `key` 以及 `fn` 保存到 `computed`，这里的 `fn` 就是注册 `getter` 的 `wrappedGetter` 函数。
```
computed[key] = () => fn(store)
```
然后通过 `defineProperty` 劫持 `store.getters` 的 `key`，代理到 `store._vm[key]`。

```
// use a Vue instance to store the state tree
// suppress warnings just in case the user has added
// some funky global mixins
const silent = Vue.config.silent
Vue.config.silent = true
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed
})
Vue.config.silent = silent
```

保存 `Vue.config.silent` 变量，设置`Vue.config.silent = true`，取消 `Vue` 所有的日志与警告。然后生成一个新的 `Vue` 实例，将 `state` 和 `computed` 作为参数传入，然后恢复 `Vue.config.silent`，因为将 `store.getters` 的 `key`，代理到 `store._vm[key]`，所以我们可以通过访问 `this.$store.getters.key` 访问到 `store._vm[key]`。

```
// enable strict mode for new vm
if (store.strict) {
  enableStrictMode(store)
}
```
根据 `store.strict` 判断是否是严格模式，是的话调用 `enableStrictMode` 方法。

```
function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, `do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}
```

`enableStrictMode` 将 `store` 作为参数，调用 `store._vm.$watch` 方法，也就是 Vue 实例的 `$watch` 方法，监测 `this._data.$$state` 的变化，就是生成新的 `Vue` 实例的时候传入的 `state`，判断不是生产模式，调用断言，如果 `store._committing` 是 `false`, 抛出异常，所以我们在使用 `vuex` 的时候，只能通过 `mutation` 方式改变 `store`。

`oldVm` 的注销：
```
if (oldVm) {
  if (hot) {
    // dispatch changes in all subscribed watchers
    // to force getter re-evaluation for hot reloading.
    store._withCommit(() => {
      oldVm._data.$$state = null
    })
  }
  Vue.nextTick(() => oldVm.$destroy())
}
```

如果有 `oldVm`, 并且是热更新模式，将 `oldVm._data.$$state` 置为 `null`，
接下来调用 `oldVm` 的 `$destroy` 方法注销 `oldVm` 实例。


## class ModuleCollection
在上面初始参数的赋值中 `this._modules` 就是 `ModuleCollection` 类的实例。
```
this._modules = new ModuleCollection(options)
```

如果没有嵌套模块，`this._modules` 是这样一个结构。

```
{
  'root': {
    'runtime': false,
    '_children': {},
    '_rawModule': {
      'state': {
        'count': 0
      },
      'getters': {},
      'actions': {},
      'mutations': {}
    },
    'state': {
      'count': 0
    }
  }
}
```

来看看 ModuleCollection：

```
class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }

  get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  // 根据 path 处理命名空间
  getNamespace (path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }

  update (rawRootModule) {
    update([], this.root, rawRootModule)
  }

  register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }

    // 默认注册 root
    // 包装了下传过来的 rawModule
    const newModule = new Module(rawModule, runtime)
    // 判断 path.length 0 说明是 root 保存到 this.root 上
    // 下次递归注册进入 else 调用 Module 类的 getChild addChild
    // 建立 module 的父子关系
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    // 有 modules 递归注册嵌套模块
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  unregister (path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    if (!parent.getChild(key).runtime) return

    parent.removeChild(key)
  }
}
```

在 `ModuleCollection` 类的 `constructor` 中首先会执行类的 `register` 方法，将空数组、`rawRootModule`(也就是实例化的时候传入的 options)、false 最为最初参数传入。

`register` 方法会递归调用，实现嵌套模块的收集
首先会在非生产环境调用 `assertRawModule` 函数，对 `module` 进行一些断言判断，判断 `rawModule` 对象是否有 `getters` `mutations` `mutations` 为 `key` 值，然后根据预置的类型进行断言。

随后就是实例化 `Module` 新建一个 `newModule`，判断 `path.length`，0 说明是 `root`， 将 `newModule` 保存到 `this.root` 上，
然后判断 `rawModule.modules` 是否有嵌套 `modules`，
有就调用 `forEachValue` 将 `modules`转换成数组，并且循环调用传入的回调函数，回调函数里又递归调用了 `this.register`，将 `path` 合并子模块的 `key`, 循环的子模块、`runtime` 作为参数传入，第二次进入 `register` 会进入 `else` 判断，调用 `Module` 类的 `getChild` `addChild`, 建立 `module` 的父子关系，如果仍然嵌套模块继续递归调用 `this.register`。

forEachValue：

```
// object 转成数组 循环调用 fn
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
```

### assertRawModule

上面说过，`assertRawModule` 负责对 `module` 进行一些断言判断，判断 `rawModule` 对象是否有 `getters` `mutations` `mutations` 为 `key` 值，然后根据预置的类型进行断言。


```
const functionAssert = {
  assert: value => typeof value === 'function',
  expected: 'function'
}

const objectAssert = {
  assert: value => typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'),
  expected: 'function or object with "handler" function'
}

const assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
}

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(key => {
    if (!rawModule[key]) return

    const assertOptions = assertTypes[key]

    forEachValue(rawModule[key], (value, type) => {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      )
    })
  })
}

function makeAssertionMessage (path, key, type, value, expected) {
  let buf = `${key} should be ${expected} but "${key}.${type}"`
  if (path.length > 0) {
    buf += ` in module "${path.join('.')}"`
  }
  buf += ` is ${JSON.stringify(value)}.`
  return buf
}
```

`assertRawModule` 循环 `assertTypes` 对象，循环的 `key` 为 `getters` `mutations` `actions`，判断传入模块是否有这些属性。

```
const assertOptions = assertTypes[key]
```

接着从 `assertTypes` 取出对应属性的 `value`

循环 `rawModule[key]` 对象，如果 `key` 此时就是 `getters`，那就是遍历当前模块有所的 `getter` 函数，回调函数是一个断言函数，`assertOptions` 的 `assert` 会返回对属性类型的判断，作为 `Boolean` 传入，`makeAssertionMessage` 函数只是对断言函数判断的异常的描述。

## class Module

来看看 `Module` 类的代码:

```
export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state
    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  get namespaced () {
    return !!this._rawModule.namespaced
  }

  addChild (key, module) {
    this._children[key] = module
  }

  removeChild (key) {
    delete this._children[key]
  }

  getChild (key) {
    return this._children[key]
  }

  update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
```

Module 类的 `constructor` 中会将传入的 `rawModule` `runtime` 保存，申明 `this._children`，主要是存放该模块的子模块，将 `rawModule.state` 取出保存到 `this.state` 上。

Module 类提供了很多方法： 

`namespaced` 通过双非取值返回一个 `布尔值` ，作为是否有命名空间的判断。

`addChild` 在 `ModuleCollection` 的 `register` 方法中调用，将子模块存入到父模块的 `this._children`

`removeChild` 删除子模块

`getChild` 获取子模块

`update` 在 `ModuleCollection` 的 `update` 的调用，负责整个模块的更新

后面的几个方法都是调用 `forEachValue`,将对应对应的模块，以及传入的 `fn` 传入。


### getNamespace

根据 path 处理命名空间

```
getNamespace (path) {
  let module = this.root
  return path.reduce((namespace, key) => {
    module = module.getChild(key)
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
}
```

## 辅助工具函数

在 `vue` 的入口文件默认导出辅助工具函数。

```
import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```

我们可以通过解构调用 `vuex` 暴露出来的辅助工具函数。

```
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'`
```

辅助工具函数在 `src/helpers.js`:

```
export const mapState = normalizeNamespace((namespace, states) => {
  ...
  return res
})

export const mapMutations = normalizeNamespace((namespace, mutations) => {
  ...
  return res
})

export const mapGetters = normalizeNamespace((namespace, getters) => {
  ...
  return res
})

export const mapActions = normalizeNamespace((namespace, actions) => {
  ...
  return res
})

export const createNamespacedHelpers = (namespace) => ({
  ...
})
```

可以看到 `helpers.js` 向外暴露了5个辅助工具函数，在 `vuex` 入口文件中包装成对象后暴露出去。

### mapState

`mapState` 辅助函数帮助我们生成计算属性。

来看一下具体实现：

```
/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
export const mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
```

`mapState` 函数是经过 `normalizeNamespace` 函数处理后返回的函数。

`normalizeNamespace` 函数：

```
/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}
```


`mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用。

来看一下具体实现：

```
/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation (...args) {
      // Get the commit method from store
      let commit = this.$store.commit
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapMutations', namespace)
        if (!module) {
          return
        }
        commit = module.context.commit
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
```

`mapGetters` 辅助函数将 `store` 中的 `getter` 映射到局部计算属性。
来看一下具体实现：
```
/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  normalizeMap(getters).forEach(({ key, val }) => {
    // thie namespace has been mutate by normalizeNamespace
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
```

`mapActions` 辅助函数将组件的 methods 映射为 store.dispatch 调用
来看一下具体实现：

```
/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }
        dispatch = module.context.dispatch
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
```

`createNamespacedHelpers` 创建基于某个命名空间辅助函数。

来看一下具体实现：

```
/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
export const createNamespacedHelpers = (namespace) => ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
})
```





## 问题总结
### global eventBus 有何缺陷
eventBus 比较适合简单应用，但是随着需求增加，组件之间通信增多，eventBus 就显得不够直观，不方便我们管理，而且随着组件复用的增多，多个组件通信，又相互通信，就容易导致混乱。

### $store 如何注入到所有子组件

`$store` 是在 vuex install 初始化的时候赋值的，来看一下代码： 

```
 /**
  * Vuex init hook, injected into each instances init hooks list.
  */

function vuexInit () {
  const options = this.$options
  if (options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
```

在 vuexInit 方法中，首先判断如果有 `this.$options.store` 说明是 root 节点，判断 store 如果是 function 就将函数执行后的返回赋值给 `this.$store` ，否则将 `options.store` 直接赋值给 `this.$store`。
不是 `root` 节点就从父组件中获取 `$store`，这样就保证只有一个全局的 `$store`。

### mapState 实现
### mapGetter 如何映射
### Mutation 同步 && Action 异步

在注册 action 的时候，会将 action 方法包装成 Promise
mutation 只是包装了一下，仍然是同步代码

### dispatch 方法实现
### module 分割实现 && 局部状态 namespaced

实例化ModuleCollection

### 如何调用 vue-devtools
### 内置 logger 插件实现
### hotUpdate
### 时空穿梭功能实现



