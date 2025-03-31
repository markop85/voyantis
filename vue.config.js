const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_BASE_URL || '/', // Set base URL for assets
  devServer: {
    proxy: 'http://localhost:5000', // Example proxy for API requests
  },
})
