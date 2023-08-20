<template>
  <nav class="sticky top-0 text-3xl font-halibutSerifRegular bg-blackishDark text-whiteishMain z-40">
    <div class="links wrapper flex justify-between items-center">
      <a
        aria-label="Redirect to top of the page"
        href="#"
        class="inline-block p-8"
      >
        CS
      </a>
      <div class="flex">
        <NuxtLink
          class="p-8"
          to="/shop"
        >
          Shop
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
console.log('123')
</script>

<style scoped>

</style>
