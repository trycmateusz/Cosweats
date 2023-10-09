<template>
  <NuxtLink
    :to="link"
    class="inline-block py-[0.7em] px-[3em] max-w-max rounded-full text-center hover:opacity-90 focus:opacity-90 transition-opacity"
    :class="[styleType]"
  >
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  styleType: 'primary' | 'secondary'
  text: string
  link: string
}>()
</script>

<style scoped>
.primary {
  @apply bg-blackishMain text-whiteishMain
}
.secondary {
  @apply bg-whiteishMain text-blackishMain border-blackishMain border
}
</style>
