const baseApiUrl = 'https://cosweats-default-rtdb.europe-west1.firebasedatabase.app'

export const fetchCollection = async <Resource>(resourcePlural: string): Promise<Resource[] | undefined> => {
  const url = `${baseApiUrl}/${resourcePlural}.json`
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
