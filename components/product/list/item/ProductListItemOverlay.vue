<template>
  <div class="fixed top-0 left-0 right-0 h-full bg-whiteishMain z-50 overflow-y-auto overflow-x-hidden">
    <div
      :id="overlayId"
      class="overlay wrapper h-full"
    >
      <ClientOnly>
        <AppCloseBar class="sticky top-0 z-60 bg-whiteishMain" :button-label="`Close overlay of ${product.name}`" @close="emit('close')" />
      </ClientOnly>
      <div class="flex flex-col gap-5 p-5 sm:gap-8 sm:p-8">
        <div ref="activeImageContainer" class="product-image-active grid grid-cols-1 w-full gap-5 sm:gap-8 sm:grid-cols-[1fr_auto] lg:grid-cols-[3fr_1fr]">
          <ClientOnly>
            <div
              class="flex justify-center items-center w-full bg-white aspect-square overflow-hidden lg:aspect-video"
            >
              <img
                ref="activePhoto"
                :src="activePhotoSrc"
                :alt="activePhotoAlt"
                class="w-full max-h-[550px] p-5 origin-top-left cursor-zoom-in sm:p-8"
                @mousemove="zoomInActivePhoto"
                @mouseout="resetZoomInActivePhoto"
              >
            </div>
          </ClientOnly>
          <div ref="colorImagesContainer" class="relative w-full sm:w-[30vw] sm:min-w-[120px] lg:w-full">
            <div class="flex gap-5 pb-5 max-w-full h-full min-h-[150px] max-h-[150px] overflow-x-auto sm:flex-col sm:gap-8 sm:pb-0 sm:pr-8 sm:absolute sm:w-max sm:max-h-none sm:overflow-x-hidden sm:overflow-y-auto">
              <button
                v-for="(url, color) in product.photoUrls"
                :key="color"
                class="border-white border bg-white p-2 aspect-square focus:-outline-offset-4 sm:p-4"
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
            <span class="block mb-5 font-bold text-xl">Choose a size:</span>
            <div class="flex flex-wrap gap-5 text-2xl">
              <ProductListItemSize
                v-for="(size, index) in product.sizes"
                :key="index"
                :size="size"
                :is-active="size.value === productStore.active?.size"
                @size-change="setActiveProductSize(size.value)"
              />
            </div>
          </div>
          <AppButton class="ml-auto text-2xl" style-type="primary" text="Add to cart" @click="addActiveToCart" />
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
const activePhoto = ref<HTMLImageElement | undefined>(undefined)
productStore.setActive({
  ...props.product,
  size: props.product.sizes[0].value,
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
const zoomInActivePhoto = (e: MouseEvent) => {
  const scale = 2
  if (activePhoto.value && !('ontouchstart' in window)) {
    activePhoto.value.style.transform = `scale(${scale}) translate(${scale * 0.25 * -e.offsetX}px, ${scale * 0.25 * -e.offsetY}px)`
  }
}
const resetZoomInActivePhoto = () => {
  if (activePhoto.value) {
    activePhoto.value.style.transform = 'translate(0) scale(1)'
  }
}
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

<style lang="scss" scoped>
::-webkit-scrollbar-thumb {
  border: 1px solid $border-dark-color;
}
.active-border {
  @apply border-borderDarkColor;
}
</style>
