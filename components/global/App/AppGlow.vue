<template>
  <span
    class="glow-box relative inline-block"
  >
    <span class="relative z-20">
      <slot />
    </span>

    <span
      class="glow absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[200%] h-[160%] z-[10] blur"
      :class="[glow]"
    />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  glow: 'dark' | 'light'
}>()
</script>

<style lang="scss" scoped>
$light-glow: radial-gradient(closest-side, rgba(#deb7a9, .8), transparent);
$dark-glow: radial-gradient(closest-side, #2b2321, transparent);
.dark {
  background: $dark-glow;
}
.light {
  background: $light-glow;
}
</style>
