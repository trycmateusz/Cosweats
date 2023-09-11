import { fetchCollection } from '~/services/fetch'
import type { Currency } from '~/types/Currency'

type State = {
  current: Currency | null
  currencies: Currency[]
}

export const useCurrencyStore = defineStore('CurrencyStore', {
  state: (): State => {
    return {
      current: null,
      currencies: []
    }
  },
  actions: {
    async fetchAll () {
      const currencies = await fetchCollection<Currency>('currencies')
      if (currencies) {
        for (const currencyToSet of currencies) {
          const isSet = this.currencies.find(currency => currency.code === currencyToSet.code)
          if (!isSet) {
            this.currencies.push(currencyToSet)
          }
        }
      }
    },
    setCurrent (currency: Currency) {
      this.current = { ...currency }
    }
  },
  getters: {
    getPriceToShow (state) {
      return (price: number): string => {
        if (state.current) {
          return `${Math.floor(price * state.current.ratio) / 100}`
        } else {
          return '0'
        }
      }
    }
  }
})
