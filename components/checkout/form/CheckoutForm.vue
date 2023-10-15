<template>
  <form
    id="checkoutForm"
    class="grid grid-cols-1 gap-5 max-w-[1000px] sm:grid-cols-2 sm:gap-8"
    @submit.prevent="submitForm"
  >
    <div
      v-for="(attr, key) in formData"
      :key="key"
      class="flex flex-col gap-2 w-full text-2xl justify-end"
    >
      <label
        :for="key"
        :class="{ 'hidden': rulesetsAndActiveErrors[key].error }"
      >
        {{ convertToTitleCaseFromCamelCase(key) }}
      </label>
      <span
        v-if="rulesetsAndActiveErrors[key].error"
        class="text-red-900"
      >
        {{ getErrorMessage(rulesetsAndActiveErrors[key].error, convertToTitleCaseFromCamelCase(key)) }}
      </span>
      <input
        :id="key"
        v-model="formData[key]"
        class="flex-grow rounded-full p-5 border border-borderDarkColor h-min sm:flex-grow-0"
        :class="{ 'bg-red-100': rulesetsAndActiveErrors[key].error }"
        :type="key === 'email' ? 'email' : 'text'"
        @blur="() => {
          rulesetsAndActiveErrors[key].error = null
          if(key === 'city'){
            checkShippingPriceTo(formData[key])
          }
        }"
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { convertToTitleCaseFromCamelCase, getEntries } from '~/helpers'
import type { CheckoutForm, CheckoutFormRule, CheckoutFormRulesetWithActiveErrors } from '~/types/Checkout'
import type { City } from '~/types/City'
const cityApiKey = useRuntimeConfig().public.cityApiKey
const cartStore = useCartStore()
const emit = defineEmits<{
  (e: 'success'): void
  (e: 'shipping-set', price: number): void
}>()
const warehouse: City = {
  name: 'Warsaw',
  latitude: 52.2167,
  longitude: 21.0333,
  country: 'PL',
  population: 1790658,
  is_capital: true
}
const kilometersPerDegree = 111
const centsPerTwoKilometers = 1
const minShippingPriceInCents = 200
const maxShippingPriceInCents = 2000
const formData = ref<CheckoutForm>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  postalCode: '',
  city: ''
})
const rulesetsAndActiveErrors = ref<CheckoutFormRulesetWithActiveErrors>({
  firstName: {
    error: null
  },
  lastName: {
    error: null
  },
  email: {
    error: null,
    ruleset: {
      email: true
    }
  },
  phoneNumber: {
    error: null,
    ruleset: {
      exactLength: 9
    }
  },
  address: {
    error: null
  },
  postalCode: {
    error: null
  },
  city: {
    error: null,
    ruleset: {
      validCity: true
    }
  }
})
const getErrorMessage = (rule: keyof CheckoutFormRule | null, field: string): string => {
  const getError = {
    required: () => {
      return `${field} is required.`
    },
    exactLength: (length: number) => {
      return `${field} field should be exactly ${length} characters long.`
    },
    email: () => {
      return 'Email is not valid.'
    },
    onlyNumber: () => {
      return `${field} field accepts only numbers.`
    },
    validCity: () => {
      return 'City not avaiable for shipping.'
    }
  }
  if (rule === 'exactLength') {
    return getError[rule](9)
  } else if (rule) {
    return getError[rule]()
  } else {
    return ''
  }
}
const checkShippingPriceTo = async (city: string) => {
  if (city.length > 0) {
    const { data, error } = await useFetch<City[]>(`https://api.api-ninjas.com/v1/city?name=${city}`, {
      headers: {
        'X-Api-Key': cityApiKey as string
      }
    })
    if (error.value) {
      rulesetsAndActiveErrors.value.city.error = 'validCity'
    }
    if (data.value) {
      if (!data.value[0]) {
        rulesetsAndActiveErrors.value.city.error = 'validCity'
      } else {
        const city = data.value[0]
        const distanceInDegrees = Math.sqrt(Math.pow(city.latitude - warehouse.latitude, 2) + Math.pow(city.longitude - warehouse.longitude, 2))
        const distance = distanceInDegrees * kilometersPerDegree
        let price = distance * centsPerTwoKilometers
        if (price < minShippingPriceInCents) {
          price = minShippingPriceInCents
        }
        if (price > maxShippingPriceInCents) {
          price = maxShippingPriceInCents
        }
        cartStore.setShipping(price)
      }
    }
  }
}
const isEmpty = (expr: string): boolean => {
  return expr === ''
}
const isOnlyNumbers = (expr: string): boolean => {
  return /^\d+$/.test(expr)
}
const isEmailValid = (expr: string): boolean => {
  return /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/.test(expr)
}
const isFormValid = (): boolean => {
  let valid = true
  const entries = getEntries<CheckoutForm>(formData.value)
  entries.forEach(([key, value]) => {
    if (isEmpty(value)) {
      valid = false
      rulesetsAndActiveErrors.value[key].error = 'required'
      return
    }
    const ruleset = rulesetsAndActiveErrors.value[key].ruleset
    if (ruleset) {
      if (ruleset?.email) {
        if (!isEmailValid(value)) {
          valid = false
          rulesetsAndActiveErrors.value[key].error = 'email'
          return
        }
      }
      if (ruleset?.exactLength) {
        if (value.length !== ruleset?.exactLength) {
          valid = false
          rulesetsAndActiveErrors.value[key].error = 'exactLength'
          return
        }
      }
      if (ruleset?.onlyNumber) {
        if (!isOnlyNumbers(value)) {
          valid = false
          rulesetsAndActiveErrors.value[key].error = 'onlyNumber'
        }
      }
      if (rulesetsAndActiveErrors.value[key].error === 'validCity') {
        valid = false
      }
    }
  })
  return valid
}
const submitForm = () => {
  if (isFormValid()) {
    emit('success')
  }
}
</script>

<style scoped>

</style>
