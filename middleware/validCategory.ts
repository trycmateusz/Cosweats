import { fetchCollection } from '~/services/fetch'

export default defineNuxtRouteMiddleware(async (to) => {
  const categories = await fetchCollection('categories')
  if (!categories) {
    return navigateTo('/shop')
  }
  const routeCategory = to.path.split('/')[2]
  if (!categories?.includes(routeCategory)) {
    console.log(categories?.includes(routeCategory))
    return navigateTo('/shop')
  }
})
