<template>
  <div>
    <div v-for="product in productStore.products" :key="product.id">
      {{ product.photos }}
    </div>
  </div>
</template>

<script setup lang="ts">
const productStore = useProductStore()
</script>

<style scoped>

</style>
