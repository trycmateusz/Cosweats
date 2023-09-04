// I tried to type the binding, but it seems it's not supported (03.09.2023)
// binding should be dropdowns content
function assertIsNode (e: EventTarget | null, el: HTMLElement): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Event target for v-click-outside directive for el: ${el}, is not Node.`)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted (el: HTMLElement, binding) {
      window.addEventListener('click', (e) => {
        if (e.target) {
          assertIsNode(e.target, el)
          if (e.target !== el && !el.contains(e.target)) {
            binding.value.close()
          }
        }
      })
    }
  })
})
