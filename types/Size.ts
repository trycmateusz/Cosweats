export type Size = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

const Sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']

export const isSize = (value: string): value is Size => {
  return Sizes.includes(value)
}
