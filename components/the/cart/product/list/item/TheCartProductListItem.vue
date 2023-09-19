<template>
  <div class="text-3xl h-full">
    <AppCloseBar
      class="bg-whiteishDarker border-whiteishMain"
      :show-bin-icon="true"
      dynamic-element-parent-id="cart"
      :parent-label="`Button to delete ${product.name} with size ${product.size} and color ${product.color} from the cart`"
      @close="cartStore.removeOne(props.product)"
    />
    <div class="flex flex-col gap-5 p-5 bg-whiteishDarker sm:gap-8 sm:p-8">
      <div class="aspect-square">
        <img class="w-full h-full p-5 bg-white" :src="productStore.getActivePhotoUrl(product)" alt="">
      </div>
      <div class="flex justify-between gap-2 font-bold">
        <span>
          {{ product.name }}
        </span>
        <div class="flex flex-col text-right sm:flex-row sm:gap-2">
          <span>
            {{ currencyStore.getPriceToShow(product.priceInCents) }}
          </span>
          <span>
            {{ currencyStore.current?.symbol }}
          </span>
        </div>
      </div>
      <ProductListItemQuantity :light-background="true" class="ml-auto" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductForCart } from '~/types/Product'
const productStore = useProductStore()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()
const props = defineProps<{
  product: ProductForCart
}>()
</script>

<style scoped>

</style>
