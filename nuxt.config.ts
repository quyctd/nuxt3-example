// https://nuxt.com/docs/api/configuration/nuxt-config
const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
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
        ? 'https://nuxt3-example-api.vercel.app/api'
        : 'http://localhost:3001',
    },
  },
})
