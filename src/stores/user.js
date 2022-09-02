import { defineStore } from 'pinia'
import axios from 'axios'

const localhost_api_url = 'http://localhost:9000/api'
const prod_api_url = 'https://moon-server.vercel.app/api'
// const prod_api_url = 'https://moon-server.vercel.app/api'
const api_url = prod_api_url // * Change this local / prod

export const useUserStore = defineStore('user', {
  state: () => ({
    server_url: api_url,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    gotten_user: null,
  }),
  getters: {
    twitter_url: (state) => `${state.server_url}/auth/twitter`,
  },
  actions: {
    async inviteBetaTester(payload) {
      try {
        const response = await axios.post(
          `${this.server_url}/invite`,
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
