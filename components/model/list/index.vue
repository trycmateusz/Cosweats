<template>
  <div class="model-list flex flex-col justify-center items-center gap-16 p-16 text-whiteishMain bg-blackishMain  md:relative md:h-[100svh] md:w-full md:bg-whiteishMain">
    <div 
      class="shadow hidden absolute w-full h-full md:block bg-black z-20"
      :class="{ 'is-transitioning': isTransitioning }"
    ></div>
    <button 
      @click="decrementSpotlight"
      aria-label="Button to showcase previous model"
      :disabled="isTransitioning"
      class="animate-pulse z-50 disabled:opacity-30 disabled:animate-none"
    >
      <img 
        src="arrow_left.svg" 
        alt=""
        class="absolute top-0 left-0 max-w-[15%] max-h-[15svh]"
      >
    </button>
    <button 
      @click="incrementSpotlight"
      aria-label="Button to showcase next model"
      :disabled="isTransitioning"
      class="animate-pulse z-50 disabled:opacity-30 disabled:animate-none"
    >
      <img 
        src="arrow_right.svg" 
        alt=""
        class="absolute top-0 right-0 max-w-[15%] max-h-[15svh]"
      >
    </button>
    <ModelListItem 
      v-for="(cosweatsModel, index) in cosweatsModels"
      :key="cosweatsModel.id"
      :model="cosweatsModel"
      :index="index"
      :spotlight="spotlight"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type Model from '~/types/Model.js'
const cosweatsModels: Model[] = [
  {
    id: Math.random(),
    firstName: 'Jazmine',
    lastName: 'Taylor',
    occupation: 'Promotional Model',
    introduction: 'Jazmine Taylor took up modeling 6 years ago. She got noticed by AEC Fashion, which was a key to her career. She won 3 beauty contest, one of which one was international.'
  },
  {
    id: Math.random(),
    firstName: 'Liz',
    lastName: 'Kakko',
    occupation: 'Model',
    introduction: 'Liz came knocking at our door after she saw our advertisement for our collection. She was looking for a job at a place where she can find comfort in her own body - and she found it!'
  },
  {
    id: Math.random(),
    firstName: 'Pedro',
    lastName: 'Shakal',
    occupation: 'Extra Model',
    introduction: 'Pedro works for his own brand but our uniqueness in the clothing industry attracted him and he decided to reach out to us. He occassionally takes part in our photoshoots.'
  },
  {
    id: Math.random(),
    firstName: 'Philip',
    lastName: 'Jenkins',
    occupation: 'Intern Model',
    introduction: 'Philip is learning to become a professional model. He had trouble finding an internship - beacuse he\'s bald. In Cosweats thoughm we do not judge and we saw great potential in him.'
  }
]
const spotlight = ref(0)
const isTransitioning = ref(false)
const incrementSpotlight = () => {
  if(spotlight.value + 1 > cosweatsModels.length - 1){
    spotlight.value = 0
  }
  else {
    spotlight.value++
  }
}
const decrementSpotlight = () => {
  if(spotlight.value - 1 < 0){
    spotlight.value = cosweatsModels.length - 1
  }
  else {
    spotlight.value--
  }
}
watch(spotlight, () => {
  if(!isTransitioning.value){
    isTransitioning.value = true
    setTimeout(() => {
      isTransitioning.value = false
    }, 1000)
  }
})
</script>

<style lang="scss" scoped>
.shadow {
  transition: opacity .3;
  opacity: 0.80;
  transition: opacity .5s;
  &.is-transitioning {
    opacity: 0;
  }
}
</style>