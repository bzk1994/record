// 根据 __VUE_DEVTOOLS_GLOBAL_HOOK__ 判断当前浏览器是否安装了 vueTools
const devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

export default function devtoolPlugin (store) {
  if (!devtoolHook) return

  store._devtoolHook = devtoolHook

  // 向 vueTools emit 事件 并传入当前的 store
  // devtoolHook 监听到会根据 store 初始化 vuex
  devtoolHook.emit('vuex:init', store)

  // TODO: 监听 replaceState ？
  devtoolHook.on('vuex:travel-to-state', targetState => {
    store.replaceState(targetState)
  })
  // TODO: 订阅函数 ？
  store.subscribe((mutation, state) => {
    devtoolHook.emit('vuex:mutation', mutation, state)
  })
}
