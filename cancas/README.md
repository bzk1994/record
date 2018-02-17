canvas 刮奖 3种方案实现
-----------------

[Jump To Demo](https://zhanghao-zhoushan.github.io/daily-record/cancas/card.html)

### Plan1

此方案应该是比较完善的

通过`context.globalCompositeOperation = 'destination-out'`的特性

[`destination-out`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing/Example)

要注意的是图片CND需配置跨域，并且要设置 `img.crossOrigin = "anonymous"`

`err: The canvas has been tainted by cross-origin data.`

图片服务添(CND)加CROS（跨域） `Access-Control-Allow-Origin:*`

`Set img.crossOrigin = "anonymous"`

-----------------

### Plan2

通过绘制圆形 剪切画布实现

注意 `save` `restore`

-----------------

### Plan3

通过绘制线条的方式实现

核心 `this.context.strokeStyle = this.context.createPattern(this.img, 'no-repeat')`

通过 `requestAnimationFrame` 设置动画频率

-----------------

Plan2和Plan3有一点问题，图片像素过大，绘制不完全

问题待解决

占坑 drawImage 绘制缩放 ？