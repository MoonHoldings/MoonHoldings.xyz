export default (num) => {
  let finalNum
  // Convert to String
  const numStr = String(num)
  // String Contains Decimal
  if (numStr.includes('.')) {
    let intNum, fractionNum
    intNum = numStr.split('.')[0]
    fractionNum = numStr.split('.')[1]

    const prettyIntNum = intNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    finalNum = prettyIntNum + '.' + fractionNum
  } else {
    finalNum = numStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return finalNum
}
