<template>
  <div id="content">
    <TheNavigation>
      <ShopNavigation />
    </TheNavigation>
    <AppHeader text="Cosweats" />
    <main class="wrapper flex flex-col border-whiteishDarker md:flex-row 2xl:border-l">
      <ProductListFilters
        :filter-conditions="filterConditions"
        class="md:w-1/2 min-h-max"
        @add-color-filter="(color) => filterConditions.colors.push(color)"
        @add-size-filter="(size) => filterConditions.sizes.push(size)"
        @remove-color-filter="(index) => filterConditions.colors.splice(index, 1)"
        @remove-size-filter="(index) => filterConditions.sizes.splice(index, 1)"
        @apply-filters="productStore.setFilters(filterConditions)"
      />
      <div class="grid grid-cols-1 md:w-full md:border-l md:border-whiteishDarker">
        <transition>
          <div v-if="productStore.areAnyFilters" class="flex flex-wrap gap-5 p-5 pb-0 text-2xl sm:p-8 sm:pb-0">
            <AppButton
              v-for="(color, index) in productStore.appliedFilters?.colors"
              :key="color"
              style-type="tertiary"
              :text="color"
              class="flex items-center gap-2 px-[1em]"
              @click="removeFilter(color, index)"
            >
              <template #default>
                <img class="w-8" src="~/assets/img/x-circle.svg" alt="">
              </template>
            </AppButton>
            <AppButton
              v-for="(size, index) in productStore.appliedFilters?.sizes"
              :key="size"
              style-type="tertiary"
              :text="size"
              class="flex items-center gap-2 px-[0.7em]"
              @click="removeFilter(size, index)"
            >
              <template #default>
                <img class="w-8" src="~/assets/img/x-circle.svg" alt="">
              </template>
            </AppButton>
          </div>
        </transition>

        <ProductList
          class="w-full"
          :products="productStore.getProductsMatchingFilters(productStore.products)"
        />
      </div>
    </main>
    <TheFooter />
    <teleport to="body">
      <TheCart
        v-if="cartStore.isCartOpen"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProductFilterConditions } from '~/types/Product'
import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'
import { isColor } from '~/types/Color'
import { isSize } from '~/types/Size'
const currencyStore = useCurrencyStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const filterConditions = ref<ProductFilterConditions>({
  colors: [],
  sizes: []
})
const removeFilter = (condition: Color | Size, index: number) => {
  if (isColor(condition)) {
    filterConditions.value.colors.splice(index, 1)
  }
  if (isSize(condition)) {
    filterConditions.value.sizes.splice(index, 1)
  }
  productStore.removeFilter(condition)
}
const initialQueryItemId = route.query.itemId
provide('initialQueryItemId', initialQueryItemId)
await currencyStore.fetchAll()
productStore.fetchAll()
useHead({
  title: 'Cosweats - Shop',
  meta: [
    { name: 'description', content: 'Clothing that all kinds of people will find pretty. Come visit and look through our shelves, I promise you\'ll find something for yourself!' }
  ]
})
</script>

<style scoped>

</style>
