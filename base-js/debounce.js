// 函数去抖（debounce）

// 模糊查询

/**
 *
 * @param {Funtion} fn 
 * @param {Number} delay 
 * 
 * @return {Function} 
 */
const debounce = function (fn, delay) {
  let timer

  return function () {
    var context = this
    var args = arguments

    clearTimeout(timer)

    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// test
window.onresize = debounce(() => {
  console.log('risize')
}, 500)


// underscore.js

/**
 * 
 * @param {Funtion} func 
 * @param {Number} wait 
 * @param {Boolean} immediate 
 */

let _ = {}

_.debounce = function (func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArgs(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = _.delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};