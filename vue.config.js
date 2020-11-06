console.log(process.env.VUE_APP_API_URL);

module.exports = {
  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        target: "https://vue.ruoyi.vip/prod-api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
