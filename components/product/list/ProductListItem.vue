<template>
  <div class="flex flex-col gap-5 p-5 text-3xl bg-whiteishDarker sm:p-8">
    <div>
      <img :src="activePhotoURL" alt="" class="p-5 w-full bg-white sm:p-8">
    </div>
    <div class="flex justify-between gap-8">
      <p>{{ product.name }}</p>
      <p class="text-right">
        {{ priceToShow }}
      </p>
    </div>
    <AppButton
      class="ml-auto"
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
  return props.product.photoURLs.find(url => url.includes(`${props.product.nameKebab}-${activeColor.value}`))
})
const priceToShow = computed(() => {
  if (currencyStore.current) {
    return `${Math.floor(props.product.priceInCents * currencyStore.current.ratio) / 100} ${currencyStore.current.symbol}`
  } else {
    return ''
  }
})
</script>

<style scoped>

</style>
