<template>
  <p>
    <span class="flex justify-between mb-10 gap-8 text-3xl font-bold">
      <span>{{ product.name }}</span>
      <span class="flex flex-col text-right sm:flex-row sm:gap-2 md:flex-col md:gap-0">
        <span>
          {{ currencyStore.getPriceToShow(product.priceInCents) }}
        </span>
        <span v-if="currencyStore.current">
          {{ currencyStore.current.symbol }}
        </span>
      </span>
    </span>
    <span class="text-2xl">
      {{ product.description }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { Product } from '~/types/Product'
import { useCurrencyStore } from '~/stores/CurrencyStore'
const currencyStore = useCurrencyStore()
defineProps<{
  product: Product
}>()
</script>

<style scoped>

</style>
