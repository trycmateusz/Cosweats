<template>
  <button
    class="uppercase px-8 py-2 rounded-full border border-borderDarkColor text-blackishMain bg-whiteishDarker"
    :class="{ 'size-active': isActive }"
    @click="emit('chooseSize', size)"
  >
    {{ size }}
  </button>
</template>

<script setup lang="ts">
import type { Size } from '~/types/Size'
defineProps<{
  size: Size
  isActive: boolean
}>()
const emit = defineEmits<{
  (e: 'chooseSize', size: Size): void
}>()
</script>

<style scoped>
.size-active {
  @apply  bg-pinkDark text-whiteishMain
}
</style>
