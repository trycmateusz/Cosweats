<template>
  <div class="flex gap-4 items-center">
    <button class="button" @click="productStore.changeActiveQuantityBy(-1)">
      -
    </button>
    <span class="block w-12 text-4xl text-center">
      {{ showQuantity }}
    </span>
    <button class="button" @click="productStore.changeActiveQuantityBy(1)">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/ProductStore'
const productStore = useProductStore()
const showQuantity = computed(() => {
  if (productStore.active) {
    return productStore.active.quantity
  } else {
    return 1
  }
})
</script>

<style scoped>
.button {
  @apply px-8 py-2 text-3xl rounded-full border border-borderDarkColor bg-whiteishDarker
}
</style>
