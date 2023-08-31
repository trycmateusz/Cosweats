<template>
  <nav class="flex w-full justify-end border-t-[1px] border-b-[1px] border-borderDarkColor">
    <div
      v-for="(dropdown, dropdownIndex) in dropdowns"
      :key="dropdown.id"
      :class="{ 'mr-auto': dropdownIndex === 0 }"
    >
      <AppDropdown
        :has-icon="true"
        :light="true"
        :dropdown="dropdown"
        @expand="() => closeAllButOneDropdown(dropdown.id)"
      >
        <template v-if="dropdown.role === 'currency' && currentCurrency" #currency-dropdown>
          <span class="inline-block mr-1 leading-none sm:hidden">
            {{ `[${currentCurrency.symbol}] ` }}
          </span>
        </template>
        <template #options>
          <div v-if="dropdown.links" class="flex flex-col">
            <AppDropdownLink
              v-for="(link, linkIndex) in dropdown.links"
              :key="linkIndex"
              :text="link.text"
              :to="link.to"
            />
          </div>
          <div v-else class="flex flex-col max-w-[60svw]">
            <div
              v-for="currency in currencyStore.currencies"
              :key="currency.id"
              class="border-b border-borderDarkColor first:border-t"
            >
              <button
                class="flex-grow px-8 py-5 w-max max-w-full "
                @click="currencyStore.setCurrent(currency)"
              >
                {{ `${currency.name} (${currency.symbol})` }}
              </button>
            </div>
          </div>
        </template>
      </AppDropdown>
    </div>
    <button
      class="relative flex items-center gap-2 px-8 py-5"
    >
      <span
        class="hidden sm:inline-block pr-4"
      >
        Cart
      </span>
      <ClientOnly>
        <div class="icons relative">
          <img src="~/assets/img/cart.svg" class="max-w-[2.5rem] max-h-[2.25rem] sm:hidden" alt="">
          <span class="block absolute right-0 bottom-[20%] px-[0.4rem] leading-none rounded-full bg-blackishMain border border-whiteishMain translate-x-1/2 translate-y-1/2">0</span>
        </div>
      </ClientOnly>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type Dropdown from '~/types/Dropdown.js'
import { useCurrencyStore } from '~/stores/CurrencyStore.js'
const currencyStore = useCurrencyStore()
const { currentCurrency } = storeToRefs(currencyStore)
const dropdowns: Dropdown[] = reactive([
  {
    id: Math.random(),
    text: 'Products',
    role: 'products',
    expanded: false,
    classes: ['left-0', 'border-r'],
    links: [
      {
        text: 'Sweaters',
        to: '/shop'
      },
      {
        text: 'Sweatshirts',
        to: '/shop'
      },
      {
        text: 'Sweatpants',
        to: '/shop'
      }
    ]
  },
  {
    id: Math.random(),
    text: 'Currency',
    role: 'currency',
    expanded: false,
    classes: ['right-0', 'border-l', 'border-r']
  }
])
const closeAll = (dropdowns: Dropdown[]): void => {
  dropdowns.forEach((dropdown) => {
    if (dropdown.expanded) {
      dropdown.expanded = false
    }
  })
}
const closeAllButOneDropdown = (id: number): void => {
  const toClose = dropdowns.filter(dropdown => dropdown.id !== id)
  const toOpen = dropdowns.find(dropdown => dropdown.id === id)
  closeAll(toClose)
  if (toOpen) {
    toOpen.expanded = !toOpen.expanded
  }
}
watch(currentCurrency, (): void => {
  const currencyDropdown = dropdowns.find(dropdown => dropdown.role === 'currency')
  if (currencyDropdown) {
    if (currentCurrency.value) {
      currencyDropdown.text = `Currency [${currentCurrency.value.symbol}]`
    } else {
      currencyDropdown.text = 'Currency'
    }
  }
})
</script>

<style scoped>

</style>
