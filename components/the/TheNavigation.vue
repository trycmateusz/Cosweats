<template>
  <div class="sticky top-0 text-3xl font-halibutSerifRegular bg-blackishDark text-whiteishMain z-40">
    <nav class="links wrapper flex justify-between items-center">
      <a
        aria-label="Redirect to top of the page"
        href="#"
        class="inline-block px-5 py-5 sm:px-8"
      >
        CS
      </a>
      <div class="flex">
        <div v-for="link in links" :key="link.id">
          <NuxtLink
            v-if="route.path !== link.to"
            class="px-8 py-5"
            :to="link.to"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const links = [
  {
    id: Math.random(),
    name: 'Home',
    to: '/'
  },
  {
    id: Math.random(),
    name: 'Shop',
    to: '/shop'
  }
]
</script>

<style scoped>

</style>
