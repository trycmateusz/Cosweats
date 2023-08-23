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
      const { find } = useStrapi()
      const response = await find<Currency>('currencies')
      response.data.forEach((currency) => {
        this.currencies.push({ ...currency.attributes })
      })
    },
    setCurrentCurrency (currency: Currency) {
      this.currentCurrency = { ...currency }
    }
  }
})
