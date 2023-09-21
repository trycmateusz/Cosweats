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
        <img class="w-full h-full p-5 bg-white" :src="imageSrc" :alt="imageAlt">
      </div>
      <div class="flex justify-between gap-5 mb-5 font-bold sm:mb-8">
        <div class="flex flex-col">
          <span>
            {{ product.name }}
          </span>
          <span class="text-stone-700">
            ({{ product.color }})
          </span>
        </div>

        <div class="flex flex-col text-right sm:flex-row sm:gap-2">
          <span>
            {{ currencyStore.getPriceToShow(product.priceInCents) }}
          </span>
          <span>
            {{ currencyStore.current?.symbol }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap gap-5 text-3xl">
        <ProductListItemSize
          v-for="size in product.sizes"
          :key="size"
          :size="size"
          :is-active="product.size === size"
          @size-change="productStore.setSize(size, product)"
        />
      </div>
      <div class="flex flex-wrap gap-5 text-3xl">
        <ProductListItemColor
          v-for="color in product.colors"
          :key="color"
          :color="color"
          :is-active="product.color === color"
          @color-change="productStore.setColor(color, product)"
        />
      </div>
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
const imageSrc = computed(() => {
  return props.product.photoUrls[props.product.color]
})
const imageAlt = computed(() => {
  return `${props.product.name} in ${props.product.colors[0]}`
})
</script>

<style scoped>

</style>
