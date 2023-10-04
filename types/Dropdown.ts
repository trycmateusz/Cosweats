type DropdownLinkToParams = {
  [key: string]: string
}

export type DropdownLinkTo = {
  name: string
  params: DropdownLinkToParams
}

type DropdownLink = {
  text: string
  to: string
}

export interface Dropdown {
  text: string
  role: string
  expanded: boolean
  id: number
  classes: string[]
  links?: DropdownLink[]
}
