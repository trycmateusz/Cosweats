export const fetchCollection = async <Resource>(resourcePlural: string): Promise<Resource[] | undefined> => {
  const config = useRuntimeConfig()
  const url = `${config.public.apiUrl}/${resourcePlural}.json`
  console.log(`Fetching ${resourcePlural} from: ${url}`)
  const { data, error } = await useFetch<Resource>(url)
  if (error.value) {
    // eslint-disable-next-line no-console
    console.log(`Error while fetching: ${resourcePlural}`, error.value)
    return undefined
  }
  if (data.value && data.value !== null) {
    const values: Resource[] = Object.values(data.value)
    return values
  }
}
