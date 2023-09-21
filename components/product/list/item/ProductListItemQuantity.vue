<template>
  <div class="flex gap-4 items-center">
    <button
      class="button"
      :class="{ 'light-background': lightBackground }"
      @click="emit('change-quantity', -1)"
    >
      -
    </button>
    <span class="block w-12 text-4xl text-center">
      {{ product?.quantity }}
    </span>
    <button
      class="button"
      :class="{ 'light-background': lightBackground }"
      @click="emit('change-quantity', 1)"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProductForCart } from '~/types/Product'
defineProps<{
  product: ProductForCart | null
  lightBackground?: boolean
}>()
const emit = defineEmits<{
  (e: 'change-quantity', quantity: 1 | -1): void
}>()
</script>

<style scoped>
.button {
  @apply px-8 py-2 text-3xl rounded-full border border-borderDarkColor bg-whiteishDarker
}
.light-background {
  @apply bg-whiteishMain
}
</style>
