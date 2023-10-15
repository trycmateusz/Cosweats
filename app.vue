<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
router.beforeEach((to, from) => {
  if (to.path !== from.path) {
    cartStore.closeCart()
    productStore.setFilters(null)
    productStore.setSort(null)
  }
})
</script>
