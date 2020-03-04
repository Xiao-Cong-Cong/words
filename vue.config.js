const webpack = require('webpack')

module.exports = {
    lintOnSave: true,
   
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3030',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      }
    }
  }