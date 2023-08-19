<template>
  <div 
    class="model wrapper relative pt-8 pb-8 flex gap-8 mb-16 md:absolute md:p-16 md:h-full"
    :class="{ 'in-spotlight': inSpotlight }"
  >
    <Transition name="text">
      <div
        v-if="inSpotlight || windowWidth < 768"
        class="text relative flex flex-col items-center justify-center ml-auto z-20 sm:w-[60%] md:absolute md:right-24 md:top-1/2 md:-translate-y-1/2 md:w-1/2"
      >
        <h3 class="flex flex-col items-center justify-center mb-8 sm:mb-16 text-center leading-none">
          <span class="uppercase text-3xl sm:text-5xl">
            {{ fullName }}
          </span>
          <span class="text-2xl sm:text-3xl text-grayLight">
            {{ model.occupation }}
          </span>
        </h3>
        <p class="text-2xl sm:text-3xl font-halibutSerifRegular">
          {{ model.introduction }}
        </p>
      </div>
    </Transition>
    <div
      ref="imgBox"
      class="img-box hidden w-full max-w-[40%] bg-clip-content sm:block md:absolute"
      :style="`right: ${rightPosition}%; bottom: ${bottomPosition}%; z-index: ${10-index}`"
    >
      <img
        :src="`~/${firstNameInLowercase}.svg`" 
        :alt="`A picture of Cosweats ${model.occupation} - ${model.firstName}`"
        class="h-full w-full md:max-h-[70svh]"
      >
      <img 
        :src="`${maskImageUrl}`" 
        alt=""
        class="img-mask absolute left-0 top-0 hidden h-full w-full opacity-60"
      >
    </div>
    <div 
      class="mobile-mask absolute top-0 h-full aspect-square bg-cover opacity-40 z-10 sm:hidden"
      :class="classesForSide"
      :style="`background-image: url('${maskImageUrl}')`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type Model from '~/types/Model.js'
const props = defineProps<{
  model: Model
  index: number
  spotlight: number
}>()
const { width: windowWidth } = useWindowSize()
const baseModelMargin = 5
const horizontalDistanceBetweenModels = 12.5
const verticalDistanceBetweenModels = 5
const bottomPosition = (baseModelMargin + verticalDistanceBetweenModels * props.index)
const rightPosition = (horizontalDistanceBetweenModels * props.index)
const imgBox = ref<HTMLDivElement | undefined>(undefined)
const fullName = computed(() => {
  return `${props.model.firstName} ${props.model.lastName}`
})
const firstNameInLowercase = computed(() => {
  return props.model.firstName.toLowerCase()
})
const classesForSide = computed((): string[] => {
  if(props.index % 2 === 0){
    return ['left-0', 'horizontal-flip']
  }
  else {
    return ['right-0']
  }
})
const maskImageUrl = computed(() => {
  return `~/${firstNameInLowercase.value}_mask.svg`
})
const inSpotlight = computed(() => {
  return props.spotlight === props.index
})
watch(imgBox, () => {
  if(imgBox.value && inSpotlight.value){
     imgBox.value.classList.add('getInSpotlight')
    setTimeout(() => {
      imgBox.value?.classList.add('spotlight-position')
    }, 1000)
  }
}, {
  immediate: true
})
watch(inSpotlight, (newValue) => {
  if(newValue === true) {
    imgBox.value?.classList.add('getInSpotlight')
    imgBox.value?.classList.remove('outOfSpotlight')
  }
  else {
    imgBox.value?.classList.remove('getInSpotlight')
    imgBox.value?.classList.add('outOfSpotlight')
  }
  setTimeout(() => {
    imgBox.value?.classList.toggle('spotlight-position')
  }, 1000)
})
</script>

<style lang="scss" scoped>
.horizontal-flip {
  transform: rotateY(180deg)
}
.spotlight-position {
  left: 0;
  bottom: 10% !important;
  z-index: 50 !important;
  .img-mask {
    display: inline-block;
  }
}
.img-box {
  transition: transform 2s;
}
@keyframes getInSpotlight {
  0% {
    transform: translate(0) rotate(0);
    opacity: 1;
  }
  50% {
    transform: translateX(200%) rotate(0);
    opacity: 0;
  }
  51% {
    transform: translateX(-200%) rotate(0);
    opacity: 0;
  }
  52% {
    transform: translateX(-200%) rotateY(180deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotateY(180deg);
    opacity: 1;
  }
}
@keyframes outOfSpotlight {
  0% {
    transform: translateX(0) rotateY(180deg);
    opacity: 1;
  }
  50% {
    transform: translateX(-200%) rotateY(180deg);
    opacity: 0;
  }
  51% {
    transform: translateX(-200%) rotate(0);
    opacity: 0;
  }
  52% {
    transform: translateX(200%) rotate(0);
    opacity: 0;
  }
  100% {
    transform: translate(0) rotate(0);
    opacity: 1;
  }
}
.outOfSpotlight {
  animation: outOfSpotlight 2s forwards;
}
.getInSpotlight {
  animation: getInSpotlight 2s forwards;
}
.text-enter-active,
.text-leave-active {
  transition: opacity .5s ease;
}
.text-enter-active {
  transition-delay: 1.5s;
}
.text-enter-from,
.text-leave-to {
  opacity: 0;
  pointer-events: none;
}
</style>