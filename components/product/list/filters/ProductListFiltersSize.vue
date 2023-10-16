<template>
  <div
    class="flex gap-2 items-center p-5 bg-whiteishDarker text-left border-t border-whiteishMain cursor-pointer sm:p-8"
    @click="emit('toggle-filter', size)"
  >
    <label :for="inputId">
      {{ size }}
    </label>
    <input
      :id="inputId"
      :checked="isChecked"
      type="checkbox"
      class="pointer-events-none w-5 h-5 border border-blackishDark bg-white checked:bg-pinkDark"
    >
  </div>
</template>

<script setup lang="ts">
import type { Size } from '~/types/Size'
const emit = defineEmits<{
  (e: 'toggle-filter', size: Size): void
}>()
const props = defineProps<{
  size: Size
  isChecked: boolean
}>()
const inputId = computed(() => {
  return `size-${props.size}`
})
</script>

<style scoped>
input[type="checkbox"]{
  -webkit-appearance: none;
  appearance: none;
}
</style>
