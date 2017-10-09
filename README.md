# daily-record

小记


————————————————————————————————————————

2017/10/9 下午2:55:29

ES6学习
http://es6.ruanyifeng.com/#docs/object

浏览器渲染
https://juejin.im/post/59d489156fb9a00a571d6509?utm_source=gold_browser_extension

next Day

http://es6.ruanyifeng.com/#docs/iterator

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

