import axios from 'axios'

import { SERVER_URL } from '@/constants/api'
import getMoonToken from './getMoonToken'

export default async (historicalData, email) => {
  try {
    const token = getMoonToken()

    const response = await axios.post(
      `${SERVER_URL}/coin-history`,
      {
        historicalData,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )

    const result = await response.data

    if (result.success) {
      return result.coinHistoryData
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
