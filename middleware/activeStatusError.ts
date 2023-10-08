export default defineNuxtRouteMiddleware(() => {
  const { statusError } = useStatusError()
  if (!statusError.value) {
    return navigateTo('/shop')
  }
})
