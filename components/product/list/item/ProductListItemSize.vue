<template>
  <button
    class="relative uppercase px-8 py-2 rounded-full border border-borderDarkColor text-blackishMain bg-whiteishDarker focus:outline-offset-8 hover:opacity-80 focus:opacity-80 transition-opacity duration-300 disabled:opacity-30"
    :aria-selected="isActive"
    :aria-disabled="size.quantity === 0"
    :disabled="size.quantity === 0"
    @click="emit('size-change', size.value)"
  >
    {{ size.value }}
    <span
      v-if="size.quantity < 5 && size.quantity !== 0"
      title="One of the last in stock for that size"
      class="block absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-10 rounded-full border-blackishDark border bg-whiteishMain text-blackishMain aspect-square"
    >
      !
    </span>
  </button>
</template>

<script setup lang="ts">
import { ProductSizeWithQuantity } from '~/types/Product'
import type { Size } from '~/types/Size'
const emit = defineEmits<{
  (e: 'size-change', size: Size): void
}>()
defineProps<{
  size: ProductSizeWithQuantity
  isActive: boolean
}>()
</script>

<style scoped>
[aria-selected="true"] {
  @apply  bg-pinkDark text-whiteishMain
}
</style>
