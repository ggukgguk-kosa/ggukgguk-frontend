const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
    https: {
      key: fs.readFileSync('C:/dev/openssl/private.key'),
      cert: fs.readFileSync('C:/dev/openssl/private.crt'),
      ca: fs.readFileSync('C:/dev/openssl/rootCA.pem'),
    },
    client: {
      overlay: true,
      webSocketURL: "wss://0.0.0.0:443/ws",
    },
  }
})
