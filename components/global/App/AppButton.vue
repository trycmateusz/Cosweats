<template>
  <button
    class="w-max py-[0.7em] px-[3em] rounded-full"
    :class="[styleType]"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  styleType: 'primary' | 'secondary'
  text: string
}>()
</script>

<style lang="scss" scoped>
.primary {
  @apply bg-blackishMain text-whiteishMain
}
.secondary {
  @apply bg-whiteishMain text-blackishMain
}
</style>
