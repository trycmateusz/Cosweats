<template>
  <p>
    <span class="flex justify-between mb-10 gap-8 text-3xl font-bold">
      <span>{{ product.name }}</span>
      <span class="flex flex-col text-right sm:flex-row sm:gap-2 md:flex-col md:gap-0">
        <span>
          {{ priceToShow }}
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
const props = defineProps<{
  product: Product
}>()
const currencyStore = useCurrencyStore()
const priceToShow = computed(() => { // jako getter w currency store
  if (currencyStore.current) {
    return `${Math.floor(props.product.priceInCents * currencyStore.current.ratio) / 100}`
  } else {
    return ''
  }
})
</script>

<style scoped>

</style>
