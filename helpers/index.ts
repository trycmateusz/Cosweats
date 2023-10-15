import type { Entries } from '~/types/Entry'
import type { Size } from '~/types/Size'

export const convertToTitleCaseFromCamelCase = (expr: string): string => {
  const words = expr.split(/(?=[A-Z])/)
  const wordsCapitalized = words.map(word => word[0].toUpperCase() + word.slice(1, word.length))
  return wordsCapitalized.reduce((word, currentExpression) => word + ' ' + currentExpression, '')
}
export const getEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Entries<T>
}
export const sortSizes = (sizes: Size[]): Size[] => {
  const order: Size[] = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
  const sizesOrdered = sizes.map(size => order.indexOf(size)).sort()
  return sizesOrdered.map(index => order[index])
}
