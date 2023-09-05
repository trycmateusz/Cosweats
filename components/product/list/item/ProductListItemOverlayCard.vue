<template>
  <div class="overlay flex gap-5 mb-5 h-[12.5vh] min-h-[70px] w-full overflow-x-scroll sm:gap-8 sm:mb-8">
    <div
      v-for="(url, color) in product.photoURLs"
      :key="color"
      class="relative border-b-0 aspect-square bg-white p-2 sm:p-4"
      :class="{ 'border-borderDarkColor': url === activePhotoURL, 'border': url === activePhotoURL }"
    >
      <ClientOnly>
        <div
          class="shadow absolute top-0 left-0 w-full h-full opacity-50 bg-blackishMain"
          :class="{ 'hidden': url === activePhotoURL }"
        />
      </ClientOnly>
      <img
        class="relative h-full"
        :src="url"
        :alt="`${product.name} in ${color}`"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Color'
import type { Product } from '~/types/Product'
defineProps<{
  product: Product
  isActive: boolean
  activePhotoURL: string
  activeColor: Color
}>()
</script>

<style scoped>

</style>
