<template>
  <div class="flex flex-col gap-10 p-5 text-3xl bg-whiteishDarker sm:p-8 sm:gap-8">
    <div>
      <img :src="activePhotoURL" :alt="activePhotoAlt" class="p-5 w-full bg-white sm:p-8">
    </div>
    <p class="flex justify-between gap-8 font-bold">
      <span>{{ product.name }}</span>
      <span class="flex flex-col text-right sm:flex-row sm:gap-2 md:flex-col md:gap-0">
        <span>
          {{ priceToShow }}
        </span>
        <span v-if="currencyStore.current">
          {{ currencyStore.current.symbol }}
        </span>
      </span>
    </p>
    <p>
      {{ product.description }}
    </p>
    <AppButton
      class="mt-auto ml-auto"
      style-type="primary"
      text="Take a look"
      :label="`Open ${product.name} product info card`"
    />
    <teleport to="body">
      <ProductListItemOverlay :is-active="isOverlayActive" :active-photo-url="activePhotoURL" :active-color="activeColor" :product="product" />
    </teleport>
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
const activePhotoAlt = ref(`${props.product.name} in ${activeColor}`)
const isOverlayActive = ref(false)
const activePhotoURL = computed(() => {
  return props.product.photoURLs[activeColor.value]
})
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
