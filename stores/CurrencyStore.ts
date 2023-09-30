import { fetchCollection } from '~/services/fetch'
import type { Currency } from '~/types/Currency'

export const useCurrencyStore = defineStore('CurrencyStore', () => {
  const current = ref<Currency | null>(null)
  const currencies = ref<Currency[]>([])
  const fetchAll = async () => {
    const fetchedCurrencies = await fetchCollection<Currency>('currencies')
    if (fetchedCurrencies) {
      for (const fetchedCurrency of fetchedCurrencies) {
        const isSet = currencies.value.find(currency => currency.code === fetchedCurrency.code)
        if (!isSet) {
          currencies.value.push(fetchedCurrency)
        }
      }
    }
  }
  const setCurrent = (currency: Currency) => {
    current.value = { ...currency }
  }
  const getPriceToShow = (price: number) => {
    if (current.value) {
      return `${Math.floor(price * current.value.ratio) / 100}`
    } else {
      return '0'
    }
  }
  return {
    current,
    currencies,
    fetchAll,
    setCurrent,
    getPriceToShow
  }
})
