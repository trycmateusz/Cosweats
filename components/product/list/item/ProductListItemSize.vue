<template>
  <button
    class="uppercase px-8 py-2 rounded-full border border-borderDarkColor text-blackishMain bg-whiteishDarker"
    :class="{ 'size-active': isActive }"
    @click="productStore.setActiveSize(size)"
  >
    {{ size }}
  </button>
</template>

<script setup lang="ts">
import type { Size } from '~/types/Size'
import { useProductStore } from '~/stores/ProductStore'
const productStore = useProductStore()
defineProps<{
  size: Size
  isActive: boolean
}>()
</script>

<style scoped>
.size-active {
  @apply  bg-pinkDark text-whiteishMain
}
</style>
