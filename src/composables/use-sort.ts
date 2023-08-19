const DESC = (aValue: string, bValue: string) => {
  return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
}
const ASC = (aValue: string, bValue: string) => {
  return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
}

export const useSortBy = (
  data: Array<Record<string, any>>,
  key: string | Function,
  isAsc: boolean = false
): Array<Record<string, any>> => {
  return data.sort((a, b) => {
    const aValue = typeof key === 'function' ? key(a) : a[key]
    const bValue = typeof key === 'function' ? key(b) : b[key]

    return isAsc ? ASC(aValue, bValue) : DESC(aValue, bValue)
  })
}
