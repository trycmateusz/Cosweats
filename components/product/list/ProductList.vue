<template>
  <div class="flex flex-col gap-5 p-5 bg-whiteishMain sm:p-8">
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
