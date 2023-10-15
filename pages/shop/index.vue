<template>
  <div id="content">
    <TheNavigation>
      <ShopNavigation />
    </TheNavigation>
    <AppHeader text="Cosweats" />
    <main class="wrapper flex flex-col border-whiteishDarker md:flex-row 2xl:border-l">
      <ProductListFilters class="md:w-1/2 min-h-max" />
      <ProductList
        class="w-full md:border-l md:border-whiteishDarker"
        :products="productStore.getProductsMatchingFilters(productStore.products)"
      />
    </main>
    <TheFooter />
    <teleport to="body">
      <TheCart
        v-if="cartStore.isCartOpen"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
const currencyStore = useCurrencyStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const initialQueryItemId = route.query.itemId
provide('initialQueryItemId', initialQueryItemId)
await currencyStore.fetchAll()
productStore.fetchAll()
useHead({
  title: 'Cosweats - Shop',
  meta: [
    { name: 'description', content: 'Clothing that all kinds of people will find pretty. Come visit and look through our shelves, I promise you\'ll find something for yourself!' }
  ]
})
</script>

<style scoped>

</style>
