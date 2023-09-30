import type { Discount } from '~/types/Discount'
import { fetchOne } from '~/services/fetch'

export const useDiscount = () => {
  const discount = ref<Discount | null>(null)
  const fetchDiscount = async (code: string) => {
    const fetchedDiscount = await fetchOne<Discount>('discounts', code, 'code')
    if (fetchedDiscount) {
      discount.value = { ...fetchedDiscount }
    }
  }
  return {
    discount,
    fetchDiscount
  }
}
