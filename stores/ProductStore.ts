import cloneDeep from 'lodash/cloneDeep'
import { sortSizes } from '~/helpers'
import { fetchCollection, fetchOnCondition } from '~/services/fetch'
import type { Product, ProductForCart, ProductFilterConditions, ProductSort } from '~/types/Product.js'
import type { Color } from 'types/Color'
import type { Size } from 'types/Size'
import { isColor } from '~/types/Color'
import { isSize } from '~/types/Size'

export const useProductStore = defineStore('ProductStore', () => {
  const active = ref<ProductForCart | null>(null)
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const appliedFilters = ref<ProductFilterConditions | null>(null)
  const appliedSort = ref<ProductSort | null>(null)
  const fetchAll = async (): Promise<void> => {
    const fetchedProducts = await fetchCollection<Product>('products')
    if (fetchedProducts) {
      for (const fetchedProduct of fetchedProducts) {
        const isSet = products.value.find(sweatshirt => sweatshirt.id === fetchedProduct.id)
        if (!isSet) {
          products.value.push({ ...fetchedProduct })
        }
      }
    }
  }
  const fetchPossibleCategories = async () => {
    const fetchedCategories = await fetchCollection<string>('categories')
    if (fetchedCategories) {
      categories.value = [...fetchedCategories]
    } else {
      throw createError({ statusCode: 500, statusMessage: 'Problem when fetching product categories. Try again later.' })
    }
  }
  const fetchCategory = async (category: string): Promise<void> => {
    const fetchedProducts = await fetchOnCondition<Product>('products', 'category', category)
    if (fetchedProducts) {
      for (const fetchedProduct of fetchedProducts) {
        const isSet = products.value.find(sweatshirt => sweatshirt.id === fetchedProduct.id)
        if (!isSet) {
          products.value.push({ ...fetchedProduct })
        }
      }
    }
  }
  const setActive = (product: ProductForCart): void => {
    active.value = { ...product }
  }
  const setColor = (color: Color, product: ProductForCart): void => {
    product.color = color
  }
  const setSize = (size: Size, product: ProductForCart): void => {
    product.size = size
  }
  const setFilters = (filters: ProductFilterConditions | null) => {
    if (filters) {
      appliedFilters.value = cloneDeep(filters)
    } else {
      appliedFilters.value = null
    }
  }
  const removeFilter = (filter: Color | Size) => {
    if (appliedFilters.value) {
      if (isColor(filter)) {
        const index = appliedFilters.value.colors.findIndex(color => color === filter)
        appliedFilters.value.colors.splice(index, 1)
      }
      if (isSize(filter)) {
        const index = appliedFilters.value.sizes.findIndex(color => color === filter)
        appliedFilters.value.sizes.splice(index, 1)
      }
    }
  }
  const setSort = (sort: ProductSort | null) => {
    appliedSort.value = sort
  }
  const areAnyFilters = computed(() => {
    return appliedFilters.value && (appliedFilters.value.sizes.length > 0 || appliedFilters.value.colors.length > 0)
  })
  const getPhotoUrl = (product: Product | ProductForCart) => {
    return product.photoUrls[product.colors[0]]
  }
  const getProductsFrom = computed(() => {
    return (category: string) => {
      return products.value.filter(product => product.category === category)
    }
  })
  const getProductsMatchingFilters = computed(() => {
    return (products: Product[]) => {
      if (appliedFilters.value && areAnyFilters.value) {
        return products.filter((product) => {
          for (const size of product.sizes) {
            if (appliedFilters.value?.sizes.includes(size.value)) {
              return true
            }
          }
          for (const color of product.colors) {
            if (appliedFilters.value?.colors.includes(color)) {
              return true
            }
          }
          return false
        })
      } else {
        return products
      }
    }
  })
  const getAllSizes = computed(() => {
    return products.value.map(product => [...product.sizes.map(size => size.value)])
  })
  const getPossibleSizes = computed(() => {
    return new Set(sortSizes(getAllSizes.value.flat()))
  })
  const getAllColors = computed(() => {
    return products.value.map(product => [...product.colors])
  })
  const getPossibleColors = computed(() => {
    return new Set(getAllColors.value.flat().sort())
  })
  watch(appliedSort, () => {
    const sortProductsByName = (current: Product, next: Product) => {
      return current.name.localeCompare(next.name)
    }
    const sortProductsByPrice = (current: Product, next: Product) => {
      return current.priceInCents - next.priceInCents
    }
    if (appliedSort.value === 'alphabetically-a-z') {
      products.value.sort(sortProductsByName)
    } else if (appliedSort.value === 'alphabetically-z-a') {
      products.value.sort(sortProductsByName).reverse()
    } else if (appliedSort.value === 'price-ascending') {
      products.value.sort(sortProductsByPrice)
    } else if (appliedSort.value === 'price-descending') {
      products.value.sort(sortProductsByPrice).reverse()
    }
  })
  return {
    active,
    products,
    categories,
    appliedFilters,
    appliedSort,
    fetchAll,
    fetchCategory,
    fetchPossibleCategories,
    setActive,
    setColor,
    setSize,
    setFilters,
    setSort,
    removeFilter,
    areAnyFilters,
    getPhotoUrl,
    getProductsFrom,
    getProductsMatchingFilters,
    getPossibleSizes,
    getPossibleColors
  }
})
