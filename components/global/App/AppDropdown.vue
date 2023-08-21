<template>
  <button
    ref="dropdown"
    :aria-controls="dropdownId"
    :aria-expanded="expanded"
    class="relative flex items-center gap-2 px-8 py-5"
    @click="emit('expand')"
  >
    <span
      class="sm:inline"
      :class="{ 'hidden': hasIcon }"
    >
      {{ text }}
    </span>
    <ClientOnly>
      <div class="icons relative">
        <img v-if="hasIcon" :src="getImageSrc(`${text.toLowerCase()}.svg`)" class="max-w-[2.5rem] max-h-[2.25rem] sm:hidden" alt="">
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
    <div
      ref="menu"
      class="menu absolute flex flex-col top-0 translate-y-[Calc(1px_+_var(--nav-height))] min-w-full max-h-0 bg-blackishDark border-borderDarkColor transition-max-height overflow-hidden"
      :class="menuItemClasses"
    >
      <a href="#" class="px-8 py-5 border-t border-b border-borderDarkColor">Sweaters</a>
      <a href="#" class="px-8 py-5 border-t border-b border-borderDarkColor">Sweatshirts</a>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useImages } from '~/composables/useImages.js'
const { getImageSrc } = useImages()
const props = defineProps<{
  text: string
  light?: boolean
  expanded: boolean
  hasIcon?: boolean
  menuItemClasses: string[]
  // links: DropdownLink
}>()
const menu = ref<HTMLDivElement | undefined>(undefined)
const dropdown = ref<HTMLButtonElement | undefined>(undefined)
const emit = defineEmits(['expand'])
const dropdownId = computed(() => {
  return `${props.text.toLowerCase()}-dropdown-menu`
})
watch(props, () => {
  if (menu.value) {
    if (props.expanded) {
      menu.value.style.maxHeight = `${menu.value.scrollHeight}px`
    } else {
      menu.value.style.maxHeight = '0px'
    }
  }
})
</script>

<style lang="scss" scoped>
button[aria-expanded="true"]{
  svg {
    @apply rotate-180
  }
}
</style>
