// import axios from 'axios'
// import { useCookies } from 'vue3-cookies'

// import { SERVER_URL } from '@/constants/api'

// const { cookies } = useCookies()

// export default async (historicalData, email) => {
//   try {
//     const token = cookies.get('MOON_TOKEN')

//     const response = await axios.post(
//       `${SERVER_URL}/coin-history`,
//       {
//         historicalData,
//         email,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       }
//     )

//     const result = await response.data

//     if (result.success) {
//       return result.coinHistoryData
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//     }
//   }
// }
