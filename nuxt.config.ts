// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      cityApiKey: process.env.API_NINJAS_API_KEY
    }
  },
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs']
    }]
  ],
  pages: true,
  routeRules: {
    '/checkout': { ssr: false },
    '/error': { ssr: false }
  },
  imports: {
    dirs: ['stores']
  },
  typescript: {
    strict: true
  },
  /* tslint:disable-next-line */
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
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
