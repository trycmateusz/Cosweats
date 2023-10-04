import type { Discount, DiscountFetchErrorMessage } from '~/types/Discount'
import { fetchOne } from '~/services/fetch'

const discount = ref<Discount | null>(null)
const errorMessage = ref<string | null>(null)
const errors: DiscountFetchErrorMessage = {
  invalid: 'Discount doesn\'t exist.',
  alreadyApplied: 'This code is already applied.'
}
const fetchDiscount = async (code: string) => {
  const fetchedDiscount = await fetchOne<Discount>('discounts', code, 'code')
  if (!fetchedDiscount) {
    errorMessage.value = errors.invalid
  } else if (fetchedDiscount.code !== discount.value?.code) {
    discount.value = { ...fetchedDiscount }
    setErrorMessageToNull()
  } else {
    errorMessage.value = errors.alreadyApplied
  }
}
const setErrorMessageToNull = () => {
  errorMessage.value = null
}

export const useDiscount = () => {
  return {
    discount,
    fetchDiscount,
    errorMessage,
    setErrorMessageToNull
  }
}
