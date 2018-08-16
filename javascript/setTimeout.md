# 享骑APP交互

[WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)


## native

见项目**native**文件夹
	
	webViewJsBridge.js

> **setTimeout**

**setTimeout**用来指定某个函数或者代码，在指定的时间之后将**function|code**推入任务队列中(并不是在指定的时间之后立刻执行)

向任务队列添加定时任务, setTimeout函数是异步的。

浏览器模型定时计数器并不是由JavaScript引擎计数，因为单线程的JavaScript引擎处于阻塞状态无法计时，必须依赖外部来计时并触发，所以队列中的定时事件也是异步事件。

```
/**
 *
 * @param {Function} 	function	delay毫秒之后推入任务队列中的函数
 * @param {String} 		code		作用同上 不推荐（有风险）浏览器内部发现是字符串会自调用eval()，javascript引擎两次解析，降低性能
 * @param {Number} 		delay		延迟的毫秒数 最小延时 >=4ms (在HTML5 spec 规定)
 *	
 */
 
let timer = setTimeout(function|code, delay);
clearTimeout(timer);

```

著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
链接:http://caibaojian.com/about-settimeout.html
来源:http://caibaojian.com

setTimeout运行机制
setTimeout和setInterval的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。

每一轮Event Loop时，都会将“任务队列”中需要执行的任务，一次执行完。setTimeout和setInterval都是把任务添加到“任务队列”的尾部。因此，它们实际上要等到当前脚本的所有同步任务执行完，然后再等到本次Event Loop的“任务队列”的所有任务执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。

setTimeout(someTask,100);
veryLongTask();
上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面立即运行的任务（当前脚本的同步任务））非常耗时，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到前面的veryLongTask运行结束，才轮到它执行。



## clearTimeout
**setTimeout**返回一个**timeoutID**，表示定时器的**ID**，可以用来清除定时器

```
let timer = setTimeout(()=>{
	console.log('setTimeout');
}, 1000);

console.log(timer);	//111

clearTimeout(timer);

```

## this 指向
隐式丢失

bind

()=>

注意：bind方法是在ECMAScript 5引入的，所以它只能在大部分现代浏览器中正常运行。

自己模拟个bind

### 延迟执行
```
setTimeout(function () {
  console.log(1)
}, 0)

console.log(2)

// 2 1
```

我们这里延迟0ms调用函数
setTimeout

setTimeout()与setInterval()区别

使用setTimeout模拟setInterval

## Function

setTimeout做动画

requestAnimateFrame动画的好处

很多框架都基于setTimeOut的延迟执行实现

```
var name = 'window'
var obj = {
  name: 'obj',
  say: function (args) {
    setTimeout(() => {
      console.log(this.name, args)
    }, 1000, 'zhanghao')
  }
}

obj.say()

```

underscore	_.debounce 也是基于setTimeout实现的

RequireJS

setTimeout挂在window对象上的

JavaScript引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行JavaScript程序. setTimeout（method,  n）则是在参数指定的时间后将待执行方法放到执行队列中， 如果队列中没有其他方法等待，则回立即执行setTimeout指定的方法，如果队列非空,引擎就从队列头取出一个任务,直到该任务处理完,即返回后引擎接着运行下一个任务,在任务没返回前队列中的其它任务是没法被执行的.






函数调用

setInterval不推荐，使用setTimeout，造成定时任务卡阻

Even Loop

简单的函数防抖实现