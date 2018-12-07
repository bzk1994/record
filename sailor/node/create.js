const fs = require('fs')
const path = require('path')
const util = require('util')
const { promisify } = require('util')

const mkdir = promisify(fs.mkdir)
const access = promisify(fs.access)
const stat = promisify(fs.stat)
const copyFile = promisify(fs.copyFile)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const argv = process.argv
const templateDir = './template'

// 文件拷贝
function copy() {
  copyFile('index.js', 'copy.js').then(() => {
    readFile('copy.js', 'utf8').then(data => {
      console.log('读取 copy.js 成功！', data)
    })
  })
}

// 创建文件夹
function makeTemplateDir(dir) {
  // try {
  //   const stat = fs.statSync(current)
  //   console.log(`已经存在同名文件夹：${stat}`)
  //   return Promise.resolve()
  // } catch (error) {
  //   return mkdir(dir)
  //     .then(() => {
  //       console.log(`创建${dir}文件夹成功！`)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }
}

// 循环创建文件夹
async function makeDirPath(dirPath) {
  const dirArr = dirPath.split(path.sep)
  const { length } = dirArr
  let index = -1
  while (++index < length) {
    // 拼接路径
    const current = path.join(
      __dirname,
      dirArr.slice(0, index + 1).join(path.sep)
    )
    try {
      // 检查文件夹是否存在 accessSync or statSync
      // fs.accessSync(current, fs.constants.F_OK)
      fs.statSync(current)
    } catch (error) {
      // 创建文件夹
      makeTemplateDir(current)
    }
  }
}

// try {
//   const stat = fs.statSync('./template')
//   console.log(stat)
// } catch (error) {
//   console.error(`模板文件不存在：${error}`)
// }

// 递归处理模板文件
async function readTemplateFile(templateDir) {
  fs.readdir(templateDir, (err, files) => {
    if (err) console.error(`模板文件不存在：${err}`)

    files.forEach(file => {
      const fileDir = path.join(templateDir, file)
      fs.stat(fileDir, (err, stat) => {
        if (err) console.error(`获取 ${fileDir} 文件 stat 失败！`)
        const isFile = stat.isFile()
        const isDirectory = stat.isDirectory()
        if (isFile) {
          console.log(`${fileDir} 是文件！`)
          /**
           * 先创建文件夹与 argv 传入参数同名 process.argv[2] 获取需要生成的文件夹名
           * 判断文件夹是否已经存在，存在抛出异常
           * 将 fileDir 写入文件夹，可以加上特定参数
           */
          await makeTemplateDir(path.join(__dirname, argv[2]))
        } else if (isDirectory) {
          console.log(`${fileDir} 是文件夹！`)
          readTemplateFile(fileDir)
        }
      })
    })
  })
}

function readAndWriteFile() {
  readFile('./index.js').then(data => {
    console.log(data.toString())
    writeFile('./copy.js', data).then(data => {
      console.log('writeFile 成功！')
    })
  })
}

readTemplateFile(templateDir)
// readFile('./template').then(data => {
//   console.log(data)
// })
// makeDirPath(path.join('a.js', 'b', 'c', 'd'))

// console.log('argv', argv.slice(2, 3))

// readFile('./index.js').then(data => {
//   console.log(data.toString())
//   writeFile('./copy.js', data).then(data => {
//     console.log('writeFile 成功！')
//   })
// })

// fs.stat('feature', (err, data) => {
//   if (err) console.error(err)
//   console.log(data)
// })

// 可以复制模板文件
// 也可以自定义
// 删除文件，提示
