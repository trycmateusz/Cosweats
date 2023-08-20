<template>
  <div>
    <button
      v-if="!link"
      class="py-[0.7em] px-[3em] rounded-full"
      :class="[style]"
    >
      {{ text }}
    </button>
    <NuxtLink
      v-else
      :aria-label="`Link that redirects to ${link} subpage`"
      :to="link"
      class="inline-block py-[0.7em] px-[3em] rounded-full"
      :class="[style]"
    >
      {{ text }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  style: 'primary' | 'secondary'
  text: string
  link?: string
}>()
</script>

<style lang="scss" scoped>
.primary {
  background-color: $main-blackish;
  color: $whiteish-main;
}
.secondary {
  background-color: $whiteish-main;
  color: $main-blackish;
}
</style>
