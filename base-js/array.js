// 多维数组与一维数组的转换
// 递归
let data = [
  {
    "id": 47,
    "parentId": 1,
    "orgName": "21312",
    "leaf": "0"
  }, {
    "id": 48,
    "parentId": 47,
    "orgName": "销售A区",
    "leaf": "0"
  }, {
    "id": 49,
    "parentId": 1,
    "orgName": "技术部",
    "leaf": "0"
  }, {
    "id": 50,
    "parentId": 1,
    "orgName": "市场部",
    "leaf": "0"
  }, {
    "id": 52,
    "parentId": 1,
    "orgName": "销售部",
    "leaf": "0"
  }, {
    "id": 54,
    "parentId": 52,
    "orgName": "雷霆队",
    "leaf": "0"
  }, {
    "id": 55,
    "parentId": 52,
    "orgName": "朱元张队",
    "leaf": "0"
  }, {
    "id": 56,
    "parentId": 52,
    "orgName": "麒麟队",
    "leaf": "0"
  }, {
    "id": 57,
    "parentId": 52,
    "orgName": "杨帆&起航队",
    "leaf": "0"
  }, {
    "id": 58,
    "parentId": 52,
    "orgName": "笑傲江湖队",
    "leaf": "0"
  }, {
    "id": 59,
    "parentId": 52,
    "orgName": "鲲鹏队",
    "leaf": "0"
  }, {
    "id": 60,
    "parentId": 52,
    "orgName": "波尔图04队",
    "leaf": "0"
  }, {
    "id": 61,
    "parentId": 52,
    "orgName": "梦幻队",
    "leaf": "0"
  }, {
    "id": 62,
    "parentId": 52,
    "orgName": "新世队",
    "leaf": "0"
  }, {
    "id": 63,
    "parentId": 52,
    "orgName": "鹰之队",
    "leaf": "0"
  }, {
    "id": 64,
    "parentId": 52,
    "orgName": "挑战者队",
    "leaf": "0"
  }, {
    "id": 65,
    "parentId": 164,
    "orgName": "飞跃队",
    "leaf": "0"
  }, {
    "id": 66,
    "parentId": 52,
    "orgName": "飞虎队",
    "leaf": "0"
  }, {
    "id": 68,
    "parentId": 52,
    "orgName": "华东区",
    "leaf": "0"
  }, {
    "id": 69,
    "parentId": 68,
    "orgName": "卧虎藏龙",
    "leaf": "0"
  }, {
    "id": 72,
    "parentId": 52,
    "orgName": "西区2",
    "leaf": "0"
  }, {
    "id": 117,
    "parentId": 1,
    "orgName": "教学部1212122",
    "leaf": "0"
  }, {
    "id": 119,
    "parentId": 117,
    "orgName": "上海一分部",
    "leaf": "0"
  }, {
    "id": 125,
    "parentId": 117,
    "orgName": "测试部门DEPT2001",
    "leaf": "0"
  }, {
    "id": 126,
    "parentId": 49,
    "orgName": "22",
    "leaf": "0"
  }, {
    "id": 128,
    "parentId": 49,
    "orgName": "部门名称323",
    "leaf": "0"
  }, {
    "id": 129,
    "parentId": 49,
    "orgName": "二位测3",
    "leaf": "0"
  }, {
    "id": 144,
    "parentId": 117,
    "orgName": "1001",
    "leaf": "0"
  }, {
    "id": 146,
    "parentId": 1,
    "orgName": "人力资源部",
    "leaf": "0"
  }, {
    "id": 147,
    "parentId": 146,
    "orgName": "SSC",
    "leaf": "0"
  }, {
    "id": 164,
    "parentId": 52,
    "orgName": "A区",
    "leaf": "0"
  }, {
    "id": 189,
    "parentId": 164,
    "orgName": "super fly",
    "leaf": "1"
  }, {
    "id": 190,
    "parentId": 49,
    "orgName": "测试组",
    "leaf": "1"
  }, {
    "id": 191,
    "parentId": 49,
    "orgName": "运维组",
    "leaf": "1"
  }, {
    "id": 192,
    "parentId": 1,
    "orgName": "事业部",
    "leaf": "0"
  }, {
    "id": 193,
    "parentId": 1,
    "orgName": "钉钉测试部门10001",
    "leaf": "1"
  }, {
    "id": 194,
    "parentId": 49,
    "orgName": "开发组",
    "leaf": "0"
  },
  {
    "id": 189,
    "parentId": 164,
    "orgName": "super fly",
    "leaf": "1"
  }, {
    "id": 190,
    "parentId": 49,
    "orgName": "测试组",
    "leaf": "1"
  }, {
    "id": 191,
    "parentId": 49,
    "orgName": "运维组",
    "leaf": "1"
  }, {
    "id": 192,
    "parentId": 1,
    "orgName": "事业部",
    "leaf": "0"
  }, {
    "id": 193,
    "parentId": 1,
    "orgName": "钉钉测试部门10001",
    "leaf": "1"
  }, {
    "id": 194,
    "parentId": 49,
    "orgName": "开发组",
    "leaf": "0"
  }
]

function collect(arr, id) {
  return arr.filter(item => {
    // item.value = '' + item.id
    // item.label = item.orgName
    return item.parentId === id
  })
}

function transTree(arr, id) {
  let collectArr = collect(arr, id)

  if (!collectArr.length) return

  collectArr.map((item, i) => {
    let result = transTree(arr, item.id)
    if (result) collectArr[i]['children'] = result
  })

  return collectArr
}

transTreeArr = (transTree(arr, 1))
