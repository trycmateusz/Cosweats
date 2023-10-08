<template>
  <div class="bg-blackishMain">
    <footer class="wrapper flex flex-col gap-5 p-5 text-2xl  text-center text-whiteishMain sm:p-8 sm:gap-8 md:flex-row md:items-center md:justify-between">
      <AppGlow
        class="flex-grow block text-5xl mt-5 sm:mt-8 md:mt-0 md:mr-8 lg:text-7xl"
        glow="dark"
      >
        Cosweats
      </AppGlow>
      <div class="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-8">
        <div class="flex flex-col gap-5 sm:gap-8">
          <span class="text-3xl">
            Contact
          </span>
          <ul class="list-none">
            <li>Customer service <a href="#" class="underline text-whiteishDarker hover:opacity-80 transition-opacity">123 123 123</a></li>
            <li>Aisha Atta CEO <a href="#" class="underline text-whiteishDarker hover:opacity-80 transition-opacity">123 123 123</a></li>
            <li><a href="#" class="underline text-whiteishDarker hover:opacity-80 transition-opacity">cosweats@business.com</a></li>
          </ul>
        </div>
        <div class="flex flex-col gap-5 sm:gap-8 md:flex-shrink">
          <span class="text-3xl">
            Info
          </span>
          <ul class="list-none">
            <li><a href="#" class="text-whiteishDarker hover:opacity-80 transition-opacity">Returns</a></li>
            <li><a href="#" class="text-whiteishDarker hover:opacity-80 transition-opacity">Shipping</a></li>
            <li><a href="#" class="text-whiteishDarker hover:opacity-80 transition-opacity">Privacy policy</a></li>
            <li><a href="#" class="text-whiteishDarker hover:opacity-80 transition-opacity">Cookies</a></li>
            <li><a href="#" class="text-whiteishDarker hover:opacity-80 transition-opacity">Wash & Care</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
