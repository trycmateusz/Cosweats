import { fetchCollection } from '~/services/fetch'

export default defineNuxtRouteMiddleware(async (to) => {
  const categories = await fetchCollection('categories')
  if (!categories) {
    throw createError({ statusCode: 404, statusMessage: 'Page not Found, try again later.' })
  }
  const routeCategory = to.path.split('/')[2]
  if (!categories?.includes(routeCategory)) {
    throw createError({ statusCode: 404, statusMessage: `Page not Found: ${to.path}` })
  }
})
