<template>
  <main>
    <TheNavigation>
      <ShopNavigation @open-cart="isCartActive = true" />
    </TheNavigation>
    <AppHeader text="Cosweats" />
    <div>
      <ProductList :products="productStore.products" />
    </div>
    <teleport to="body">
      <TheCart
        v-if="isCartActive"
        @close="isCartActive = false"
      />
    </teleport>
  </main>
</template>

<script setup lang="ts">
const currencyStore = useCurrencyStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const isCartActive = ref(false)
const initialQueryItemId = route.query.itemId
provide('initialQueryItemId', initialQueryItemId)
await currencyStore.fetchAll()
currencyStore.setCurrent(currencyStore.currencies[0])
productStore.fetchAll()
if (productStore.products[0]) {
  cartStore.addOne({
    ...productStore.products[0],
    size: 'xs',
    color: 'black'
  })
}

</script>

<style scoped>

</style>
