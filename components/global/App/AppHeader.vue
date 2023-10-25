<template>
  <header class="flex justify-center items-center p-16 bg-blackishDark text-whiteishMain text-6xl md:text-8xl first-letter:uppercase overflow-hidden">
    <h1>
      <AppGlow glow="dark">
        <span class="relative z-20">
          {{ text }}
        </span>
      </AppGlow>
    </h1>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style scoped>

</style>
