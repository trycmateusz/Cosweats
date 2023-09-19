<template>
  <div
    class="grid grid-cols-1 gap-5"
  >
    <TheCartProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductForCart } from '~/types/Product'
defineProps<{
  products: ProductForCart[]
}>()
</script>

<style scoped>

</style>
