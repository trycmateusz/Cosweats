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
  const setCurrent = (currencyCode: string) => {
    const newCurrent = currencies.value.find(currency => currency.code === currencyCode)
    if (newCurrent) {
      current.value = { ...newCurrent }
      document.cookie = `currencyCode=${currencyCode}`
    }
  }
  const formatPriceToShow = (price: number) => {
    if (current.value) {
      return `${(Math.floor(price * current.value.ratio) / 100).toFixed(2)}`
    } else {
      return '...'
    }
  }
  const setCurrentInitially = () => {
    const cookies = document.cookie.split(';')
    const currencyCookie = cookies.find(cookie => cookie.includes('currencyCode'))
    if (currencyCookie) {
      const currencyCode = currencyCookie.split('=')[1]
      setCurrent(currencyCode)
    } else {
      const userLanguage = navigator.language.toLowerCase()
      const languageCurrency = currencies.value.find(currency => currency.countryLanguageCode === userLanguage)
      if (languageCurrency) {
        setCurrent(languageCurrency.code)
      } else {
        setCurrent('EUR')
      }
    }
  }
  onMounted(() => {
    setCurrentInitially()
  })
  return {
    current,
    currencies,
    fetchAll,
    setCurrent,
    formatPriceToShow
  }
})
