import type { Entries } from '~/types/Entry'

export const convertToTitleCaseFromCamelCase = (expr: string): string => {
  const words = expr.split(/(?=[A-Z])/)
  const wordsCapitalized = words.map(word => word[0].toUpperCase() + word.slice(1, word.length))
  return wordsCapitalized.reduce((word, currentExpression) => word + ' ' + currentExpression, '')
}
export const getEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Entries<T>
}
