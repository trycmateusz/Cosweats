<template>
  <NuxtLink :to="to" class="px-8 py-5 border-b border-borderDarkColor first:border-t">
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  to: string
}>()
</script>

<style scoped>

</style>
