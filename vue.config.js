module.exports = {
  devServer: {
    proxy: {
      "/innerApi": {
        target: "http://test-ant.mayi888.cn/",
        changeOrigin: true
      }
    }
  }
};
