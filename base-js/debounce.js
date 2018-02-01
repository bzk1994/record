// 函数去抖（debounce）


var debounce = function (idle, action) {
  var last
  return function () {
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function () {
      action.apply(ctx, args)
    }, idle)
  }
}

debounce(function () {
  console.log()
})