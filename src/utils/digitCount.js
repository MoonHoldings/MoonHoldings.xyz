export default (num) => {
  let digitNum

  const numStr = num.toString()
  if (numStr.includes('.')) {
    const integer = numStr.split('.')[0]
    const decimal = numStr.split('.')[1]

    if (decimal.length > 6) {
      digitNum = integer.length + 6
    } else {
      digitNum = integer.length + decimal.length
    }

    return digitNum
  }

  return numStr.length
}
