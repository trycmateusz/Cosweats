<template>
  <div class="model-list flex flex-col justify-center items-center gap-16 p-16 text-whiteishMain bg-blackishMain  md:relative">
    <ModelListItem 
      v-for="(cosweatsModel, index) in cosweatsModels"
      :key="cosweatsModel.id"
      :model="cosweatsModel"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>

</style>