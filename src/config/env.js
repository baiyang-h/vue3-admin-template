// 这是一个环境文件，根据启动时生产环境还是开发环境来进行设置配置
// 所以我们想要配置环境，即可以选择.env、.env.development等，也可以选择这个config/env.js 来进行配置，通过 process.env.NODE_ENV 判断
// 需node环境才得到process.env，浏览器环境是会报错的，即在vite.config.js中可以引用，在组件中引用会报错的，组件中使用 import.meta.env

console.log('process.env', process.env)

const envs = {
  base: {
    url: 'http://xxx'
  },
  development: {
    aa: '我是development',
    bb: '你好'
  },
  production: {
    aa: '我是production'
  },
  test: {

  }
}

export default {...envs.base, ...envs[process.env.NODE_ENV]}


