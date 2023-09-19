// I tried to type the binding, but it seems it's not supported (03.09.2023)
// binding should be dropdowns content
// binding attributes
// -close - function
// -checkAriaControls - check to see if e.target is the toggler OUTSIDE the element
// -checkDynamicElementParentId - check to see if e.target dynamically removes some element, which may make el.contains(e.target) false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted (el: HTMLElement, binding) {
      window.addEventListener('click', (e) => {
        if (e.target && e.target instanceof HTMLElement) {
          if (e.target !== el && !el.contains(e.target)) {
            if (binding.value.checkAriaControls) {
              const targetAriaControls = e.target.getAttribute('aria-controls')
              if (el.id === targetAriaControls) {
                return
              }
            }
            if (binding.value.checkDynamicElementParentId) {
              const targetDataParentId = e.target.getAttribute('data-dynamic-element-parent-id')
              console.log(el.id, targetDataParentId)
              if (el.id === targetDataParentId) {
                return
              }
            }
            return binding.value.close()
          }
        }
      })
    }
  })
})
