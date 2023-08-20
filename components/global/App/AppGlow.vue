<template>
  <span
    class="glow-box relative inline-block"
  >
    <span>
      <slot />
    </span>

    <span
      class="glow absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[200%] h-[160%] z-[-1] blur"
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
$dark-glow: radial-gradient(closest-side, rgba(#deb7a9, .8), transparent);
$light-glow: radial-gradient(closest-side, #382E2B, transparent);
.dark {
  background: $dark-glow;
}
.light {
  background: $light-glow;
}
</style>
