<template>
  <div>
    <TheNavigation>
      <ShopNavigation />
    </TheNavigation>
    <ShopHeader :text="headerText" />
    <div>
      <ProductList />
    </div>
  </div>
</template>

<script setup lang="ts">
const currencyStore = useCurrencyStore()
// const productStore = useProductStore()
const route = useRoute()
const headerText = computed(() => {
  if (route.path === '/shop') {
    return 'Cosweats'
  } else {
    return route.path.split('')[2]
  }
})

await currencyStore.fetchAll()
currencyStore.setCurrent(currencyStore.currencies[0])
// productStore.fetchAll()

</script>

<style scoped>

</style>
