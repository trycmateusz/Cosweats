<template>
  <div>
    <NavigationMain>
      <NavigationShop />
    </NavigationMain>
  </div>
</template>

<script setup lang="ts">
const { currencies, setCurrentCurrency, fetchAll: fetchAllCurrencies } = useCurrencyStore()
onMounted(async () => {
  await fetchAllCurrencies()
  setCurrentCurrency(currencies[0])
})
</script>

<style scoped>

</style>
