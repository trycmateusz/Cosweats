<template>
  <div>
    <div class="flex justify-between mb-10 gap-8 text-2xl font-bold lg:mb-5">
      <h2>
        {{ product.name }}
      </h2>
      <span class="flex flex-col text-right sm:flex-row sm:gap-2 md:flex-col md:gap-0">
        <span>
          {{ currencyStore.formatPriceToShow(product.priceInCents) }}
        </span>
        <span v-if="currencyStore.current">
          {{ currencyStore.current.symbol }}
        </span>
      </span>
    </div>
    <p class="text-xl">
      {{ product.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Product, ProductForCart } from '~/types/Product'
const currencyStore = useCurrencyStore()
defineProps<{
  product: Product | ProductForCart
}>()
</script>

<style scoped>

</style>
