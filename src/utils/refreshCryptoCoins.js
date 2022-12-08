import axios from 'axios'
import { SERVER_URL } from '@/constants/api'
import getMoonToken from './getMoonToken'

export default async (cryptoCoins) => {
  try {
    const token = getMoonToken()

    const response = await axios.post(
      `${SERVER_URL}/refresh-coins`,
      {
        cryptoCoins,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )

    const result = response.data

    if (result.success) {
      return result.updatedCoins
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
