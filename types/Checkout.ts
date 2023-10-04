export interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  postalCode: string
  city: string
}

export type CheckoutFormRule = {
  required?: boolean
  exactLength?: number
  email?: boolean
  onlyNumber?: boolean
}

export type CheckoutFormRuleErrorMessage = {
  [each in keyof CheckoutFormRule]: string
}

export type CheckoutFormRulesetWithActiveErrors = {
  [each in keyof CheckoutForm]: {
    error: null | keyof CheckoutFormRule,
    ruleset?: CheckoutFormRule
  }
}
