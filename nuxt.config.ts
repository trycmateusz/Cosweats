// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs']
    }],
    '@nuxtjs/strapi'
  ],
  // @ts-ignore
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },
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
