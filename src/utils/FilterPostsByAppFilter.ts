export function matchesFilters(post: any, selectedFilters: string[]): boolean {
  return (
    selectedFilters.length === 0 || post.tags.some((tag: string) => selectedFilters.includes(tag))
  )
}

export function matchesSearchQuery(post: any, searchQuery: string): boolean {
  const query = searchQuery.toLowerCase()
  return post.description.toLowerCase().includes(query) || post.text.toLowerCase().includes(query)
}
