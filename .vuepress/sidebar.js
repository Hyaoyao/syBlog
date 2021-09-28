// module.exports = {
//   "/docs/java/":[
//     'java',
//     'test',
//   ]
// }


const { createSideBarConfig } = require('./utils')
const JAVA_PATH = '/docs/java'
const DATABASE_PATH = '/docs/database'


module.exports = {
  [JAVA_PATH]: [createSideBarConfig('java', JAVA_PATH)],
  [DATABASE_PATH]: [createSideBarConfig('demo', DATABASE_PATH)],
}