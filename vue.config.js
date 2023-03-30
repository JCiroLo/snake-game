module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/snake-game/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_Config.scss";'
      }
    }
  }
}
