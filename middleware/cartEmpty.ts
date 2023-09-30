export default defineNuxtRouteMiddleware(() => {
  const cartStore = useCartStore()
  if (!cartStore.hasProducts()) {
    return navigateTo({ name: 'shop' })
  }
})
