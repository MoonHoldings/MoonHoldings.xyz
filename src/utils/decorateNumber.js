export default (num, currency = false) => {
  const numStr = String(num)
  let intPart, fracPart

  if (numStr.includes('.')) {
    intPart = numStr.split('.')[0]
    fracPart = numStr.split('.')[1]

    const countInt = intPart.length
    const countFrac = fracPart.length

    const commaInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (currency === true) {
      if (!intPart || intPart === '0' || intPart === '00') {
        const fixedNum = Number(numStr).toFixed(5).toString()
        return commaInt + '.' + fixedNum.split('.')[1]
      } else {
        const fixedNum = Number(numStr).toFixed(2).toString()
        return commaInt + '.' + fixedNum.split('.')[1]
      }
    } else if (countInt < 3 && countFrac > 6 && currency === false) {
      const fixedNum = Number(numStr).toFixed(6).toString()
      return commaInt + '.' + fixedNum.split('.')[1]
    } else if (countInt === 3 && countFrac > 4 && currency === false) {
      const fixedNum = Number(numStr).toFixed(4).toString()
      return commaInt + '.' + fixedNum.split('.')[1]
    } else if (countInt > 3 && countFrac > 2 && currency === false) {
      const fixedNum = Number(numStr).toFixed(2).toString()
      return commaInt + '.' + fixedNum.split('.')[1]
    } else {
      return commaInt + '.' + fracPart
    }
  } else {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
