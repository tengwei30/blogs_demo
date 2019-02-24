const inquirer = require('inquirer')
const fuzzy = require('fuzzy')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const shell = require('shelljs')
const PUBLIC_PATH = require('./pages')

shell.exec('clear')

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'))

const allPages = []
glob.sync(`${PUBLIC_PATH.NORMAL_PAGE_PATH}/**/app.js`).forEach((entry) => {
  const basename = path.basename(entry, path.extname(entry))
  const tmp = entry.split('/').splice(-2) // 页面文件夹名字
  const folderName = tmp[0]
  allPages.push(folderName)
})

console.log(chalk.green('请选择您需要调试的页面（多选）：'))
console.log(chalk.yellow('操作说明：'))
console.log(chalk.yellow('空格：选中'))
console.log(chalk.yellow('上下：选择页面'))
console.log(chalk.yellow('回车：确定'))

inquirer.prompt({
  type: 'checkbox-plus',
  name: 'pages',
  message: '选择开发页面',
  pageSize: 10,
  highlight: true,
  searchable: true,
  default: [],
  source: function(answersSoFar, input) {
    input = input || ''
    return new Promise(function(resolve) {
      var fuzzyResult = fuzzy.filter(input, allPages)
      var data = fuzzyResult.map(function(element) {
        return element.original
      })
      resolve(data)
    })
  }
}).then((answers) => {
  const pages = answers.pages
  if (pages.length === 0) {
    console.log(chalk.red('您没有选择任何页面!'))
    return
  }
  const globMatch = `@(${pages.join('|')})`
  console.log(chalk.green('您选择了：'))
  console.log(pages)
  global.SELECT_PAGES = globMatch
  shell.exec('npm run dev')
}).catch(err => {
  console.error(err)
})


