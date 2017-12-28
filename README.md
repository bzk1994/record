# daily-record

小记

————————————————————————————————————————

2017/12/28 下午4:10:38

Life is not a race, but a journey to be savored each step of the way.

Chrome DevTools 性能调试

https://www.jianshu.com/p/471950517b07

https://www.jianshu.com/p/b8cdcd9bfad8

https://www.jianshu.com/p/504bde348956


Vue 插件开发

官网

https://cn.vuejs.org/v2/guide/plugins.html#ad

Mint-ui Toast style used

PostCSS深入学习: 结合BEM和SUIT方法使用PostCSS

https://www.w3cplus.com/PostCSS/using-postcss-with-bem-and-suit-methodologies.html

```
// 基于基础组件toast.vue,再扩展新逻辑.
var ToastConstructor = Vue.extend(’./toast.vue’)

var instance = new  ToastConstructor()

document.body.appendChild(instance.$el);

event.target.parentNode.removeChild(event.target);

// 在下次 DOM 更新循环结束之后执行延迟回调
Vue.nextTick  


```

Vue 中 extend / component / mixins / extends 的区别

https://segmentfault.com/a/1190000010095089

————————————————————————————————————————

2017/12/27 下午4:10:38

应用优化-用户体验放在第一位

DNS预解析
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="https://www.xqchuxing.com" />
 <link rel="dns-prefetch" href="https://xqsite.oss-cn-hangzhou.aliyuncs.com " />

页面渲染优化

* 1.HTML文档结构层次尽量少，最好不深于六层；
* 2.脚本尽量后放，放在</body>前即可；
* 3.少量首屏样式内联放在<head>标签内；
* 4.样式结构层次尽量简单；
* 5.在脚本中尽量减少DOM操作，尽量缓存访问DOM的样式信息，避免过度触发回流；
* 6.减少通过JavaScript代码修改元素样式，尽量使用修改class名方式操作样式或动画；
* 7.动画尽量使用在绝对定位或固定定位的元素上；
* 8.隐藏在屏幕外，或在页面滚动时，尽量停止动画；
* 9.尽量缓存DOM查找，查找器尽量简洁；
* 10.涉及多域名的网站，可以开启域名预解析
* 减少重排和重绘


css3过渡动画开启硬件加速

```
.translate3d{ 
	-webkit-transform: translate3d(0, 0, 0); 
	-moz-transform: translate3d(0, 0, 0); 
	-ms-transform: translate3d(0, 0, 0); 
	transform: translate3d(0, 0, 0); 
}
```

性能调试

* Performance
* lighthouse
	
移动端click屏幕产生200-300 ms的延迟响应


图片优化

Type:

* JPEG：颜色非常丰富的图片（例如照片）
* PNG–8：色彩相对单一的图片
* PNG–24：局部透明的图片
* GIF：动图

- 压缩、懒加载、base64 		// 如何实现懒加载
- 使用图片 CDN 进行分发
- 阴影、渐变、动画及形状，允许我们构造适当风格的DOM元素。


```
Webpack对于性能优化？

<script defer src="script.js">  defer与async diff

fastClick 如何实现？ Toutchend
```
	

————————————————————————————————————————

2017/12/26 上午10:21:55

网页性能管理详解

http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html

Performance

https://segmentfault.com/a/1190000011516068

https://blog.coding.net/blog/Chome-Timeline

window.requestAnimationFrame()、window.requestIdleCallback()

CSS动画之硬件加速

https://www.w3cplus.com/css3/introduction-to-hardware-acceleration-css-animations.html

WebPageTest 优化网站

http://www.webryan.net/2013/01/use-webpagetest-to-analyze-web-performance/

————————————————————————————————————————

2017/12/25 下午5:27:55

熟悉JS

http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html

Vue 插件

https://cn.vuejs.org/v2/guide/plugins.html

https://segmentfault.com/a/1190000010559711

优化

https://segmentfault.com/a/1190000011213814

https://juejin.im/entry/58947598128fe1006ca2b85d

https://juejin.im/post/59c4c9d85188254f58412d17

————————————————————————————————————————

2017/12/19 下午1:26:06

requestAnimationFrame

http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

ajax跨域

https://juejin.im/entry/5a379a7b5188252b145b269e?utm_source=gold_browser_extension

