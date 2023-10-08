<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log(`! navigating to ${route.path} !`)
</script>
