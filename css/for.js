let menu = [
  { "id": "28", "parent_id": "0", "code": "index" },
  { "id": "1", "parent_id": "0", "code": "express_order" },
  {
    "id": "8", "parent_id": "0", "code": "basic_setting",
    "children": [
      {
        "id": "9", "parent_id": "8", "code": "common",
        "children": [
          { "id": "10", "parent_id": "9", "code": "shop" }
        ]
      },
      {
        "id": "11", "parent_id": "8", "code": "express_setting",
        "children": [
          { "id": "13", "parent_id": "11", "code": "express_rule" },
          { "id": "24", "parent_id": "11", "code": "express_manager" },
          { "id": "25", "parent_id": "11", "code": "express_trail" }
        ]
      }
    ]
  }
]
var temp = []
function loop(data, path) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].code == path && data[i].parent_id == '0') {
      temp = []
    } else if (data[i].code == path || data[i].id == path) {
      if (data[i].parent_id != '0') {
        temp.unshift(data[i].parent_id)
        loop(menu, data[i].parent_id)
      }
    } else {
      if (data[i].children) {
        loop(data[i].children, path)
      }
    }
  }
}


var result = loop(menu, 'shop')

function loop2(data, path) {
  var arr = []
  data.map(function (item) {
    if (item.code !== 'shop') {
      loop2()
    }
  })
  return arr
}

console.log(loop2(menu, 'shop'))