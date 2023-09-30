export const useFixedBody = () => {
  const scrollPositionY = ref<number | undefined>(undefined)
  const allContent = document.querySelectorAll('main')
  const makeBodyFixed = () => {
    scrollPositionY.value = window.scrollY
    document.body.classList.add('body-fixed')
    allContent.forEach((container) => {
      const containerButtons = container.querySelectorAll('button')
      const containerAnchors = container.querySelectorAll('a')
      containerButtons?.forEach((button) => {
        const isTabindexSet = button.getAttribute('tabindex')
        if (!isTabindexSet) {
          button.setAttribute('tabindex', '-1')
          button.setAttribute('data-remove-tabindex', 'true')
        }
      })
      containerAnchors?.forEach((anchor) => {
        const isTabindexSet = anchor.getAttribute('tabindex')
        if (!isTabindexSet) {
          anchor.setAttribute('tabindex', '-1')
          anchor.setAttribute('data-remove-tabindex', 'true')
        }
      })
      container.setAttribute('aria-hidden', 'true')
    })
  }
  const removeFixedFromBody = () => {
    document.body.classList.remove('body-fixed')
    allContent.forEach((container) => {
      container.removeAttribute('aria-hidden')
      const elementsToRemoveTabindex = container.querySelectorAll('[data-remove-tabindex="true"]')
      elementsToRemoveTabindex?.forEach((element) => {
        element.removeAttribute('data-remove-tabindex')
        element.removeAttribute('tabindex')
      })
    })
    if (scrollPositionY) {
      window.scrollTo({
        top: scrollPositionY.value,
        behavior: 'auto'
      })
    }
  }
  return {
    makeBodyFixed,
    removeFixedFromBody
  }
}
