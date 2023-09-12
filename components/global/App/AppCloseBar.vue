<template>
  <div class="flex justify-end border-b border-whiteishDarker">
    <button
      :aria-label="`Button to close overlay of ${parentLabel}`"
      class="close-btn sticky top-0 p-5 sm:p-8 sm:-mt-8 sm:-mr-8"
      @click="emit('close')"
    >
      <img src="~/assets/img/x.svg" alt="">
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  parentLabel: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>

</style>
