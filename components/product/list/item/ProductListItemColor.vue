<template>
  <button
    class="px-8 py-2 rounded-full border-2 border-transparent border-whiteishDarker"
    :class="[color]"
    :aria-selected="isActive"
    @click="emit('color-change', color)"
  >
    {{ color }}
  </button>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Color'
defineProps<{
  color: Color
  isActive: boolean
}>()
const emit = defineEmits<{
  (e: 'color-change', color: Color): void
}>()
</script>

<style lang="scss" scoped>
/* 'black' | 'blue' | 'brown' | 'claret' | 'green' | 'khaki' | 'orange' | 'pink' | 'purple' | 'red' | 'white' */
.black {
  @apply text-white bg-blackishDark;
  &[aria-selected="true"] {
    @apply border-white
  }
}
.blue {
  @apply bg-blue-100 text-blue-900;
  &[aria-selected="true"] {
    @apply border-blue-900
  }
}
.brown {
  @apply bg-amber-100 text-amber-900;
  &[aria-selected="true"] {
    @apply border-amber-900
  }
}
.claret {
  @apply bg-red-100 text-red-950;
  &[aria-selected="true"] {
    @apply border-red-950
  }
}
.green {
  @apply bg-emerald-100 text-emerald-800;
  &[aria-selected="true"] {
    @apply border-emerald-800
  }
}
.khaki {
  @apply bg-lime-200 text-black;
  &[aria-selected="true"] {
    @apply border-black
  }
}
.orange {
  @apply bg-orange-100 text-orange-600;
  &[aria-selected="true"] {
    @apply border-orange-600
  }
}
.pink {
  @apply bg-pink-100 text-pink-700;
  &[aria-selected="true"] {
    @apply border-pink-700
  }
}
.purple {
  @apply bg-purple-100 text-purple-700;
  &[aria-selected="true"] {
    @apply border-white
  }
}
.red {
  @apply bg-red-100 text-red-500;
  &[aria-selected="true"] {
    @apply border-red-500
  }
}
.white {
  @apply bg-white text-blackishDark;
  &[aria-selected="true"] {
    @apply border-blackishDark
  }
}
</style>
