const baseApiUrl = 'https://cosweats-default-rtdb.europe-west1.firebasedatabase.app'

export const fetchCollection = async <Resource>(resourcePlural: string): Promise<Resource[] | undefined> => {
  const url = `${baseApiUrl}/${resourcePlural}.json`
  console.log(`Fetching ${resourcePlural} from: ${url}`)
  const { data, error } = await useFetch<Resource>(url)
  if (error.value) {
    console.log(`Error while fetching: ${resourcePlural}`, error.value)
    return undefined
  }
  if (data.value) {
    const resources: Resource[] = Object.values(data.value)
    return resources
  }
}

export const fetchOne = async<Resource>(resourcePlural: string, id: string, idKey: string): Promise<Resource | undefined> => {
  const url = `${baseApiUrl}/${resourcePlural}.json?orderBy="${idKey}"&equalTo="${id}"`
  console.log(`Fetching a resource from ${resourcePlural} from: ${url}`)
  const { data, error } = await useFetch<Resource>(url)
  if (error.value) {
    console.log(`Error while fetching a resource from: ${resourcePlural}`, error.value)
    return undefined
  }
  if (data.value) {
    const resourceInArray: Resource[] = Object.values(data.value)
    return resourceInArray[0]
  }
}
