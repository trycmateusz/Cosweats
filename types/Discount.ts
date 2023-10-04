export interface Discount {
  code: string
  percentage: number
  multiplier: number
}

export type DiscountFetchError = 'invalid' | 'alreadyApplied' | null

export type DiscountFetchErrorMessage = {
  [each in NonNullable<DiscountFetchError>]: string
}
