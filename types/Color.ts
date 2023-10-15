export type Color = 'black' | 'blue' | 'brown' | 'claret' | 'green' | 'khaki' | 'orange' | 'pink' | 'purple' | 'red' | 'white'

const Colors = ['black', 'blue', 'brown', 'claret', 'green', 'khaki', 'orange', 'pink', 'purple', 'red', 'white']

export const isColor = (value: string): value is Color => {
  return Colors.includes(value)
}
