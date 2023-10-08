<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { createStatusError } = useStatusError()
const routes = router.getRoutes().map(route => route.name)
router.beforeEach((to) => {
  console.log('haha')
  if (!to.name || !routes.includes(to.name)) {
    createStatusError(404, 'page not found')
  }
})
console.log(`! navigating to ${route.path} !`)
</script>
