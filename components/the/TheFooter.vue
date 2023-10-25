<template>
  <div class="bg-blackishMain overflow-hidden">
    <footer class="wrapper flex flex-col gap-5 p-5 text-xl  text-center text-whiteishMain sm:p-8 sm:gap-8 md:flex-row md:items-center md:justify-between">
      <AppGlow
        class="flex-grow block text-4xl mt-5 sm:mt-8 md:mt-0 md:mr-8 lg:text-6xl"
        glow="dark"
      >
        Cosweats
      </AppGlow>
      <div class="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-8">
        <div class="flex flex-col gap-5 sm:gap-8">
          <h2 class="text-2xl">
            Contact
          </h2>
          <ul class="list-none">
            <li>Customer service <a href="#" class="underline text-whiteishDarker hover:opacity-80 transition-opacity duration-300">123 123 123</a></li>
            <li>Aisha Atta CEO <a href="#" class="underline text-whiteishDarker hover:opacity-80 transition-opacity duration-300">123 123 123</a></li>
            <li><a href="#" class="underline text-whiteishDarker hover:opacity-80 transition-opacity duration-300">cosweats@business.com</a></li>
          </ul>
        </div>
        <div class="flex flex-col gap-5 sm:gap-8 md:flex-shrink">
          <h2 class="text-2xl">
            Info
          </h2>
          <ul class="list-none">
            <li v-for="link in infoLinks" :key="link">
              <a
                class="text-whiteishDarker hover:opacity-80 transition-opacity duration-300"
                @click="alertUser(link)"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const infoLinks = ['Returns', 'Shipping', 'Privacy Policy', 'Cookies', 'Wash & Care']
let alertUser: Function
onMounted(() => {
  alertUser = (link: string) => {
    alert(`${link} not implemented, for example only.`)
  }
})
</script>

<style scoped>

</style>
