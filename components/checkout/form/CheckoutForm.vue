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
        v-model="formData[key]"
        class="flex-grow rounded-full p-5 border border-borderDarkColor h-min sm:flex-grow-0"
        :class="{ 'bg-red-100': rulesetsAndActiveErrors[key].error }"
        :type="key === 'email' ? 'email' : 'text'"
        @blur="rulesetsAndActiveErrors[key].error = null"
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { convertToTitleCaseFromCamelCase, getEntries } from '~/helpers'
import type { CheckoutForm, CheckoutFormRule, CheckoutFormRulesetWithActiveErrors } from '~/types/Checkout'
// IMPORTANT!
// if you are about to review this code, please forgive me.
// i am fully aware of the spaghetti I made here. I sincerely apologise for this monstrosity.
// I tried to my best abilities to create a universal form, but it seems taking the easy way (making individual inputs and handling them inidividually) would probably be a better idea.
// even though I am aware of this, I spent too much time on this solution and I don't plan to scrap it.
// I learned a lot. It was painful. But I finished it.
// thank you for your attention.
// ~ sincerely, a junior web developer in tears, ready to cry himself to sleep .
const router = useRouter()
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
    error: null
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
    }
  })
  return valid
}
const submitForm = () => {
  if (isFormValid()) {
    router.push('/shop')
  }
}
</script>

<style scoped>

</style>
