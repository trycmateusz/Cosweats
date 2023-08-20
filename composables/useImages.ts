import { filename } from 'pathe/utils'
import { computed } from 'vue'

interface ImagesComposable {
  getImageSrc(fileName: string): string | undefined;
}

const images = computed(() => import.meta.glob('~/assets/img/*.(svg)', { eager: true }))
const getImageSrc = (fileName: string): string | undefined => {
  for (const path in images.value) {
    if (Object.hasOwn(images.value, path)) {
      // unknown type is required here to change the final type as typescript thinks that images.value[path] is a function, it is not.
      const image: unknown = images.value[path]
      const imagePath = (image as { default: string }).default
      const regex = new RegExp('^' + filename(fileName) + '(?:\\.[a-zA-Z0-9]+)?$')
      if (regex.test(filename(imagePath))) {
        return imagePath
      }
    }
  }
  return undefined
}

export const useImages = (): ImagesComposable => {
  return {
    getImageSrc
  }
}
