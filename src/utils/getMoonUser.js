import cryptoJS from 'crypto-js'

const cryptoSecret = import.meta.env.VITE_CRYPTO_SECRET

export default () => {
  const encryptedMoonUser = localStorage.getItem('MOON_USER')

  if (!encryptedMoonUser) return undefined

  const userBytes = cryptoJS.AES.decrypt(encryptedMoonUser, cryptoSecret)
  const user = JSON.parse(userBytes.toString(cryptoJS.enc.Utf8))

  return user
}
