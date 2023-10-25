<template>
  <div class="sticky top-0 text-2xl font-halibutSerifRegular bg-blackishDark text-whiteishMain z-40">
    <nav class="links wrapper flex justify-between items-center">
      <a
        href="#"
        class="inline-block px-5 py-5 sm:px-8"
      >
        Cosweats
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
    name: 'Shop',
    to: '/'
  },
  {
    id: Math.random(),
    name: 'About',
    to: '/about'
  }
]
</script>

<style scoped>

</style>
