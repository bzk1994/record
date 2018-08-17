// deepClone

// http://blog.csdn.net/sysuzhyupeng/article/details/70340598

function deepClone(data) {
  var type = Object.prototype.toString.call(data)
  var obj
  if (type === '[object Array]') {
    obj = []
  } else if (type === '[object Object]') {
    obj = {}
  } else {
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
