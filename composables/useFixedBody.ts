export const useFixedBody = () => {
  const scrollPositionY = ref<number | undefined>(undefined)
  const makeBodyFixed = () => {
    scrollPositionY.value = window.scrollY
    document.body.classList.add('body-fixed')
  }
  const removeFixedFromBody = () => {
    document.body.classList.remove('body-fixed')
    if (scrollPositionY) {
      window.scrollTo({
        top: scrollPositionY.value,
        behavior: 'instant'
      })
    }
  }
  return {
    makeBodyFixed,
    removeFixedFromBody
  }
}
