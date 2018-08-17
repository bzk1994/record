## 三栏布局

[Jump To Demo](https://zhanghao-zhoushan.github.io/record/layout.html)

### 圣杯布局

> html

```
<div class="grail">
  <div class="middle col">middle</div>
  <div class="left col">left</div>
  <div class="right col">right</div>
</div>
```
> css

```
/* 圣杯 start */

.grail {
  line-height: 100px;
  overflow: hidden;
  padding: 0 100px 0 100px;
}

.grail .col {
  position: relative;
  float: left;
}

.grail .middle {
  width: 100%;
}

.grail .left {
  width: 100px;
  margin-left: -100%;
  left: -100px
}

.grail .right {
  width: 100px;
  margin-left: -100px;
  right: -100px;
}

/* 圣杯 end */
```

### 双飞翼布局

> html

```
<div class="wing">
  <div class="middle col">
    <div class="middle-content">middle</div>
  </div>
  <div class="left col">left</div>
  <div class="right col">right</div>
</div>
```

> css
```
/* 双飞翼 start */

.wing {
  overflow: hidden;
  line-height: 100px;
}

.wing .col {
  float: left;
}

.wing .left {
  width: 100px;
  margin-left: -100%;
}

.wing .right {
  width: 100px;
  margin-left: -100px;
}

.wing .middle {
  width: 100%;
}

.wing .middle .middle-content {
  margin: 0 100px 0 100px;
}

/* 双飞翼 end */

```

### flex

> html

```
<div class="flex-layout">
  <div class="left">left</div>
  <div class="middle">middle</div>
  <div class="right">right</div>
</div>
```

> css

```
/* flex start */

.flex-layout {
  display: flex;
  line-height: 100px;
}

.flex-layout .middle {
  flex: 1;
}

.flex-layout .left,
.flex-layout .right {
  width: 100px;
}

/* flex end */
```

## 两栏布局

### float + margin-left

> html
```
<div class="content content-float">
  <div class="left">
    <p>Hello</p>
    <p>I'am left</p>
  </div>
  <div class="right">
    <p>Hi</p>
    <p>I'am right</p>
  </div>
</div>
```

> css
```
/* float + margin-left */

.content {
  margin-bottom: 20px;
  line-height: 50px;
}

.left {
  background: lightblue;
}

.right {
  background: lightcoral;
}

.content-float .left {
  width: 200px;
  float: left;
}

.content-float .right {
  margin-left: 200px;
}
```

### absolute + margin-left

> html
```
<div class="content content-absolute">
  <div class="left">
    <p>Hello</p>
    <p>I'am left</p>
  </div>
  <div class="right">
    <p>Hi</p>
    <p>I'am right</p>
  </div>
</div>
```

> css
```
/* absolute + margin-left */

.content-absolute {
  position: relative;
}

.content-absolute .left {
  position: absolute;
  width: 200px;
}

.content-absolute .right {
  margin-left: 200px;
}
```

## flex fill

> html
```
<div class="flex-fill">
  <div class="lightcoral"></div>
  <div class="lightcoral"></div>
  <div class="lightcoral"></div>
  <div class="lightcoral"></div>
  <div class="lightcoral"></div>
  <div class="lightcoral"></div>
  <div></div>
  <div></div>
</div>
```

> css

```
/* flex fill */
css
.flex-fill {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-flow: row wrap;
}

.flex-fill div {
  width: 70px;
  height: 70px;
  margin: 10px;
}

.lightcoral {
  background: lightcoral;
}
```