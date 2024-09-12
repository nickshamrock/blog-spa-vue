export function getNumberSuffix(num: number): string {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${num} комментариев`
  }
  if (lastDigit === 1) {
    return `${num} комментарий`
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${num} комментария`
  }
  return `${num} комментариев`
}
