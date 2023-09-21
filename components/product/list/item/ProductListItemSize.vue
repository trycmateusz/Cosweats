<template>
  <button
    class="uppercase px-8 py-2 rounded-full border border-borderDarkColor text-blackishMain bg-whiteishDarker"
    :aria-selected="isActive"
    @click="emit('size-change', size)"
  >
    {{ size }}
  </button>
</template>

<script setup lang="ts">
import type { Size } from '~/types/Size'
const emit = defineEmits<{
  (e: 'size-change', size: Size): void
}>()
defineProps<{
  size: Size
  isActive: boolean
}>()
</script>

<style scoped>
[aria-selected="true"] {
  @apply  bg-pinkDark text-whiteishMain
}
</style>
