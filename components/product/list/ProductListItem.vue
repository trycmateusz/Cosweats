<template>
  <div class="flex flex-col gap-5 p-5 text-3xl bg-whiteishDarker sm:p-8 sm:gap-8">
    <div>
      <img :src="activePhotoURL" :alt="activePhotoAlt" class="p-5 w-full bg-white sm:p-8">
    </div>
    <div class="flex gap-5 mb-5 h-[12.5vh] min-h-[70px] w-full overflow-x-scroll sm:gap-8 sm:mb-8">
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
          @click="activeColor = color"
        >
      </div>
    </div>
    <div class="flex justify-between gap-8">
      <p>{{ product.name }}</p>
      <p class="flex flex-col text-right sm:flex-row sm:gap-2 md:flex-col md:gap-0">
        <span>
          {{ priceToShow }}
        </span>
        <span v-if="currencyStore.current">
          {{ currencyStore.current.symbol }}
        </span>
      </p>
    </div>
    <AppButton
      class="mt-auto ml-auto"
      style-type="primary"
      text="Add to Cart"
      :label="`Add ${product.name} to cart`"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
import type { Color } from '~/types/Color'
import { useCurrencyStore } from '~/stores/CurrencyStore'
const props = defineProps<{
  product: Product
}>()
const currencyStore = useCurrencyStore()
const activeColor = ref<Color>(props.product.colors[0])
const activePhotoURL = computed(() => {
  return props.product.photoURLs[activeColor.value]
})
const activePhotoAlt = ref(`${props.product.name} in ${activeColor}`)
const priceToShow = computed(() => {
  if (currencyStore.current) {
    return `${Math.floor(props.product.priceInCents * currencyStore.current.ratio) / 100}`
  } else {
    return ''
  }
})
</script>

<style lang="scss" scoped>
</style>