JavaScript 实用技巧和写法建议

https://juejin.im/post/5a0c199851882531926e4297?utm_source=gold_browser_extension

————————————————————————————————————————

2017/12/15 上午9:49:23

CSS3下条纹&方格斜纹背景的实现

http://www.zhangxinxu.com/wordpress/2011/04/%E5%B0%8Ftipcss3%E4%B8%8B%E6%9D%A1%E7%BA%B9%E6%96%B9%E6%A0%BC%E6%96%9C%E7%BA%B9%E8%83%8C%E6%99%AF%E7%9A%84%E5%AE%9E%E7%8E%B0/

css3实现一个div设置多张背景图片及background-image属性

https://www.w3cplus.com/css3/css-secrets/striped-backgrounds.html

————————————————————————————————————————

2017/12/14 下午4:34:51

Promise

https://www.cnblogs.com/fsjohnhuang/p/4135149.html

http://es6.ruanyifeng.com/?search=synic&x=0&y=0#docs/promise

————————————————————————————————————————

2017/12/13 下午4:07:00"

lodash 

http://lodashjs.com/docs/#_mapvaluesobject-iteratee_identity-thisarg


Vue SPA 首屏加载优化实践

https://juejin.im/post/5a291092518825293b50366d?utm_source=gold_browser_extension

前端性能优化黄金法则

http://fsux.me/%E6%B5%85%E8%B0%88%E5%89%8D%E7%AB%AF/css/js/2015/11/19/Optimization-of-the-front-end-performance-of-the-golden-rule.html

————————————————————————————————————————

2017/12/12 下午17:45:18

HTTP缓存机制

https://juejin.im/post/5a1d4e546fb9a0450f21af23?utm_medium=fe&utm_source=weixinqun

Autoprefixer

https://www.w3cplus.com/PostCSS/using-postcss-for-cross-browser-compatibility.html


```
const postcssLoader = {
    loader: 'postcss-loader',
    options: {}
  }

// generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader, postcssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```

"webpack": "^2.6.1"
"vue": "^2.3.3"

————————————————————————————————————————

2017/12/11 上午9:54:22

Ts

https://github.com/xcatliu/typescript-tutorial

禅意花园

http://bonsaiden.github.io/JavaScript-Garden/zh/#function.this

又要开始路题库

https://www.freecodecamp.cn/zhanghao-zhoushan

  
————————————————————————————————————————

2017/12/8 下午5:40:03

webview字体大小

http://blog.csdn.net/fungleo/article/details/73309396

禅意花园

http://bonsaiden.github.io/JavaScript-Garden/zh/#function.this

css手册

http://www.css88.com/book/css/properties/flexible-box/box-align.htm

————————————————————————————————————————

2017/12/4 下午12:12:21

Ant UI

https://ant.design/components/steps-cn/

Async

http://es6.ruanyifeng.com/?search=synic&x=0&y=0#docs/async

简历

https://juejin.im/post/5a22b4455188253e2470c991?utm_source=gold_browser_extension

JavaScript 执行机制

https://juejin.im/post/59e85eebf265da430d571f89?utm_source=gold_browser_extension

————————————————————————————————————————

2017/11/29 下午2:10:29

Mongo

https://docs.mongodb.com/manual/mongo/

优化模式

https://juejin.im/post/5a1ea58e5188252ae93ab5c5?utm_source=gold_browser_extension

JS运行机制

https://juejin.im/post/59e85eebf265da430d571f89?utm_source=gold_browser_extension

————————————————————————————————————————

2017/11/28 上午10:18:59

移动端页面的 JavaScript 开销

https://juejin.im/entry/5a161926f265da432153b321?utm_source=gold_browser_extension

redux async

https://github.com/react-guide/redux-tutorial-cn/blob/master/07_dispatch-async-action-1.js

————————————————————————————————————————

2017/11/27 下午5:28:42

Redux

https://github.com/react-guide/redux-tutorial-cn/blob/master/02_about-state-and-meet-redux.js

MongoDb

http://www.yiibai.com/mongodb/mongodb_quick_guide.html

观察者 

https://juejin.im/post/5a16810d6fb9a0450e75c958?utm_source=gold_browser_extension

————————————————————————————————————————

2017/11/17 上午9:43:28

