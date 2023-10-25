<template>
  <ul v-if="products.length > 0" class="grid grid-cols-1 gap-5 p-5 bg-whiteishMain sm:p-8 sm:gap-8 lg:grid-cols-2">
    <li
      v-for="product in products"
      :key="product.id"
    >
      <ProductListItem :product="product" />
    </li>
  </ul>
  <p v-else class="flex flex-col gap-5 p-5 sm:p-8 sm:gap-8">
    <span class="text-3xl">Unfortunately,</span>
    <span class="text-xl">No products matching criteria found.<br> Please, try some other filters or refresh the page.</span>
  </p>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
defineProps<{
  products: Product[]
}>()
</script>

<style scoped>

</style>
