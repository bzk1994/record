[查看栗子](https://zhanghao-zhoushan.github.io/record/css/page-center.html)

## 页面居中

### common style

```
* {
  margin: 0;
  padding: 0;
  background: lightyellow;
}

/* common */

.menu__title {
  text-align: center;
  color: #07536c;
  line-height: 80px;
}

.menu__container {
  position: relative;
  height: 250px;
  border-top: 1px solid lightblue;
  border-bottom: 1px solid lightblue;
}

.center__common_item {
  width: 200px;
  height: 200px;
  background: lightblue;
  border-radius: 10px;
}
```

### absolute + margin

> html

```
<div class="menu__container">
  <div class="center__common_item center__item_margin"></div>
</div>
```

> css

```
/* margin */

.center__item_margin {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
```

### absolute + margin-auto

> html

```
<div class="menu__container">
  <div class="center__common_item center__item_margin_auto"></div>
</div>
```

> css

```
/* margin auto */

.center__item_margin_auto {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

### absolute + translate

> html

```
<div class="menu__container">
  <div class="center__common_item center__item_translate"></div>
</div>
```

> css

```
/* translate */

.center__item_translate {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### table

> html

```
<div class="menu__container_table">
  <div class="center__common_item center__item_table"></div>
</div>
```

> css

```
/* table */

.menu__container_table {
  height: 250px;
  width: 100vw;
  display: table-cell;
  text-align: center;
  border: 1px solid lightblue;
  vertical-align: middle;
}

.center__item_table {
  display: inline-block;
}
```
### flex

> html

```
<div class="menu__container menu__container_flex">
  <div class="center__common_item"></div>
</div>
```

> css

```
/* flex */
.menu__container_flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
```