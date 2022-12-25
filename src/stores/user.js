import { defineStore } from 'pinia'
import axios from 'axios'
import getMoonToken from '@/utils/getMoonToken'
import getMoonUser from '@/utils/getMoonUser'

export const useUserStore = defineStore('user', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}/api`,
    axios_config: {
      headers: { 'Content-Type': 'application/json' },
    },
    gotten_user: null,
    historicalData: [],
  }),
  getters: {},
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
          error: error,
          message: error.message,
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
        const response = await axios.get(`${this.server_url}/get-user`)
        // const result = await response.data

        return response
      } catch (error) {
        mixpanel.track('Error: user.js > getUser', {
          error: error,
          message: error.message,
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
          error: error,
          message: error.message,
          payload: payload,
        })
        return {
          success: false,
          message: error.response.data.message,
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
          error: error,
          message: error.message,
          payload: payload,
        })
        return {
          success: false,
          message: error,
        }
      }
    },
    async deleteAccount() {
      try {
        const token = getMoonToken()
        const user = getMoonUser()
        const response = await axios.post(
          `${this.server_url}/delete-user-account`,
          {
            email: user.email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        )

        return response.data
      } catch (error) {
        return {
          success: false,
          message: error.message,
        }
      }
    },
    async getHistory() {
      const token = getMoonToken()
      try {
        const response = await axios.get(`${this.server_url}/get-history`, {
          headers: {
            Authorization: token,
          },
        })
        const data = await response.data

        this.historicalData = data.historicalData
      } catch (error) {
        console.log(error)
      }
    },
    async forgotPassword(email) {
      try {
        const response = await axios.post(
          `${this.server_url}/password/forgot-password`,
          { email },
          this.axios_config
        )
        const result = await response.data
        return result
      } catch (error) {
        return {
          success: false,
          message: error.message,
        }
      }
    },
    async saveNewPassword(newPassword, resetToken) {
      try {
        const response = await axios.put(
          `${this.server_url}/password/reset/new-password`,
          { password: newPassword, token: resetToken },
          this.axios_config
        )
        const result = await response.data
        return result
      } catch (error) {
        return {
          success: false,
          message: error.message,
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
          error: error,
          message: error.message,
          payload: payload,
        })
        return {
          success: false,
          message: error,
        }
      }
    },
  },
})
