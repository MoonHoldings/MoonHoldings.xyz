import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    server_url: 'http://localhost:9000/api',
    axios_config: { headers: { 'Content-Type': 'application/json' } },
  }),
  getters: {
    twitter_url: (state) => `${state.server_url}/auth/twitter`,
  },
  actions: {
    async login(payload) {
      try {
        const response = await axios.post(
          `${this.server_url}/login`,
          payload,
          this.axios_config
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
    async signup(payload) {
      try {
        const response = await axios.post(
          `${this.server_url}/register`,
          payload,
          this.axios_config
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
