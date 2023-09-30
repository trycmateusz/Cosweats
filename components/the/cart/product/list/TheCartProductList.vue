<template>
  <div>
    <TheCartProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      :checkout="checkout"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductForCart } from '~/types/Product'
defineProps<{
  products: ProductForCart[]
  checkout: boolean
}>()
</script>

<style scoped>

</style>
