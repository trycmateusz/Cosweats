<template>
  <button
    class="px-8 py-2 rounded-full border border-borderDarkColor focus:outline-offset-8 hover:opacity-80 focus:opacity-80 transition-opacity duration-300"
    :aria-selected="isActive"
    @click="emit('color-change', color)"
  >
    {{ color }}
  </button>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Color'
defineProps<{
  color: Color
  isActive: boolean
}>()
const emit = defineEmits<{
  (e: 'color-change', color: Color): void
}>()
</script>

<style lang="scss" scoped>
[aria-selected="true"] {
  @apply  bg-pinkDark text-whiteishMain
}
</style>
