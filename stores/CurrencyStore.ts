interface Currency {
  id: number
  symbol: string
  name: string
  name_plural: string
  code: string
}

type State = {
  currentCurrency: Currency | null
  currencies: Currency[]
}

export const useCurrencyStore = defineStore('CurrencyStore', {
  state: (): State => {
    return {
      currentCurrency: null,
      currencies: []
    }
  },
  actions: {
    async fetchAll () {
      const config = useRuntimeConfig()
      const { data, error } = await useFetch(`${config.public.apiUrl}/currencies.json`)
      if (error.value) {
        console.log('error', error.value)
      }
      if (data.value) {
        console.log('data', data.value)
      }
    },
    setCurrent (currency: Currency) {
      if (this.currentCurrency?.code !== currency.code) {
        this.currentCurrency = { ...currency }
      }
    }
  }
})
