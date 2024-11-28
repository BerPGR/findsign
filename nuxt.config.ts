// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  srcDir: 'src/',
  typescript: { shim: false },

  app: {
    /* https://nuxt.com/docs/getting-started/transitions */
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    }
  },

  /* https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens */
  runtimeConfig: {
    public: {
      backend_url: process.env.BACKEND_URL || 'https://signacle.duckdns.org:1246'
    }
  },

  /* Estilos gerais (https://nuxt.com/docs/getting-started/styling#using-preprocessors) */
  css: ['~/assets/scss/main.scss', '~/assets/scss/fonts.scss'],

  modules: [
    '@pinia/nuxt',
  ],

  vite: {
    // preprocessors
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    },
  },

  devServer: {
    host: 'https://127.0.0.1'
  },

  compatibilityDate: '2024-11-18',
})