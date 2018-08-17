
# 浅谈异步编程
`JavaScript` 是一种直译式脚本语言，其一大特点就是单线程，因为在最初 JS 就是为了和浏览器交互而诞生的。

但是单线程就意味着所有任务需要依次执行，同一时间内只能有一段代码执行。

使用异步代码的原因就在于不希望在执行长时间任务的时候，阻塞下面程序的执行。

但是 `JavaScript` 如何实现异步？

<!-- ```
single-threaded
non-blocking
asynchronous
concurrent
runtime
``` -->

## Event Loop

`JavaScript` 通过 `Event Loop` 来实现异步代码。
<!-- ![Even Loop](https://pic2.zhimg.com/80/v2-da078fa3eadf3db4bf455904ae06f84b_hd.jpg) -->
<!-- ![event-loop](https://blog.carbonfive.com/wp-content/uploads/2013/10/event-loop.png) -->

我们将浏览器的任务分为同步任务和异步任务两种。

同步任务: 

```
1 thread ->   |<---A---->||<----B---------->||<------C----->|
```
执行单个任务会阻塞线程，后面的任务需要等待前面任务执行完成，再执行。

异步任务: 
```
        A-Start ------------------------------------------ A-End   
           | B-Start -----------------------------------------|--- B-End   
           |    |      C-Start ------------------- C-End      |      |   
           |    |       |                           |         |      |
           V    V       V                           V         V      V      
1 thread->|<-A-|<--B---|<-C-|-A-|-C-|--A--|-B-|--C-->|---A---->|--B-->| 
```
执行单个任务后不会等待结果返回，马上执行下一个任务，等到前一个任务完成，执行前一个任务的回调函数。

## 异步编程的各种实现

假定有两个函数 `f1` 和 `f2` ，后者等待前者的执行结果。

`f2` 函数只是一个打印函数

```
function f2(res) {
  console.log(res)
}
```

### 回调函数

回调是将一个函数作为参数传递给另一个函数，并且在第一个函数完成后被调用。

回调函数常见于浏览器的 `EventListener` `Ajax`，`Node` 的文件 `I/O` 操作、数据请求等。

```
function f1(fn) {
  setTimeout(() => {
    fn('f1')
  }, 500)
}

f1(f2)
```

回调函数也有缺点，多层回调函数的嵌套将形成回调地狱，代码的可读性差。

### jQuery Deferred

`jQuery 1.5.0` 以上版本支持了 `deferred` 对象。

```
function f1() {
  const deferred = $.Deferred()

  setTimeout(() => {
    deferred.resolve('f1')
  }, 500)

  return deferred.promise()
}

$.when(f1())
  .then(res => {
    f2(res)
  })
```

### Promise

`Promise` 是异步编程的一种解决方案，可以把 `Promise` 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject` ，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。

`then` 函数会返回一个 `Promise` 实例，并且该返回值是一个新的实例而不是之前的实例。因为 `Promise` 规范规定除了 `pending` 状态，其他状态是不可以改变的。

```
function f1() {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve('f1')
    }, 500)

  })
}

f1().then(res => {
  f2(res)
})
```

### Generator

`Generator` 是 `ES6` 中新增的语法，和 `Promise` 一样，都可以用来异步编程。

```
function* test() {
  let a = 1 + 2
  yield 2
  yield 3
}
let b = test()
// 需要去调用 `next` 方法
console.log(b.next()) // >  { value: 2, done: false }
console.log(b.next()) // >  { value: 3, done: false }
console.log(b.next()) // >  { value: undefined, done: true }
```

使用 `Generator` 实现：
```
function f1() {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve('f1')
    }, 500)

  })
}

function* foo() {
  const res = yield f1()
}
```

使用 `for...of` 循环可以自动遍历 `Generator` 函数时生成的 `Iterator` 对象，且此时不再需要调用 `next` 方法。
```
for (let n of foo()) {
  n.then && n.then(res => {
    f2(res)
  })
}
```

或者调用 `co` 模块：
```
import co from 'co'
co(function* foo() {
  const res = yield f1()
})
```

### async

`async` 函数返回一个 `Promise` 对象，可以使用`then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```
function f1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('f1')
    }, 500)
  })
}

(async function() {
  const res = await f1()
  f2(res)
})()
```

## 事件循环


```
process.nextTick(function () {
  console.log('process.nextTick1')
})

new Promise(resolve => {
  resolve()
}).then(() => {
  console.log('Promise1')
})

setImmediate(function () {
  console.log('setImmediate1')
  new Promise(resolve => {
    resolve()
  }).then(() => {
    console.log('Promise2')
  })
  process.nextTick(function () {
    console.log('process.nextTick3')
  })

  setImmediate(function () {
    console.log('setImmediate3')
  })
})

process.nextTick(function () {
  console.log('process.nextTick2')
})

setImmediate(function () {
  console.log('setImmediate2')
})

setTimeout(function () {
  console.log('setTimeout')
}, 0)
```

### 编译

[Babel](http://babeljs.io/en/repl)

[Traceur](http://google.github.io/traceur-compiler/demo/repl.html#)

### 参考资料

[the-javascript-event-loop-explained](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/)

[callbacks-listeners-promises](http://sporto.github.io/blog/2012/12/09/callbacks-listeners-promises/)

[es6-in-depth-generators](https://hacks.mozilla.org/2015/05/es6-in-depth-generators/)

[asynchronous-javascript](https://blog.risingstack.com/asynchronous-javascript/)

[ES6 generator](http://es6.ruanyifeng.com/#docs/generator)

[tasks-microtasks-queues-and-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

[阮一峰 generator](http://www.ruanyifeng.com/blog/2015/04/generator.html)

[阮一峰 deferred](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)

[艾伦 Deferred](https://www.cnblogs.com/aaronjs/p/3356505.html)

[MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)