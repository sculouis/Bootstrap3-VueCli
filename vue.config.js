const webpack = require("webpack");

module.exports = {
    // 設定全域物件
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                moment: 'moment'
              })
        ]
      },
    publicPath:'./',
    devServer: {
        proxy: {
          '/api': {
            target: 'https://louis-chen-webapi.netlify.com/.netlify/functions/server',
            pathRewrite: { '^/api': '' }
          }
        }
      },
      proxyTable: {
        '/api':{                                // 要代理的接口名
        target:'https://louis-chen-webapi.netlify.com/.netlify/functions/server',   // 要代理的接口地址
        changeOrigin:true,                            // 允许跨域
        pathRewrite:{'^/api':''}            // 接口名重写
          }
        }
}