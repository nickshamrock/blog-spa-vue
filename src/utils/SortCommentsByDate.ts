export const parseDate = (dateStr: string): Date => {
  const [datePart, timePart] = dateStr.split(' в ')
  const [day, month, year] = datePart.split('.')
  const [hours, minutes] = timePart.split(':')
  return new Date(+year, +month - 1, +day, +hours, +minutes)
}

export const sortComments = (comments: { author: string; text: string; date: string }[]) => {
  return [...comments].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime()
  })
}
