<template>
  <button
    class="w-max py-[0.7em] px-[3em] rounded-full focus:outline-offset-8 hover:opacity-90 focus:opacity-90 transition-opacity duration-300"
    :class="[styleType]"
  >
    {{ text }}
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  styleType: 'primary' | 'secondary' | 'tertiary'
  text: string
}>()
</script>

<style lang="scss" scoped>
.primary {
  @apply bg-blackishMain text-whiteishMain
}
.secondary {
  @apply bg-whiteishMain text-blackishMain border-blackishMain border
}
.tertiary {
  @apply bg-whiteishMain border-whiteishDarker border-2
}
</style>
