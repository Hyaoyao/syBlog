module.exports = {
  title: 'Lenkidu',
  description: 'Lenkidu',
  base: '/',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // 导航栏设置
    nav: require('./nav.js'),
    sidebar:require('./sidebar.js')
  }
}