https://juejin.im/post/5a09361c6fb9a0451704b103?utm_medium=fe&utm_source=weixinqun

移动端浏览器前端优化策略

https://juejin.im/post/59ff2dbe5188254dd935c8ab?utm_source=gold_browser_extension

————————————————————————————————————————

2017/11/14 上午11:29:10

https://juejin.im/post/5a098b5bf265da431a42b227?utm_source=gold_browser_extension

redux

http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
http://www.redux.org.cn/

————————————————————————————————————————

2017/11/13 下午2:15:57

TCP/IP 协议

https://juejin.im/post/5a069b6d51882509e5432656?utm_source=gold_browser_extension

Ant ui

https://ant.design/components/modal-cn/

Es6 修饰器 Decorator

http://es6.ruanyifeng.com/#docs/decorator

async / await

https://juejin.im/entry/5a0032a051882546b15be7ab?utm_source=gold_browser_extension

————————————————————————————————————————

2017/11/12 下午8:35:28

cssModules

https://www.npmjs.com/package/react-css-modules

Nginx反向代理

https://www.cnblogs.com/gabrielchen/p/5066120.html

————————————————————————————————————————

2017/11/8 下午2:21:04

A-FRAME

https://aframe.io/docs/0.5.0/introduction/visual-inspector-and-dev-tools.html

————————————————————————————————————————

2017/11/6 下午2:21:04

krpano.com

https://krpano.com/plugins/videoplayer/#opensource
https://segmentfault.com/a/1190000005819777
Tweenmax

https://segmentfault.com/a/1190000007496078

————————————————————————————————————————
2017/11/6 下午4:55:24

WebViewJavascriptBridge 原理解析

https://juejin.im/entry/58e4a76a44d904006d2a7778

百度统计埋点

http://tongji.baidu.com/open/api/more?p=guide_trackEvent

vuex

https://juejin.im/post/59f66bd7f265da432d275d30?utm_source=gold_browser_extension

————————————————————————————————————————

2017/11/2 下午2:49:19

h5与原生交互

http://www.jianshu.com/p/e37ccf32cb5b
http://blog.csdn.net/yanghua_kobe/article/details/8209751

————————————————————————————————————————


2017/10/30 上午10:23:29

WebViewJavascriptBridge

https://github.com/marcuswestin/WebViewJavascriptBridge
http://www.cnblogs.com/jiang-xiao-yan/p/5345755.html
http://www.jianshu.com/p/ca496cb680fe

————————————————————————————————————————


2017/10/29 下午3:30:00

iphoneX适配

https://juejin.im/post/59f302eb518825550f53d839?utm_source=gold_browser_extension

HTTPS为什么安全

http://www.jianshu.com/p/ed6491169b24


https 引入http

https://segmentfault.com/q/1010000005872734

————————————————————————————————————————

2017/10/27 上午9:41:24

微信初始化需放在ready方法中
wx.ready(() => {
	// share methods
})

————————————————————————————————————————

2017/10/26 下午2:11:14

修改分享图标、内容
微信

https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

QQ

http://open.mobile.qq.com/api/mqq/index
 
————————————————————————————————————————

2017/12/21 

优化
https://juejin.im/post/59f44c5ef265da4327177b98

https://juejin.im/post/5a1b9cc051882560e35659e6

跨域

https://juejin.im/post/5a2f92c65188253e2470f16d


————————————————————————————————————————

```
// vue add directives
$("input").on("focus",function(){
    this.scrollIntoView();
})

directives: {
    focus: {
      inserted: function(el, { value }) {
        console.log(el, value)
        if (value) {
          el.scrollIntoView()
        }
      }
    }
  }
```

```
getBodyWidth() {
      const bodyWidth = document.body.clientWidth
      const bodyWidthMax = bodyWidth > 412 ? 412 : bodyWidth
      return (
        document.getElementById('app').getBoundingClientRect().width ||
        bodyWidthMax
      )
    },
    getBodyHeight() {
      const bodyHeight = document.body.clientHeight
      return (
        document.getElementById('app').getBoundingClientRect().bodyHeight ||
        bodyHeight
      )
    },
    getDialogTop() {
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      Common._Toast(scrollTop.toString())
      return scrollTop + document.documentElement.clientHeight / 2
    },
```

