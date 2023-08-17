<template>
  <div class="model wrapper pt-8 pb-8 flex gap-8 relative mb-16">
    <div class="text relative flex flex-col items-center justify-center ml-auto z-20 sm:w-[60%] md:absolute ">
      <h3 class="flex flex-col items-center justify-center mb-8 sm:mb-16 text-center leading-none">
        <span class="uppercase text-3xl sm:text-5xl">
          {{ fullName }}
        </span>
        <span class="text-2xl sm:text-3xl text-grayDark">
          {{ model.occupation }}
        </span>
      </h3>
      <p class="text-2xl sm:text-3xl font-halibutSerifRegular">
        {{ model.introduction }}
      </p>
    </div>
    <img 
      :src="`${firstNameInLowercase}.svg`" 
      :alt="`A picture of Cosweats ${model.occupation} - ${model.firstName}`"
      class="hidden sm:block w-full max-w-[40%] max-h-[280px] md:max-h-[360px] 2xl:max-h-[450px]"
    >
    <div 
      class="mobile-mask absolute top-0 sm:hidden h-full aspect-square bg-cover opacity-40 z-10"
      :class="classesForSide"
      :style="`background-image: url('${maskImgUrl}')`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type Model from '~/types/Model.js'
const props = defineProps<{
  model: Model
  index: number
}>()
const fullName = computed(() => `${props.model.firstName} ${props.model.lastName}`)
const firstNameInLowercase = computed(() => props.model.firstName.toLowerCase())
const classesForSide = computed((): string[] => {
  if(props.index % 2 === 0){
    return ['left-0', 'horizontal-flip']
  }
  else {
    return ['right-0']
  }
})
const maskImgUrl = computed(() => `${firstNameInLowercase.value}_mask.svg`)
console.log(props.index)
</script>

<style scoped>
.horizontal-flip {
  transform: rotateY(180deg)
}
</style>