/**
 * Created by Administrator on 2016/9/11.
 */
define(['jquery'], function ($) {
  //Do setup work here
  //若是这个模块没有任何依赖，并且他仅仅是一组键值对，那么就传递一个对象就好。
  //相对模块生产url，你可能需要使用一个相对模块的url：
  return {
    subUrl: "subUrl",
    color: "black",
    size: "unisize",
    add: function (num) {
      alert(num);
    },
    p: $("p").html()
  }
});