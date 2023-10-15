<template>
  <div class="text-3xl h-full">
    <AppCloseBar
      v-if="!checkout"
      class="bg-whiteishDarker border-whiteishMain"
      dynamic-element-parent-id="cart"
      :is-bin="true"
      :light-border="true"
      :button-label="`Button to delete ${product.name} with size ${product.size} and color ${product.color} from the cart`"
      @close="cartStore.removeOne(props.product)"
    />
    <div
      class="flex flex-col gap-5 p-5 bg-whiteishDarker sm:gap-8 sm:p-8"
      :class="{ 'h-full': checkout }"
    >
      <div class="aspect-square">
        <img class="w-full h-full p-5 bg-white" :src="imageSrc" :alt="imageAlt">
      </div>
      <div class="flex flex-col flex-grow justify-between">
        <div>
          <span>
            {{ product.name }}
          </span>
          <span class="text-stone-700">
            ({{ product.color }})
          </span>
        </div>

        <div class="flex gap-2 mt-auto">
          <span>
            {{ currencyStore.formatPriceToShow(product.priceInCents) }}
          </span>
          <span>
            {{ currencyStore.current?.symbol }}
          </span>
        </div>
      </div>
      <div v-if="!checkout" class="flex flex-col gap-5 mt-5 sm:mt-8">
        <span>
          Choose a size:
        </span>
        <div class="flex flex-wrap gap-5 text-3xl">
          <ProductListItemSize
            v-for="size in product.sizes"
            :key="size.value"
            :size="size"
            :is-active="product.size === size.value"
            @size-change="productStore.setSize(size.value, product)"
          />
        </div>
      </div>
      <div v-if="!checkout" class="flex flex-col gap-5 ">
        <span>
          Choose a color:
        </span>
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
  </div>
</template>

<script setup lang="ts">
import type { ProductForCart } from '~/types/Product'
const productStore = useProductStore()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()
const props = defineProps<{
  product: ProductForCart
  checkout?: boolean
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
