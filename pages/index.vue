<template>
  <div id="content">
    <TheShop
      :products="productStore.getProductsMatchingFilters(productStore.products)"
      header-text="Cosweats"
    />
  </div>
</template>

<script setup lang="ts">
const currencyStore = useCurrencyStore()
const productStore = useProductStore()
await currencyStore.fetchAll()
productStore.fetchAll()
useHead({
  title: 'Cosweats - Shop',
  meta: [
    {
      name: 'description',
      content: 'Clothing that all kinds of people will find pretty. Come visit and look through our shelves, I promise you\'ll find something for yourself!'
    }
  ]
})
</script>

<style scoped>
.filter-button {
  padding-left: 0.7em !important;
  padding-right: 0.7em !important;
}
</style>
