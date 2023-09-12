<template>
  <div v-if="products.length > 0">
    siema
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
