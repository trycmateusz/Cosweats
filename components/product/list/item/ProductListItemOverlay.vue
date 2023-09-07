<template>
  <div class="bg-productItemOverlayBackground">
    <div class="overlay wrapper flex flex-col gap-5 fixed top-0 left-0 right-0 p-5 w-full h-full bg-whiteishMain z-50 overflow-y-scroll sm:p-8 sm:gap-8">
      <ClientOnly>
        <div class="flex justify-end mb-8 border-b border-grayLight">
          <button
            :aria-label="`Button to close overlay of ${product.name}`"
            class="close-btn p-5 -mt-5 -mr-5 sm:p-8 sm:-mt-8 sm:-mr-8"
            @click="emit('close')"
          >
            <img src="~/assets/img/x.svg" alt="">
          </button>
        </div>
      </ClientOnly>
      <div ref="activeImageContainer" class="grid grid-cols-1 w-full gap-5 sm:gap-8 sm:grid-cols-[1fr_auto]">
        <ClientOnly>
          <div class="flex justify-center items-center w-full bg-white p-5 aspect-square sm:p-8">
            <img :src="activePhotoUrl" :alt="activePhotoAlt" class="w-full">
          </div>
        </ClientOnly>
        <div ref="colorImagesContainer" class="relative w-full sm:w-[30vw] sm:min-w-[120px]">
          <div class="flex gap-5 max-w-full h-full min-h-[150px] overflow-x-scroll sm:flex-col sm:gap-8 sm:absolute sm:w-max sm:overflow-x-hidden sm:overflow-y-scroll">
            <div
              v-for="(url, color) in product.photoUrls"
              :key="color"
              class=" border-b-0 border-white border bg-white p-2 aspect-square sm:p-4 sm:border-b sm:border-r-0"
              :class="{ 'active-border': url === activePhotoUrl }"
            >
              <img
                :src="url"
                :alt="`${product.name} in ${color}`"
                class="w-full h-full aspect-square"
                @click="emit('chooseColor', color)"
              >
            </div>
          </div>
        </div>
      </div>
      <ClientOnly>
        <ProductListItemInfo :product="product" />
        <div class="mt-5 mb-5">
          <span class="block mb-5 font-bold text-2xl">Choose a size:</span>
          <div class="flex flex-wrap gap-5 sm:gap-8 text-3xl">
            <ProductListItemSize
              v-for="(size, index) in product.sizes"
              :key="index"
              :size="size"
              :is-active="size === activeSize"
              @choose-size="emit('chooseSize', size)"
            />
          </div>
        </div>
        <AppButton class="ml-auto text-3xl" style-type="primary" text="Add to cart" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'
import type { Product } from '~/types/Product'
defineProps<{
  product: Product
  activePhotoUrl: string
  activePhotoAlt: string
  activeColor: Color
  activeSize: Size
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'chooseColor', color: Color): void
  (e: 'chooseSize', size: Size): void
}>()
</script>

<style scoped>
.active-border {
  @apply border-borderDarkColor !important
}
</style>
