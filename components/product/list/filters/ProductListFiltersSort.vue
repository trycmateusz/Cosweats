<template>
  <div
    class="flex gap-2 items-center p-5 bg-whiteishDarker text-left border-t border-whiteishMain cursor-pointer sm:p-8"
    @click="emit('change-sort', sort)"
  >
    <label :for="sort">
      {{ text }}
    </label>
    <input
      :id="sort"
      :checked="isChecked"
      type="checkbox"
      class="pointer-events-none rounded-full w-5 h-5 border border-blackishDark bg-white checked:bg-pinkDark"
    >
  </div>
</template>

<script setup lang="ts">
import type { ProductSort } from '~/types/Product'
defineProps<{
  sort: ProductSort
  text: string
  isChecked: boolean
}>()
const emit = defineEmits<{
  (e: 'change-sort', sort: ProductSort): void
}>()
</script>

<style scoped>
input[type="checkbox"]{
  -webkit-appearance: none;
  appearance: none;
}
</style>
