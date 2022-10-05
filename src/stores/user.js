import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}/api`,
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
        mixpanel.track('Error: user.js > inviteBetaTester', {
          'error': error,
          'message': error.message
        })
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
        mixpanel.track('Error: user.js > getUser', {
          'error': error,
          'message': error.message
        })
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
        mixpanel.track('Error: user.js > login', {
          'error': error,
          'message': error.message,
          'payload': payload
        })
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
        mixpanel.track('Error: user.js > signup', {
          'error': error,
          'message': error.message,
          'payload': payload
        })
        return {
          success: false,
          message: error,
        }
      }
    },
    async sendNewsletter(payload) {
      try {
        const response = await axios.post(
          `${this.server_url}/send-newsletter`,
          payload,
          this.axios_config
        )
        const result = await response.data
        return result
      } catch (error) {
        mixpanel.track('Error: user.js > sendNewsletter', {
          'error': error,
          'message': error.message,
          'payload': payload
        })
        return {
          success: false,
          message: error,
        }
      }
    },
  },
})
