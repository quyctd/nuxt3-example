// https://nuxt.com/docs/api/configuration/nuxt-config
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
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.APP_BASE_API_URL || 'http://localhost:3001',
    },
  },
})
