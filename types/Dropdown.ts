type DropdownLink = {
  text: string
  to: string
}

export default interface Dropdown {
  text: string
  role: string
  expanded: boolean
  id: number
  classes: string[]
  links?: DropdownLink[]
}
