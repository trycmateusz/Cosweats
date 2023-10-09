<template>
  <div class="dropdown relative h-full">
    <button
      :aria-label="dropdown.text"
      :aria-controls="dropdownId"
      :aria-expanded="dropdown.expanded"
      class="relative flex items-center px-5 py-5 h-full sm:px-8 sm:gap-2"
      @click="emit('expand')"
    >
      <span
        class="sm:inline"
        :class="{ 'hidden': hasIcon }"
      >
        {{ dropdown.text }}
      </span>
      <ClientOnly>
        <slot name="currency-dropdown" />
        <div class="icons relative">
          <img v-if="hasIcon" :src="getImageSrc(`${dropdown.role.toLowerCase()}.svg`)" class="max-w-[2.5rem] max-h-[2.25rem] sm:hidden" alt="">
        </div>
        <div class="indicator">
          <svg
            class="h-[1.25rem] transition-transform"
            width="26"
            height="21"
            viewBox="0 0 26 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 21L25.9904 0H0.00961876L13 21Z" :fill="light ? '#ECE6DB' : '#211C1B'" />
          </svg>
        </div>
      </ClientOnly>
    </button>
    <div
      ref="menu"
      class="menu absolute flex flex-col top-0 translate-y-[Calc(var(--nav-height)_+_1px)] min-w-full max-h-0 bg-blackishDark border-borderDarkColor transition-max-height overflow-hidden"
      :class="[...dropdown.classes, { 'overflow-y-auto': isMenuOverflowing, 'menu-expanded': dropdown.expanded }]"
    >
      <slot name="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImages } from '~/composables/useImages.js'
import type { Dropdown } from '~/types/Dropdown.js'
const { getImageSrc } = useImages()
const props = defineProps<{
  dropdown: Dropdown
  light?: boolean
  hasIcon?: boolean
}>()
const emit = defineEmits(['expand', 'close'])
const menu = ref<HTMLDivElement | undefined>(undefined)
const isMenuOverflowing = ref(false)
const checkIfMenuIsOverflowing = async () => {
  if (menu.value) {
    await nextTick()
    isMenuOverflowing.value = menu.value?.scrollHeight > window.innerHeight * 0.40
  }
}
const dropdownId = `${props.dropdown.role.toLowerCase()}-dropdown-menu`
watch(menu, () => {
  checkIfMenuIsOverflowing()
}, {
  deep: true
})
onMounted(() => {
  window.addEventListener('resize', checkIfMenuIsOverflowing)
})
</script>

<style lang="scss" scoped>
button[aria-expanded="true"]{
  svg {
    @apply rotate-180
  }
}
.dropdown {
  ::-webkit-scrollbar-thumb {
    border-right: 0;
  }
}
.overflow-y-auto {
  overflow-y: auto
}
.menu-expanded {
  max-height: 40vh;
}
</style>
