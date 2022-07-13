// const { defineConfig } = require('@vue/cli-service')
// const target = "https://openapi.naver.com";
module.exports = {
  devServer: {
    port: 8080,
    proxy: {
        '/v1': {
            target: "https://openapi.naver.com",
            changeOrigin: true
        }
    }
  }
  // defineConfig({
  //   transpileDependencies: [
  //     'vuetify'
  //   ]
  // })
}



