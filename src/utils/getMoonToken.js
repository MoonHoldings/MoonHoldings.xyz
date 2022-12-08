import cryptoJS from 'crypto-js'

const cryptoSecret = import.meta.env.VITE_CRYPTO_SECRET

export default () => {
  const encryptedToken = localStorage.getItem('MOON_TOKEN')

  if (!encryptedToken) return undefined

  const tokenBytes = cryptoJS.AES.decrypt(encryptedToken, cryptoSecret)
  const token = tokenBytes.toString(cryptoJS.enc.Utf8)

  return token
}
