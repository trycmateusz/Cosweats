<template>
  <div class="fixed top-0 left-0 right-0 h-[100vh] bg-whiteishMain z-50 overflow-y-auto overflow-x-hidden">
    <div
      :id="overlayId"
      class="overlay wrapper h-full"
    >
      <ClientOnly>
        <AppCloseBar class="sticky top-0 z-60 bg-whiteishMain" :button-label="`Button to close overlay of ${product.name}`" @close="emit('close')" />
      </ClientOnly>
      <div class="flex flex-col gap-5 p-5 sm:gap-8 sm:p-8">
        <div ref="activeImageContainer" class="product-image-active grid grid-cols-1 w-full gap-5 sm:gap-8 sm:grid-cols-[1fr_auto] lg:grid-cols-[3fr_1fr]">
          <ClientOnly>
            <div class="flex justify-center items-center w-full bg-white p-5 aspect-square sm:p-8 lg:aspect-video">
              <img :src="activePhotoSrc" :alt="activePhotoAlt" class="w-full max-h-[550px]">
            </div>
          </ClientOnly>
          <div ref="colorImagesContainer" class="relative w-full sm:w-[30vw] sm:min-w-[120px] lg:w-full">
            <div class="flex gap-5 max-w-full h-full min-h-[150px] max-h-[150px] overflow-x-scroll sm:flex-col sm:gap-8 sm:absolute sm:w-max sm:max-h-none sm:overflow-x-hidden sm:overflow-y-scroll">
              <button
                v-for="(url, color) in product.photoUrls"
                :key="color"
                class=" border-b-0 border-white border bg-white p-2 aspect-square focus:-outline-offset-4 sm:p-4 sm:border-b sm:border-r-0"
                :class="{ 'active-border': url === activePhotoSrc }"
                @click="setActiveProductColor(color)"
              >
                <img
                  :src="url"
                  :alt="`${product.name} in ${color}`"
                  class="w-full h-full aspect-square"
                >
              </button>
            </div>
          </div>
        </div>
        <ClientOnly>
          <ProductListItemInfo :product="product" />
          <div class="mt-10 mb-10">
            <span class="block mb-5 font-bold text-2xl">Choose a size:</span>
            <div class="flex flex-wrap gap-5 text-3xl">
              <ProductListItemSize
                v-for="(size, index) in product.sizes"
                :key="index"
                :size="size"
                :is-active="size === productStore.active?.size"
                @size-change="setActiveProductSize(size)"
              />
            </div>
          </div>
          <AppButton class="ml-auto text-3xl" style-type="primary" text="Add to cart" @click="addActiveToCart" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductForCart } from '~/types/Product'
import type { Size } from '~/types/Size'
import type { Color } from '~/types/Color'
const productStore = useProductStore()
const cartStore = useCartStore()
const props = defineProps<{
  product: Product
  overlayId: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-active', product: ProductForCart): void
}>()
const router = useRouter()
productStore.setActive({
  ...props.product,
  size: props.product.sizes[0],
  color: props.product.colors[0]
})
const activePhotoSrc = computed(() => {
  if (productStore.active) {
    return props.product.photoUrls[productStore.active.color]
  } else {
    return props.product.photoUrls[props.product.colors[0]]
  }
})
const activePhotoAlt = computed(() => {
  return `${props.product.name} in ${productStore.active?.color}`
})
const addActiveToCart = () => {
  if (productStore.active) {
    cartStore.addOne(productStore.active)
    emit('close')
  }
}
const setActiveProductSize = (size: Size) => {
  if (productStore.active) {
    productStore.setSize(size, productStore.active)
  }
}
const setActiveProductColor = (color: Color) => {
  if (productStore.active) {
    productStore.setColor(color, productStore.active)
  }
}
onMounted(() => {
  const { makeBodyFixed } = useFixedBody()
  makeBodyFixed()
  router.push({ query: { itemId: props.product.id } })
})
onUnmounted(() => {
  const { removeFixedFromBody } = useFixedBody()
  removeFixedFromBody()
  router.push({ query: {} })
})
</script>

<style scoped>
.active-border {
  @apply border-borderDarkColor !important
}
</style>
