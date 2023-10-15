<template>
  <div id="content">
    <TheNavigation>
      <ShopNavigation />
    </TheNavigation>
    <AppHeader :text="headerText" />
    <main class="wrapper flex flex-col border-whiteishDarker md:flex-row 2xl:border-l">
      <ProductListFilters class="min-h-max md:w-1/2" />
      <ProductList
        class="w-full md:border-l md:border-whiteishDarker"
        :products="productStore.getProductsMatchingFilters(productStore.getProductsFrom(category))"
      />
    </main>
    <teleport to="body">
      <TheCart
        v-if="cartStore.isCartOpen"
      />
    </teleport>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { convertToTitleCaseFromCamelCase } from '~/helpers'
definePageMeta({
  middleware: ['valid-category']
})
const productStore = useProductStore()
const currencyStore = useCurrencyStore()
const cartStore = useCartStore()
const route = useRoute()
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
useHead({
  title: `Cosweats - ${convertToTitleCaseFromCamelCase(category)}`,
  meta: [
    { name: 'description', content: `Comfiest ${category} that will enhance your wardrobe! The setting doesn't matter, with our clothes you'll always look stunning!` }
  ]
})
</script>

<style scoped>

</style>
