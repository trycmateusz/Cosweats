// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/eslint-module',
  ],
  typescript: {
    strict: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/sass/abstracts" as *;'
        }
      }
    }
  },
  css: ['~/assets/sass/main.scss']
})
