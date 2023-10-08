import { fetchCollection } from '~/services/fetch'

export default defineNuxtRouteMiddleware(async (to) => {
  const categories = await fetchCollection('categories')
  const { createStatusError } = useStatusError()
  if (!categories) {
    createStatusError(404, 'page not found')
  }
  const routeCategory = to.path.split('/')[2]
  if (!categories?.includes(routeCategory)) {
    createStatusError(404, 'page not found')
  }
})
