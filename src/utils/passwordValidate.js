export default function (password) {
  const letters = password.match(/[A-z]/g)
  const numbers = password.match(/[0-9]/g)
  const specialChars = password.match(/[^A-z0-9\s]/g)

  if (
    password.length >= 8 &&
    letters !== null &&
    numbers !== null &&
    specialChars !== null
  ) {
    return true
  } else {
    return false
  }
}
