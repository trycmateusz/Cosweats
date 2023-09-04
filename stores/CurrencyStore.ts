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
      currencies?.forEach((currencyToSet) => {
        const isSet = this.currencies.find(currency => currency.code === currencyToSet.code)
        if (!isSet) {
          this.currencies.push(currencyToSet)
        }
      })
    },
    setCurrent (currency: Currency) {
      this.current = { ...currency }
    }
  }
})
