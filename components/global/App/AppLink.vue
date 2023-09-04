<template>
  <NuxtLink
    :aria-label="`Link that redirects to ${link} subpage`"
    :to="link"
    class="inline-block py-[0.7em] px-[3em] rounded-full"
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
  @apply bg-whiteishMain text-blackishMain
}
</style>
