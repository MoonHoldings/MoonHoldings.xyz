import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    server_url: 'http://localhost:9000/api',
  }),
  getters: {},
  actions: {
    async signup(payload) {
      console.log(`${this.server_url}/register`)
      try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const response = await axios.post(
          `${this.server_url}/register`,
          payload,
          config
        )

        const result = await response.data
        return result
      } catch (error) {
        const { response } = error
        return {
          success: response.data.success,
          message: response.data.message,
        }
      }
    },
  },
})
