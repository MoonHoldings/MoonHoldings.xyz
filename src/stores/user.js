import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    server_url: 'http://localhost:9000/api',
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    gotten_user: null,
  }),
  getters: {
    twitter_url: (state) => `${state.server_url}/auth/twitter`,
  },
  actions: {
    async getUser() {
      try {
        const response = await axios.get(`${this.server_url}/getuser`)
        const result = await response.data

        if (result.success === true) {
          this.gotten_user = result.user
          return this.gotten_user
        } else {
          //
        }
      } catch (error) {
        return error.message
      }
    },
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
        return {
          success: false,
          message: error,
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
        // const { response } = error
        return {
          success: false,
          message: error,
        }
        // return {
        //   success: response.data.success,
        //   message: response.data.message,
        // }
      }
    },
  },
})
