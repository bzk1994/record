# daily-record

小记
————————————————————————————————————————

#shadow{
	border-radius: 50%;
 	margin: 0 auto;
      	height: 7.6rem;
      	width: 7.6rem;
     	 background: #FFEC99;
      	box-shadow: 0 0 0 (1.373333rem / 2) rgba(251, 174, 41, .4), 0 0 0 1.55rem rgba(255, 185, 75, .2);
}

水波背景 canavs
http://www.cnblogs.com/zjfree/p/5379308.html

————————————————————————————————————————

2017/10/12 上午9:42:27

React 初学
http://www.w3cplus.com/react/events-in-react.html

生命周期
http://www.w3cplus.com/react/component-lifecycle.html

通关
https://freecodecamp.cn/home

————————————————————————————————————————

2017/10/10 上午9:58:21

黑科技
https://github.com/jawil/blog/issues/24

[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})

React
http://www.w3cplus.com/react/introducing-react.html

一切只如昨夜，一切只成追忆


————————————————————————————————————————

2017/10/9 下午2:55:29

ES6学习
http://es6.ruanyifeng.com/#docs/object

浏览器渲染
https://juejin.im/post/59d489156fb9a00a571d6509?utm_source=gold_browser_extension

浏览器渲染过程与性能优化
https://juejin.im/post/59d489156fb9a00a571d6509?utm_source=gold_browser_extension
 
移动 Web 开发问题和优化小结 ★
https://juejin.im/post/59c4c9d85188254f58412d17?utm_source=gold_browser_extension

美团点评酒旅前端的技术体系

https://juejin.im/entry/59db11f8518825350f42506c?utm_source=gold_browser_extension

next Day

http://es6.ruanyifeng.com/#docs/iterator

CSS

国服第一切图仔，好屌的样子

https://github.com/chokcoco/iCSS

text-align-last: justify;	文字对齐
caret-color: red;		光标颜色



————————————————————————————————————————

2017/9/29 下午4:12:17

Css优化
https://juejin.im/post/59c9ca9c6fb9a00a6b6e7e09?utm_source=gold_browser_extension
————————————————————————————————————————

2017/9/28 上午10:09:39

lazy load img


document.documentElement.clientHeight 	获取屏幕可视窗口高度
element.offsetTop						获取元素相对于文档顶部的距离
document.documentElement.scrollTop		获取浏览器窗口顶部与文档顶部之间的距离，就是滚动条滚动的距离

2 - 3 < 1	在可视区域
￼

getBoundingClientRect()

function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  return bound.top <= clientHeight + 100;
}

函数节流与防抖
http://www.bootcss.com/p/underscore/#each
https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs

IntersectionObserver
http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html


grunt与gulp
https://github.com/Platform-CUF/use-gulp#

Vue Object.defineProperty()
Arr.$set(0, ‘test’)

Script
defer：用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。 
async：HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。 
Require  使用的是async

http://blog.csdn.net/liuhe688/article/details/51247484
http://ued.ctrip.com/blog/script-defer-and-async.html
￼
 ————————————————————————————————————————

2017/9/27 下午5:46:19

Jpg图片色彩还原不一致

浏览器缓存机制
http://www.cnblogs.com/520yang/articles/4807408.html

———————————————————————————————————————— 
2017/9/26 下午5:37:40

nprogress	加载

Promise 4.3	es6-promise

Promise resolve reject catch add race

Jq $.Deferred =>  jq ajax

Mock.js

函数节流（throttle）与函数去抖（debounce）

————————————————————————————————————————

