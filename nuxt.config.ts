// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs']
    }]
  ],
  pages: true,
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
  css: ['~/assets/sass/main.scss'],
  routeRules: {
    '/': { static: true }
  }
})
