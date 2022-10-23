export default (num) => {
  const numStr = String(num)
  const digits = numStr.match(/[0-9]/g)

  return digits.length
}
