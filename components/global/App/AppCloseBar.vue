<template>
  <div class="relative flex justify-end">
    <div
      class="absolute left-1/2 w-[100vw] h-full border-b border-whiteishDarker -translate-x-1/2"
      :class="{ 'border-whiteishMain': lightBorder }"
    />
    <button
      :data-dynamic-element-parent-id="dynamicElementParentId"
      class="close-btn sticky top-0 p-5 sm:p-8"
      @click.prevent="emit('close')"
    >
      <img v-if="!isBin" class="text-xl w-[1.4em] h-[1.4em] pointer-events-none" src="~/assets/img/x.svg" :alt="buttonLabel">
      <img v-else class="text-xl w-[1.6em] h-[1.6em] pointer-events-none" src="~/assets/img/bin.svg" :alt="buttonLabel">
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  buttonLabel: string
  isBin?: boolean
  lightBorder?: boolean
  dynamicElementParentId?: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>

</style>
