const organizeArr = [
  { id: 1, babel: "总部", parentId: null },
  { id: 49, label: "技术部", parentId: 1 },
  { id: 128, label: "部门名称", parentId: 49 },
  { id: 129, label: "二位测3", parentId: 49 },
  { id: 190, label: "测试组", parentId: 49 },
  { id: 191, label: "运维组", parentId: 49 },
  { id: 194, label: "开发组", parentId: 49 },
  { id: 200, label: "产品组", parentId: 49 },
  { id: 213, label: "部门01", parentId: 49 },
  { id: 214, label: "部门02", parentId: 49 },
  { id: 239, label: "新增部门", parentId: 49 },
  { id: 668, label: "UI组", parentId: 49 },
  { id: 669, label: "技术支持组", parentId: 49 },
  { id: 764, label: "技术开发组", parentId: 194 },
  { id: 780, label: "desc", parentId: 764 },
  { id: 782, label: "22", parentId: 194 },
  { id: 783, label: "开发一组", parentId: 49 },
  { id: 784, label: "开发二组", parentId: 49 },
  { id: 785, label: "开发三组", parentId: 49 },
  { id: 786, label: "开发四组", parentId: 49 },
  { id: 787, label: "开发五组", parentId: 49 },
  { id: 796, label: "测试六组", parentId: 190 },
  { id: 798, label: "产品1小组", parentId: 200 },
  { id: 803, label: "开发组1", parentId: 49 },
  { id: 805, label: "开发组2", parentId: 49 },
  { id: 806, label: "测试部门11", parentId: 764 },
  { id: 807, label: "测试部门111", parentId: 811 },
  { id: 808, label: "测试部门1112", parentId: 49 },
  { id: 809, label: "大前端", parentId: 808 }
]

console.time('transOrganizeTree')

let collect = {}

function transOrganizeTree(arr) {
  arr.map(item => {
    if (collect[item.parentId]) {
      collect[item.parentId].push(item)
    } else {
      collect[item.parentId] = [item]
    }
  })
  return trans(collect[1])
}

function trans(arr) {
  arr.map(item => {
    item.children = collect[item.id]
    if (item.children) {
      trans(item.children)
    }
  })
  console.log(JSON.stringify(arr))
  return arr
}

transOrganizeTree(organizeArr)

console.timeEnd('transOrganizeTree')