
## 关于 vuex 想了以下几个问题

[vuex 文档](https://vuex.vuejs.org/zh/)

### 带着问题去看源码

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

### index

vuex 的入口文件 src/index.js

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

引入了 Store 、install 和一些辅助工具函数，将引入的变量组装成一个对象向外暴露

### install

来看一下 install 方法

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

install 方法首先判断变量 Vue (store.js 上面申明的变量) 是否与传入 _Vue 的是一个实例，随后将传入的 _Vue 赋值给 Vue，避免重复安装

随后调用引入的 applyMixin 方法，并将 Vue 实例作为参数传入

applyMixin 在 src/mixin.js 作为默认方法导出

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
mixin 主要根据传入的 Vue 实例做不同处理

2.0 采用 mixin 注入 $store 将 vuexInit 放入 beforeCreate 生命周期钩子

1.0 重写 _init 方法 将 vuexInit 合并到 vue init 方法中

进入到 vuexInit 方法中，首先判断如果有 `this.$options.store` 说明是 root 节点，store 如果是 function 就执行将函数返回值赋值给 `this.$store` ，否则 `options.store` 直接赋值赋值
不是 `root` 节点就从父组件中获取 `$store`，保证只有一个全局的 `$store`

### class Store

```
class Store {
  constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    // 没有 Vue 变量 && 在浏览器环境下 && window 上有 Vue 变量
    // 进行自动安装
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    if (process.env.NODE_ENV !== 'production') {
      // 断言
      // 必须在创建 store 实例之前调用 install
      // 支持 Promise
      // 必须是 Store 的实例
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `store must be called with the new operator.`)
    }

    // plugins  插件数组
    // strict   严格模式
    const {
      plugins = [],
      strict = false
    } = options

    // store internal state
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
    this._modules = new ModuleCollection(options)
    // 在 installModule 函数中 如果有命名空间就储存到 _modulesNamespaceMap 中
    // 储存有命名空间的 module
    this._modulesNamespaceMap = Object.create(null)
    // 储存订阅者
    this._subscribers = []
    // 用 Vue 实例 实现 Store 的 watch 方法
    this._watcherVM = new Vue()

    // bind commit and dispatch to self
    // 将 dispatch commit 指向当前的 Store 实例 、
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
    // ModuleCollection 处理后的模块，顶层 state
    // state = { count: 0 }
    const state = this._modules.root.state

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    // 注册 modules
    // vuex 提供了嵌套模块的写法 需要递归注册 modules
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    // 重置 Vue 实例 实现响应式的 state computed
    resetStoreVM(this, state)

    // apply plugins
    // plugins 是在实例化 Store 时候传入的数组
    // 循环调用插件
    // 每一个插件就是一个函数 类似 createLogger
    plugins.forEach(plugin => plugin(this))

    // vueTools 插件处理
    if (Vue.config.devtools) {
      devtoolPlugin(this)
    }
  }
}
```

我们来逐行看一下 Store 构造函数中的 constructor 代码

```
if (!Vue && typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}v
```

判断 store.js 开始申明的 Vue 变量还未赋值或者取非为 true， window 不为 undefined （说明在浏览器环境下），window 上有 Vue 变量，如果全部符合执行  install 方法进行自动安装
这么做主要是为了防止在某些情况下避免自动安装，具体情况请看 [#731](https://github.com/vuejs/vuex/issues/731)


然后就是一些断言函数，在非生产环境执行

```
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
```

断言函数传入的 condition 在函数内取非,为 true 再抛出异常

```
assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
```

判断当前 Vue 变量， 在创建 store 实例之前必须调用 Vue.use(Vuex)

```
assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
```

判断支持 Promise 对象， 因为 vuex 的 registerAction 时会将不是 Promise 的方法 Promise 包装成 Promise , store 实例的 dispatch 方法 也使用了 Promise.all，这也是为什么 action 支持异步调用

```
assert(this instanceof Store, `store must be called with the new operator.`)
```
判断 this 必须是 Store 的实例

接下来是从 options 解构出 plugins strict

```
const {
  plugins = [],
  strict = false
} = options
```

plugins: vuex 的插件 数组 会在后面循环调用
strict: 是否是严格模式 后面判断如果是严格模式的会执行 enableStrictMode 方法，确保只能通过 mutation 操作 state

接下来就是一些初始参数的赋值
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

使用 call 方法将 dispatch 和 commit 的 this 绑定到当前的 Store 实例上

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

将 结构出的 strict 变量赋值给 this.strict 上，方便使用
```
// strict mode
this.strict = strict
```

### this._modules

在上面初始参数的赋值中 this._modules 就是 ModuleCollection 类的实例
```
this._modules = new ModuleCollection(options)
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
    // 判断 path.length
    // 0 说明是 root 保存到 this.root 上
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

在 ModuleCollection 类的 constructor 中首先会执行 类的 register 方法，将空数组、rawRootModule(也就是实例化的时候传入的 options)、false 最为最初参数传入

register 方法会递归调用，实现嵌套模块的收集
首先会在非生产环境调用 assertRawModule 函数，对 module 进行一些断言





### init module

```
// init root module.
// this also recursively registers all sub-modules
// and collects all module getters inside this._wrappedGetters
installModule(this, state, [], this._modules.root)
```

### resetStoreVM

```
// initialize the store vm, which is responsible for the reactivity
// (also registers _wrappedGetters as computed properties)
resetStoreVM(this, state)
```

## 问题总结
### global event bus 有何缺陷
### $store 如何注入到所有子组件
### mapState 实现
### mapGetter 如何映射
### Mutation 同步 && Action 异步
### dispatch 方法实现
### module 分割实现 && 局部状态 namespaced
### 如何调用 vue-devtools
### 内置 logger 插件实现
### hotUpdate
### 时空穿梭功能实现



