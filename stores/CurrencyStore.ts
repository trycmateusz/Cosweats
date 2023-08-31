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
    setCurrent (currency: Currency) {
      if (this.currentCurrency?.code !== currency.code) {
        this.currentCurrency = { ...currency }
      }
    }
  }
})
