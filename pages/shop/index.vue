<template>
  <div id="content">
    <TheNavigation>
      <ShopNavigation @open-cart="isCartActive = true" />
    </TheNavigation>
    <AppHeader text="Cosweats" />
    <main>
      <ProductList :products="productStore.products" />
    </main>
    <TheFooter />
    <teleport to="body">
      <TheCart
        v-if="isCartActive"
        @close="isCartActive = false"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
const currencyStore = useCurrencyStore()
const productStore = useProductStore()
const route = useRoute()
const isCartActive = ref(false)
const initialQueryItemId = route.query.itemId
provide('initialQueryItemId', initialQueryItemId)
await currencyStore.fetchAll()
productStore.fetchAll()
</script>

<style scoped>

</style>
