const fs = require('fs');
const path = require('path');
const getFile = (prefixPath) => {
  return fs.readdirSync(path.join(process.cwd(), prefixPath))
           .map(item => `${prefixPath}/${item.replace('.md', '')}`)
}

/**生成侧边栏信息 */
const createSideBarConfig = (title, prefixPath, collapsable = true) => {
  return  {
    title,
    collapsable,
    children: getFile(prefixPath)
  }
}

module.exports = {
  createSideBarConfig
}