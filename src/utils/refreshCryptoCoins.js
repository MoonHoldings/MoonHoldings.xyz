import axios from 'axios'
import { useCookies } from 'vue3-cookies'

import { SERVER_URL } from '@/constants/api'

const { cookies } = useCookies()

export default async (cryptoCoins) => {
  try {
    const token = cookies.get('MOON_TOKEN')

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
