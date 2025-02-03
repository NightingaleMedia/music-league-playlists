export function customSort(
  data: any[],
  sortBy: string[],
  sortField: string
): any[] {
  const sortByObject = sortBy.reduce((obj, item, index) => {
    return { ...obj, [item]: index }
  }, {})

  return data.sort((a, b) => {
    // @ts-expect-error expected
    const aIndex = sortByObject[a[sortField]]
    // @ts-expect-error expected
    const bIndex = sortByObject[b[sortField]]
    return aIndex - bIndex
  })
}
