import cryptoJS from 'crypto-js'

const cryptoSecret = import.meta.env.VITE_CRYPTO_SECRET

export default (accessToken) => {
  const encodedToken = cryptoJS.AES.encrypt(
    accessToken,
    cryptoSecret
  ).toString()

  localStorage.setItem('MOON_TOKEN', encodedToken)
}
