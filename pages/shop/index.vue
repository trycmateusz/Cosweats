<template>
  <div>
    <TheNavigation>
      <ShopNavigation @open-cart="isCartActive = true" />
    </TheNavigation>
    <ShopHeader :text="headerText" />
    <div v-for="(category, index) in productStore.categories" :key="index">
      <div>
        <ProductList :products="productStore[category]" />
      </div>
    </div>
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
const cartStore = useCartStore()
const route = useRoute()
const isCartActive = ref(false)
const headerText = computed(() => {
  if (route.path === '/shop') {
    return 'Cosweats'
  } else {
    return route.path.split('')[2]
  }
})
await currencyStore.fetchAll()
currencyStore.setCurrent(currencyStore.currencies[0])
productStore.fetchAll()
console.log('adding one product to cart...')
if (productStore.sweatshirts[0]) {
  cartStore.addOne({
    ...productStore.sweatshirts[0],
    size: 'xs',
    color: 'black',
    quantity: 1
  })
}
</script>

<style scoped>

</style>
