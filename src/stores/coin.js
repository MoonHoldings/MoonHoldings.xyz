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
    mutate_emptyCoins() {
      this.coins = []
    },
    async fetchCoins() {
      try {
        const response = await axios.get(
          `${this.server_url}/coins`,
          this.axios_config
        )
        const result = await response.data
        const coinsArr = result.coins.map(coin=>coin)
        localStorage.setItem("coins", JSON.stringify(coinsArr))
      } catch (error) {
        console.log(error.message)
      }
    },
    getCoins(){
      this.coins = JSON.parse(localStorage.getItem("coins"))
    }
  },
})
