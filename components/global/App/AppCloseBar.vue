<template>
  <div class="relative flex justify-end">
    <div v-if="coverAllViewportWidth" class="absolute left-1/2 w-[100vw] h-full border-b border-whiteishDarker -translate-x-1/2" />
    <button
      :data-dynamic-element-parent-id="dynamicElementParentId"
      :aria-label="parentLabel"
      class="close-btn sticky top-0 p-5 sm:p-8"
      @click.prevent="emit('close')"
    >
      <img v-if="!showBinIcon" class="text-2xl w-[1.4em] h-[1.4em] pointer-events-none" src="~/assets/img/x.svg" alt="">
      <img v-else class="text-2xl w-[1.6em] h-[1.6em] pointer-events-none" src="~/assets/img/bin.svg" alt="">
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  parentLabel: string
  showBinIcon?: boolean
  dynamicElementParentId?: string
  coverAllViewportWidth?: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>

</style>
