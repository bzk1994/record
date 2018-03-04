

# 1 事件委托

* 事件冒泡：事件由最近具体元素接收，逐级向上传播到不具体的节点
	
	
```
document 
		
	html ↑
		
		body ↑
				
			div ↑

```
			
				

* 事件委托：利用事件冒泡，具体元素触发事件，事件冒泡到监听事件的上级元素，由上级元素统一处理

```

ul#parent
	li
	li
	li
	
var parent = document.querySelector('#parent')

parent.addEventListener('click', function (e) {
	
	var el = e.target

	if (el.tagName === 'LI') {
	  console.log(el)
	}
   
})

```

### 事件委托的好处

	减少占用内存(只获取一个Dom 添加一个事件)

	不用额外的解绑、添加事件监听

# 2 解释 JavaSctpt This 

this对象是在运行时基于函数的实行环境绑定的，取决于函数调用的方式
	
### 绑定规则

* 默认绑定

```
var a = 26

function foo() {
console.log(this.a)
}

foo() // 26
```

* 隐式绑定
	
```
function foo() {
  console.log(this.a)
}

var obj = {
  a: 26,
  foo: foo
}

obj.foo() // 26
```

* 显示绑定 call  apply  bind

```
function foo() {
  console.log(this.a)
}

var obj = {
  a: 26
}

foo.call(obj) // 26
```

* call  apply  bind 异同点

```
jump #13
```

* new 绑定

```
function Foo(a) {
  this.a = a
}

var bar = new Foo(26)

console.log(bar.a) // 26
```

* es6 => 绑定

```
// 继承外层函数调用的this绑定

let obj = {
  a: 26,
  foo: function () {
    setTimeout(() => {
      console.log(this.a)
    })
  }
}

obj.foo() // 26
```

# 3 解释原型继承

* 原型链


JS在创建对象的时候，有一个叫做[[Prototype]]的内置属性，用于指向创建它的函数对象的原型对象prototype, 如此层层递进, 便组成了原型链
详见 高程 P148 P163


* 如何继承

1.借用构造函数
	
2.组合继承
	
3.原型式继承
	
4.寄生式继承
	
5.寄生组合式继承

	

# 4 ADM 和 Common.js  关系
	
* CommonJS

```
同步加载	Node			多用于服务端
```

* AMD

```
异步加载	RequireJS		依赖前置，提前执行
```
* CMD

```
异步加载 	SeaJS			依赖就近，延迟执行
```

* 题外话
	
```
require.js 原理

两者的模块导入以及导出机制有何不同
```
# 5 自执行函数的使用

* 用途
	
	模拟块级作用域，创建命名空间，避免变量冲突
	
	*JQuery RequireJS 百度第三方统计*
	
```
function foo(){
	console.log(1)
}()

// Uncaught SyntaxError: Unexpected token )
```

```
(function foo(){
	console.log(1)
})()

// 1

```

```
(function foo(){
	console.log(1)
}())

// 1
```

# 6 变量的概念 类型判断
	
* Undefined

```
// 申明未初始化

var a

console.log(a)

// undefined

```


```
// 赋值为undefined

var a = undefined

console.log(a)	// undefined

console.log(typeof a)	// undefined

```

* Null

```
var a = null

console.log(a)	// null

console.log(typeof a) // "object"

console.log(a == undefined) // true 隐式转换false

console.log(a === null)		// true

function isNull(value) {
    return !value && typeof value != "undefined" && value != 0
}

console.log(isNull(isNull))	// true

```



# 7 闭包的概念
	
* 概念
		
	能够读取其他函数内部变量的函数

* 用途

	模拟私有变量


* 坏处

	内存消耗 造成内存泄漏
	
	

# 8 forEach && map

* forEach

```
// callback不支持return 不返回新数组

var arr = [1, 2, 3, 4, 5]

var res = arr.forEach(function (item,index,input) {
     return item * 2
})

console.log(arr) //	[1, 2, 3, 4, 5]

console.log(res)	//	undefined

```

* map

```
// callback支持return 返回新数组
var arr = [1, 2, 3, 4, 5]

var res = arr.map(function (item,index,input) {
     return item * 2
})

console.log(arr) //	[1, 2, 3, 4, 5]

console.log(res)	//	[2, 4, 6, 8, 10]

```

	
# 9 匿名函数

```
//	回调函数
arr.forEach(function (item,index,input) {
     return item * 2
})

//	IIFE
function foo(){
	console.log(1)
}()

```
	
# 10 如何组织你的代码

	这个说来话长

# 11 主机对象和本机对象有什么区别

	了解即可

# 12 函数声明 函数表达式 构造函数 不同
	
	// 函数声明提升
 	function Person(){}
	
	// 函数表达式不提升
	var person = Person()

	var person = new Person()

# 13 call and apply 异同 
	
	题外话 bind  && 模拟

# 14 Function.prototype.bind

# document.write()
	
	作用
	
	坏处

# What's the difference between feature detection, feature inference, and using the UA string

	不太理解
	
# 解释Ajax

	原生ajax

	用处

# Ajax优缺点

# 解释jsonp

	自己模拟jsonp请求

# JavaScript 模板引擎

	Handlebar

# hoisting
	
	函数提升

	变量提升

# 解释事件冒泡

	事件委托

# attribute  && property

JavaScript的同源策略

== and ===

三元表达式

use strict

Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?
	
	大概意思防止污染命名空间

load && DOMContentLoaded 异同

 single page SEO

Promise代替回调有什么优点和缺点
		
	优点和缺点

	Promise 实现思路

工具和技术来调试

迭代对象属性和数组项

mutable and immutable

	immutable库  看看

同步和异步函数

let, var or const

事件循环？调用堆栈和任务队列区别

ES6类和ES5函数构造函数有什么区别

高阶函数

剪头函数 好处

解构对象或数组

ES6模板文字 

#### 部分说明借鉴于: 

JavaScript高级程序设计 
	
你不知道的JavaScript 
	
JavaScript-Garden <http://bonsaiden.github.io/JavaScript-Garden/zh/>




	














