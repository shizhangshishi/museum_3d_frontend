module.exports = {
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://localhost:8080",
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": ""
        }
      }
    },
    "host": "localhost",
    "port": 80,
  },
  "configureWebpack": {
    "devtool": "source-map"
  },
  "transpileDependencies": [
    "vuetify",
    'vue-echarts',
    'resize-detector'
  ]
}
