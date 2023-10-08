import type { NuxtError } from 'nuxt/app'
const statusError = ref<NuxtError | null>(null)
const clearError = () => {
  statusError.value = null
}
const createStatusError = (code: number, message: string) => {
  statusError.value = createError({ statusCode: code, statusMessage: message })
}
watch(statusError, () => {
  const router = useRouter()
  if (statusError.value) {
    router.push('/error')
  }
})
export const useStatusError = () => {
  return {
    statusError,
    clearError,
    createStatusError
  }
}
