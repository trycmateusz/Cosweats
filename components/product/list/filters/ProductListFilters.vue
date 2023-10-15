<template>
  <div class="filters-box flex flex-col items-end sticky top-[var(--shop-nav-height)] border-b bg-whiteishMain h-max border-whiteishDarker overflow-hidden">
    <button
      class="p-5 md:hidden min-h-[var(--nav-height)]"
      aria-controls="filters"
      :aria-expanded="areFiltersOpen"
      :aria-hidden="isDesktop"
      @click="areFiltersOpen = !areFiltersOpen"
    >
      <img class="w-10" src="~/assets/img/filter.svg" alt="">
    </button>
    <div class="flex flex-col w-full items-end max-h-[Calc(100svh_-_var(--shop-nav-and-filter-height))] overflow-auto md:max-h-[Calc(100svh_-_var(--shop-nav-height))]">
      <div
        id="filters"
        class="text-2xl border-t min-w-full max-h-0 transition-max-height overflow-y-auto md:filters-open"
        :class="{ 'filters-open': areFiltersOpen, 'border-whiteishDarker': areFiltersOpen }"
      >
        <div>
          <AppDropdown
            v-for="filter in filters"
            :key="filter.id"
            :dropdown="filter"
            :menu-max-height-in-viewport-percent="0.20"
            class="w-full border-b border-whiteishDarker last:border-whiteishMain"
            @toggle="() => closeAllButOne(filter.id)"
          >
            <template #options>
              <div
                v-if="filter.role === 'sizes'"
                :class="{ 'filter-expanded': areFiltersOpen }"
                class="max-h-0 transition-max-height ease-linear"
              >
                <ProductListFiltersSize
                  v-for="size in productStore.getPossibleSizes"
                  :key="size"
                  :size="size"
                  :is-checked="filterConditions.sizes.includes(size)"
                  @toggle-filter="(size) => toggleFilter(size)"
                />
              </div>
              <div
                v-if="filter.role === 'colors'"
                :class="{ 'filter-expanded': areFiltersOpen }"
                class="max-h-0 transition-max-height ease-linear"
              >
                <ProductListFiltersColor
                  v-for="color in productStore.getPossibleColors"
                  :key="color"
                  :color="color"
                  :is-checked="filterConditions.colors.includes(color)"
                  @toggle-filter="(color) => toggleFilter(color)"
                />
              </div>
              <div
                v-if="filter.role === 'sort'"
                :class="{ 'filter-expanded': areFiltersOpen }"
                class="max-h-0 transition-max-height ease-linear"
              >
                <ProductListFiltersSort
                  v-for="option in allSortsWithText"
                  :key="option.sort"
                  :sort="option.sort"
                  :text="option.text"
                  :is-checked="currentSort === option.sort"
                  @change-sort="(sort) => toggleOrSetSort(sort)"
                />
              </div>
            </template>
          </AppDropdown>
        </div>
        <div class="flex flex-wrap justify-end gap-5 border-t border-whiteishDarker p-5 sm:p-8">
          <AppButton
            class="text-2xl"
            text="Reset"
            style-type="secondary"
            @click="closeAndReset"
          />
          <AppButton
            class="text-2xl"
            text="Apply"
            style-type="primary"
            @click="closeAndApply"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dropdown } from '~/types/Dropdown'
import type { Size } from '~/types/Size'
import type { Color } from '~/types/Color'
import type { ProductFilterConditions, ProductSort, ProductSortWithText } from '~/types/Product'
import { isColor } from '~/types/Color'
import { isSize } from '~/types/Size'
const productStore = useProductStore()
const areFiltersOpen = ref(false)
const isDesktop = ref(false)
const filters = reactive<Dropdown[]>([
  {
    text: 'Colors',
    role: 'colors',
    expanded: false,
    id: Math.random(),
    classes: []
  },
  {
    text: 'Sizes',
    role: 'sizes',
    expanded: false,
    id: Math.random(),
    classes: []
  },
  {
    text: 'Sort',
    role: 'sort',
    expanded: false,
    id: Math.random(),
    classes: []
  }
])
const allSortsWithText: ProductSortWithText[] = [
  {
    sort: 'alphabetically-a-z',
    text: 'Alphabetically (A-Z)'
  },
  {
    sort: 'alphabetically-z-a',
    text: 'Alphabetically (Z-A)'
  },
  {
    sort: 'price-descending',
    text: 'Price Descending'
  },
  {
    sort: 'price-ascending',
    text: 'Price Ascending'
  }
]
const filterConditions = ref<ProductFilterConditions>({
  colors: [],
  sizes: []
})
const currentSort = ref<ProductSort | null>(null)
const closeAll = (filters: Dropdown[]) => {
  filters.forEach((filter) => {
    filter.expanded = false
  })
}
const closeAllButOne = (filterId: number) => {
  const toClose = filters.filter(filter => filter.id !== filterId)
  const toOpen = filters.find(filter => filter.id === filterId)
  closeAll(toClose)
  if (toOpen) {
    toOpen.expanded = !toOpen.expanded
  }
}
const toggleFilter = (condition: Color | Size) => {
  if (isColor(condition)) {
    const isSetIndex = filterConditions.value.colors.findIndex(color => color === condition)
    if (isSetIndex === -1) {
      filterConditions.value.colors.push(condition)
    } else {
      filterConditions.value.colors.splice(isSetIndex, 1)
    }
  }
  if (isSize(condition)) {
    const isSetIndex = filterConditions.value.sizes.findIndex(size => size === condition)
    if (isSetIndex === -1) {
      filterConditions.value.sizes.push(condition)
    } else {
      filterConditions.value.sizes.splice(isSetIndex, 1)
    }
  }
}
const toggleOrSetSort = (sort: ProductSort | null) => {
  if (!currentSort.value || currentSort.value !== sort) {
    currentSort.value = sort
  } else {
    currentSort.value = null
  }
}
const closeAndApply = () => {
  closeAll(filters)
  if (!isDesktop.value) {
    areFiltersOpen.value = false
  }
  productStore.setFilters(filterConditions.value)
  productStore.setSort(currentSort.value)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
const closeAndReset = () => {
  closeAll(filters)
  if (!isDesktop.value) {
    areFiltersOpen.value = false
  }
  productStore.setFilters(null)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
watch(isDesktop, () => {
  if (isDesktop.value) {
    areFiltersOpen.value = true
  }
})
onMounted(() => {
  if (document.body.clientWidth >= 768) {
    isDesktop.value = true
  }
  window.addEventListener('resize', () => {
    if (document.body.clientWidth >= 768) {
      isDesktop.value = true
    } else {
      isDesktop.value = false
    }
  })
})
</script>

<style lang="scss" scoped>
.filters-open {
  max-height: 100svh
}
.filter-expanded {
  max-height: 50%;
}
.filters-box {
  ::-webkit-scrollbar-thumb:vertical {
    border: 1px solid $darker-blackish;
  }
}
</style>
