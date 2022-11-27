// https://nuxt.com/docs/api/configuration/nuxt-config
const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'My Apartments',
      meta: [{ name: 'description', content: 'My Apartments app' }],
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    vue: {
      reactivityTransform: true,
    },
  },
  plugins: ['~/plugins/vue-toastification.client.ts'],
  build: {
    transpile: ['vue-toastification'],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: isProd
        ? 'https://nuxt-example-api.onrender.com/api'
        : 'http://localhost:3001',
    },
  },
})
