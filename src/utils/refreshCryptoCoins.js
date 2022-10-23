import axios from 'axios'

export default async (server_url, cryptoCoins, token) => {
  const response = await axios.post(
    `${server_url}/refresh-coins`,
    { cryptoCoins },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )

  const result = await response.data

  return result.coins
}
