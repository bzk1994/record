
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

### 在源码中 `debugger`

> 下载 `Vue` 源码

```bash
$ git clone git@github.com:vuejs/vuex.git
```

> 依赖安装
```bash
cd vue && yarn install
```

> 调试
```base
cd vue && yarn dev
```

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

vuex 的入口文件 src/index.js

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

install 方法 首先判断全局变量的 Vue (store.js 上面申明的变量) 是否与传入 _Vue 的是一个实例，随后将传入的 _Vue 赋值给 上面申明的 Vue 变量，避免重复安装

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

vuexInit 方法判断如果有 `this.$options.store` 说明是 root 节点，store 如果是 function 就执行将函数返回值赋值给 `this.$store` ，否则 `options.store` 直接赋值赋值
不是 `root` 节点就从父组件中获取 `$store`，保证只有一个全局的 `$store`

### class Store

```
class Store {
  constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    // 在浏览器环境下 && 没有执行过 install
    // 上面申明的 Vue 还是 null
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
### init module

### installModule

### resetStoreVM

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



