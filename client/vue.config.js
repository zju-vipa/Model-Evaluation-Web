// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    // remUnit: 14 代表 1rem = 14px; 所以当你一个14px值时，它会自动转成 (14px/14)rem
    remUnit: 16
})

//svg-sprite-loader
const path = require('path')
 
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
    // 项目部署的基础路径
    // 我们默认你的应用将会部署在域名的根部，比如 https://www.xxx.com/
    // 如果你的应用时部署在一个子路径下，那么你需要在这里指定子路径。
    // 比如，如果你的应用部署在https://www.xxx.com/public/
    // 那么将这个值改为 `/public/`
    // 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    css: {
        loaderOptions: {
            // scss: {
            //     javascriptEnable: true
            // },
            postcss: {
                plugins: [postcss]
            }
        }
    },

    chainWebpack (config) {
        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugin('html').tap(args => {
            args[0].title= 'Model Evaluation'
            return args
        })
        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/assets/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/assets/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
    },

    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 这两个配置主要用于解决ws跨域的问题 */
        allowedHosts: ["model.vipa.work"],
        headers: {
          'Access-Control-Allow-Origin': '*'
        },

        /* 自动打开浏览器 */
        open: false,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8066,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: { // string | Object
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://127.0.0.1:8090/',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite: {
                    '^/api': "" //规定请求地址以什么作为开头
                }
            },

        },
    },
}
