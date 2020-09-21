module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/hce': {
        target: ' http://10.0.0.198:5009',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/hce': 'hce'
        }
      }
    }
  }
}
