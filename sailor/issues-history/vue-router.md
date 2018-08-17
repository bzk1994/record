### vue-router runQueue 理解

首先这个函数就是为了同步运行异步

> runQueue 函数
```
// util/async.js
/* @flow */
export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}
```

> runQueue 调用

```
// history/base.js
// 执行合并后的任务队列
runQueue(queue, iterator, () => {
  const postEnterCbs = []
  const isValid = () => this.current === route
  // wait until async components are resolved before
  // extracting in-component enter guards
  // 拿到组件 beforeRouteEnter 钩子函数 合并任务队列
  const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
  const queue = enterGuards.concat(this.router.resolveHooks)
  runQueue(queue, iterator, () => {
    if (this.pending !== route) {
      return abort()
    }
    this.pending = null
    onComplete(route)
    if (this.router.app) {
      this.router.app.$nextTick(() => {
        postEnterCbs.forEach(cb => { cb() })
      })
    }
  })
})
```

> runQueue 的第一个参数 queue 守卫的钩子函数 

```
// history/base.js
// 提取守卫的钩子函数 将任务队列合并
const queue: Array<?NavigationGuard> = [].concat(
  // in-component leave guards
  // 获得组件内的 beforeRouteLeave 钩子函数
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  // 获得组件内的 beforeRouteUpdate 钩子函数
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(m => m.beforeEnter),
  // async components
  // 异步组件处理
  resolveAsyncComponents(activated)
)
```

> runQueue 的第二个参数 iterator 迭代器函数 

```
// history/base.js
const iterator = (hook: NavigationGuard, next) => {
  if (this.pending !== route) {
    return abort()
  }
  try {
    hook(route, current, (to: any) => {
      if (to === false || isError(to)) {
        // next(false) -> abort navigation, ensure current URL
        this.ensureURL(true)
        abort(to)
      } else if (
        typeof to === 'string' ||
        (typeof to === 'object' && (
          typeof to.path === 'string' ||
          typeof to.name === 'string'
        ))
      ) {
        // next('/') or next({ path: '/' }) -> redirect
        // 重定向操作
        abort()
        if (typeof to === 'object' && to.replace) {
          this.replace(to)
        } else {
          this.push(to)
        }
      } else {
        // confirm transition and pass on the value
        next(to)
      }
    })
  } catch (e) {
    abort(e)
  }
}
```

进到 `runQueue` 函数中，就先把导航守卫里的钩子函数拿出来传给迭代器 也就是 `runQueue` 的第二个参数
然后迭代器函数中去执行钩子函数 一系列的路由判断是否需要中断跳转
没问题的话等待用户调用 `next`
`next` 是迭代器的第二个参数 ，也是 `runQueue` 中的
```
() => {
  step(index + 1)
}
```
这样就可以继续从导航守卫的数组中拿出下一个需要执行的钩子函数继续重复执行上面的步骤
钩子函数执行完毕 就去执行 `runQueue` 里的第三个回调参数