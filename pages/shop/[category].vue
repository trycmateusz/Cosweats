<template>
  <div id="content">
    <TheNavigation>
      <ShopNavigation @open-cart="isCartActive = true" />
    </TheNavigation>
    <AppHeader :text="headerText" />
    <main>
      <ProductList :products="productStore.getProductsFrom(category)" />
    </main>
    <teleport to="body">
      <TheCart
        v-if="isCartActive"
        @close="isCartActive = false"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { convertToTitleCaseFromCamelCase } from '~/helpers'
definePageMeta({
  middleware: ['valid-category']
})
const productStore = useProductStore()
const currencyStore = useCurrencyStore()
const route = useRoute()
const isCartActive = ref(false)
const category = route.path.split('/')[2]
const initialQueryItemId = route.query.itemId
provide('initialQueryItemId', initialQueryItemId)
const headerText = computed(() => {
  if (typeof route.params.category === 'string') {
    return convertToTitleCaseFromCamelCase(route.params.category)
  } else {
    return ''
  }
})
await productStore.fetchCategory(category)
await currencyStore.fetchAll()
currencyStore.setCurrent(currencyStore.currencies[0])
</script>

<style scoped>

</style>
