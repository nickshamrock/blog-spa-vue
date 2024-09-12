export function parseDate(dateString: string): Date {
  const [day, month] = dateString.split(' ')
  const monthMap: { [key: string]: number } = {
    Янв: 0,
    Фев: 1,
    Мар: 2,
    Апр: 3,
    Май: 4,
    Июн: 5,
    Июл: 6,
    Авг: 7,
    Сен: 8,
    Окт: 9,
    Ноя: 10,
    Дек: 11
  }
  return new Date(new Date().getFullYear(), monthMap[month], parseInt(day, 10))
}
