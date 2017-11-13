# daily-record

小记

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

```
后端调用微信返回
shareWxandQQ () {
      let href = window.location.href
      let params = {
        redirectUri: href,
        url: href
      }
      Common.getWxShareData(params)
        .then(res => {
          let data = {
            title: ‘title’,
            desc: ‘ desc’,
            link: href,
            imgUrl: ‘imgUrl’
          }
          Common.shareWxandQQ(Object.assign(data, res))
        })
    },

const getWxShareData = params => {
  let data = {
    mobile: '',
    source: 'wx',
    version: 1,
    sessionKey: ''
  }
  return new Promise(resolve => {
    axios.post(settings.GET_WX_DATA, Object.assign(data, params))
      .then(res => {
        if (res.success && res.result) {
          resolve(res.result)
        }
      }, err => {
        _Toast(err.errorMsg)
      })
  })
}

/**
 * 详见 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 * @param {*} data
 * 封装分享Methods
 */
const shareWxandQQ = data => {
  shareQQ(data)
  wx.config({
    debug: false,
    appId: data.appid,
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
  })

  // 分享到朋友圈
  wx.onMenuShareTimeline({
    title: data.title,
    link: data.link,
    imgUrl: data.imgUrl,
    success: () => {},
    cancel: () => {}
  })

  // 分享给朋友
  wx.onMenuShareAppMessage({
    title: data.title,
    desc: data.desc || '',
    link: data.url,
    imgUrl: data.imgUrl,
    type: 'link',
    dataUrl: '',
    success: () => {},
    cancel: () => {}
  })

  // 分享到QQ
  wx.onMenuShareQQ({
    title: data.title,
    desc: data.desc,
    link: data.link,
    imgUrl: data.imgUrl,
    success: () => {},
    cancel: () => {}
  })
  wx.error(() => {})
}

const shareQQ = data => {
  // QQ分享
  let createMateArr = [
    {
      itemprop: 'name',
      content: data.title
    },
    {
      itemprop: 'image',
      content: data.imgUrl
    },
    {
      name: 'description',
      itemprop: 'description',
      content: data.desc
    }
  ]
  for (let item of createMateArr) {
    let meta = document.createElement('meta')
    Object.keys(item).forEach((name, index) => {
      meta.setAttribute(name, item[name])
    })
    let s = document.getElementsByTagName('meta')[0]
    s.parentNode.insertBefore(meta, s)
  }
  if (window.mqq) {
    window.mqq.invoke('data', 'setShareInfo', {
      share_url: data.link,
      title: data.title,
      desc: data.desc,
      image_url: data.imgUrl
    })
  }
}
```

————————————————————————————————————————

2017/10/23 下午3:37:05
H5唤起App
http://blog.csdn.net/jiang314/article/details/52269824


————————————————————————————————————————

2017/10/23 下午3:37:05

Vue - md5
https://www.npmjs.com/package/md5

UC浏览器图片点击方法
http://www.cnblogs.com/joyho/articles/5017544.html

百度统计 埋点

￼
```
this.baiduStatistics('c418b26238ad9b52d91411d8a5662ea2')

baiduStatistics (key) {
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement('script')
        hm.src = `https://hm.baidu.com/hm.js?${key}`
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }

window._hmt.push('_getCouponSuccess', 'status', '领取礼包成功')
```
————————————————————————————————————————

2017/10/19 下午6:31:40

canvas 卡顿优化
http://www.cnblogs.com/iamzhanglei/archive/2011/11/29/2267868.html
https://freecodecamp.cn/challenges/convert-html-entities

————————————————————————————————————————

2017/10/18 下午6:30:08
```
#shadow{
	border-radius: 50%;
 	margin: 0 auto;
      	height: 7.6rem;
      	width: 7.6rem;
     	 background: #FFEC99;
      	box-shadow: 0 0 0 (1.373333rem / 2) rgba(251, 174, 41, .4), 0 0 0 1.55rem rgba(255, 185, 75, .2);
}
```

水波背景 canavs
http://www.cnblogs.com/zjfree/p/5379308.html
http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/

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
```
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
```

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


document.documentElement.clientHeight 		获取屏幕可视窗口高度
element.offsetTop				获取元素相对于文档顶部的距离
document.documentElement.scrollTop		获取浏览器窗口顶部与文档顶部之间的距离，就是滚动条滚动的距离

2 - 3 < 1	在可视区域
￼

getBoundingClientRect()
```
function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  return bound.top <= clientHeight + 100;
}
```

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

