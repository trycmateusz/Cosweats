<template>
  <div
    class="flex gap-2 items-center p-5 bg-whiteishDarker text-left border-t border-whiteishMain cursor-pointer sm:p-8"
    @click="emit('toggle-filter', color)"
  >
    <label :for="inputId">
      {{ color }}
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
import type { Color } from '~/types/Color'
const emit = defineEmits<{
  (e: 'toggle-filter', color: Color): void
}>()
const props = defineProps<{
  color: Color
  isChecked: boolean
}>()
const inputId = computed(() => {
  return `color-${props.color}`
})
</script>

<style scoped>
input[type="checkbox"]{
  -webkit-appearance: none;
  appearance: none;
}
</style>
