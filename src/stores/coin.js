import { defineStore } from 'pinia'
import axios from 'axios'

export const useCoinStore = defineStore('coin', {
  state: () => ({
    server_url: 'http://localhost:9000/api',
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    coins: [],
  }),
  getters: {},
  actions: {
    async getCoins() {
      try {
        const response = await axios.get(
          `${this.server_url}/coins`,
          this.axios_config
        )
        const result = await response.data
        this.coins = result.coins
      } catch (error) {
        console.log(error.message)
      }
    },
  },
})
