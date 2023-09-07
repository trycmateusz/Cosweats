<template>
  <div class="flex flex-col gap-10 p-5 bg-whiteishDarker text-2xl sm:p-8 sm:gap-8 md:h-full">
    <div>
      <img
        :src="activePhotoUrl"
        :alt="activePhotoAlt"
        class="p-5 w-full bg-white sm:p-8 cursor-pointer"
        @click="isOverlayActive = true"
      >
    </div>
    <ProductListItemInfo :product="product" />
    <AppButton
      class="mt-auto ml-auto text-3xl"
      style-type="primary"
      text="Take a look"
      :label="`Open ${product.name} product info overlay`"
      @click="isOverlayActive = true"
    />
    <Teleport to="body">
      <ProductListItemOverlay
        v-if="isOverlayActive"
        :active-photo-url="activePhotoUrl"
        :active-color="activeColor"
        :active-size="activeSize"
        :active-photo-alt="activePhotoAlt"
        :product="product"
        @close="isOverlayActive = false"
        @choose-color="(color) => activeColor = color"
        @choose-size="(size) => activeSize = size"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'
const props = defineProps<{
  product: Product
}>()
const activeColor = ref<Color>(props.product.colors[0])
const activeSize = ref<Size>(props.product.sizes[0])
const activePhotoAlt = ref(`${props.product.name} in ${activeColor.value}`)
const isOverlayActive = ref(false)
const activePhotoUrl = computed(() => {
  return props.product.photoUrls[activeColor.value]
})
</script>

<style lang="scss" scoped>
</style>
