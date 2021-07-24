module.exports = {
  ssr: false,

  /*
   ** Headers of the page
   */
  head: {
    title: "1998 Cinema Vietnam | Thông tin - Lịch chiếu - Hệ thống rạp",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["@/assets/css/custom.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/filters",
    "@/plugins/axios",
    "@/plugins/global",
    "@/plugins/currency-filter",
    "@/plugins/resizeImage",
    "@/plugins/lazyload",
    "@/plugins/element-ui",
    "@/plugins/vee-validate",
    "@/plugins/i18n",
    "@/plugins/localStorage",
    { src: "@/plugins/swiper", mode: "client" },
    { src: "@/plugins/vue-youtube-embed", mode: "client" }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "@nuxtjs/recaptcha",
      {
        hideBadge: true,
        siteKey: "6LfFz2YaAAAAAGdoJ-31eNp_QLyY5oJLNqEsth6C", // Site key for requests
        version: 2, // Version
        size: "invisible"
      }
    ],
    "nuxt-svg-loader",
    "nuxt-webfontloader",
    "vue-scrollto/nuxt",
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
    [
      "nuxt-i18n",
      {
        locales: [
          {
            code: "vi",
            name: "Tiếng Việt",
            file: "vi-VN.js"
          },
          {
            code: "en",
            name: "English",
            file: "en-US.js"
          }
        ],
        defaultLocale: "vi",
        lazy: true,
        langDir: "lang/",
        detectBrowserLanguage: false
      }
    ]
  ],
  webfontloader: {
    google: {
      families: [
        "Mulish:300,300i,400,400i,600,600i,700,700i,800,800i,900i,900&display=swap"
      ] //Loads Lato font with weights 400 and 700
    }
  },
  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false } // Disables prefixing for SVG IDs
      ]
    }
  },
  buildModules: [
    // Simple usage
    "@nuxtjs/dotenv",
    "@nuxtjs/moment"
  ],
  moment: {
    locales: ["vi"]
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    icons: true
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_ENDPOINT
  },
  router: {
    middleware: "anonymous"
  },
  //serverMiddleware: ["redirect-ssl"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));
    //
    //   svgRule.test = /\.(png|jpe?g|gif|webp)$/;
    //
    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ["babel-loader", "vue-svg-loader"]
    //   });
    // }
  }
};

// mix-blend-mode:screen
