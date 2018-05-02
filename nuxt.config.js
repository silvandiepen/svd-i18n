const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "i18n",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", "content": "width=device-width, initial-scale=1" },
      { hid: "description", "name": "description", "content": "Easy translate i18n files" },
      { name: "msapplication-TileColor", "content": "#ffffff" },
      {
        name: "msapplication-TileImage",
        content: "/favicon/ms-icon-144x144.png"
      },
      { name: "theme-color", "content": "#ffffff" }
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    {
      src: "~assets/scss/app.scss",
      lang: "scss"
    }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [    {
      src: "~/plugins/svd-vue-components"
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-rfg-icon',
    '@nuxtjs/manifest',
  ],

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        "postcss-cssnext": {
          browsers: ["last 2 versions", "ie >= 9"],
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
