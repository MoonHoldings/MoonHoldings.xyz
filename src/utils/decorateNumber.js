export default (num) => {
  const numStr = String(num)
  let intPart, fracPart

  if (numStr.includes('.')) {
    intPart = numStr.split('.')[0]
    fracPart = numStr.split('.')[1]

    const countInt = intPart.length
    const countFrac = fracPart.length

    const commaInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (countInt < 3 && countFrac > 6) {
      const fixedNum = Number(numStr).toFixed(6).toString()
      return commaInt + '.' + fixedNum.split('.')[1]
    } else if (countInt === 3 && countFrac > 4) {
      const fixedNum = Number(numStr).toFixed(4).toString()
      return commaInt + '.' + fixedNum.split('.')[1]
    } else if (countInt > 3 && countFrac > 2) {
      const fixedNum = Number(numStr).toFixed(2).toString()
      return commaInt + '.' + fixedNum.split('.')[1]
    } else {
      return commaInt + '.' + fracPart
    }
  } else {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
