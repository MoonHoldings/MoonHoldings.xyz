import cryptoJS from 'crypto-js'

const cryptoSecret = import.meta.env.VITE_CRYPTO_SECRET

export default (moonUser) => {
  const encodedMoonUser = cryptoJS.AES.encrypt(
    JSON.stringify(moonUser),
    cryptoSecret
  ).toString()

  localStorage.setItem('MOON_USER', encodedMoonUser)
}
