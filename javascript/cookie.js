// cookie ？

// Cookie是服务器发给客户端的特殊信息，以文本的方式保存在客户端，每次请求时都带上它
// 4kb

// 作用
// 跟踪浏览器用户身份

// SetCookie
function SetCookie(name, value, expires, path, domain, secure) {
  var today = new Date()
  today.setTime(today.getTime())
  if (expires) { expires *= 86400000 }
  var expires_date = new Date(today.getTime() + (expires))
  document.cookie = name + "=" + escape(value)
    + (expires ? ";expires=" + expires_date.toGMTString() : "")
    + (path ? ";path=" + path : "")
    + (domain ? ";domain=" + domain : "")
    + (secure ? ";secure" : "")
}

// getCookie
function getCookieByArray(name) {
  var cookies = document.cookie.split(';')
  var c
  for (var i = 0; i < cookies.length; i++) {
    c = cookies[i].split('=')
    if (c[0].replace(' ', '') == name) {
      return c[1]
    }
  }
}
var r = decodeURIComponent(getCookieByArray('user'))
