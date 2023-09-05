<template>
  <div class="wrapper grid grid-cols-1 gap-5 p-5 bg-whiteishMain sm:p-8 sm:gap-8 md:grid-cols-2">
    <div
      v-for="product in productCategory"
      :key="product.id"
    >
      <ProductListItem :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
defineProps<{
  productCategory: Product[]
}>()
</script>

<style scoped>

</style>
