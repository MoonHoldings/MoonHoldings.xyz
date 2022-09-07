import { defineStore } from 'pinia'
import axios from 'axios'

const localhost_api_url = 'http://localhost:9000/api'
const prod_api_url = 'https://moonserver.herokuapp.com/api'
const api_url = prod_api_url // TODO Change this local / prod

export const useCoinStore = defineStore('coin', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}/api`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    coins: [],
  }),
  getters: {},
  actions: {
    mutate_emptyCoins() {
      this.coins = []
    },
    getSingleCoin() {
      //
    },
    async fetchCoins() {
      try {
        const response = await axios.get(
          `${this.server_url}/coins`,
          this.axios_config
        )
        const result = await response.data
        const coinsArr = result.coins.map((coin) => coin)
        localStorage.setItem('coins', JSON.stringify(coinsArr))
      } catch (error) {
        console.log(error.message)
      }
    },
    getCoins() {
      this.coins = JSON.parse(localStorage.getItem('coins'))
      console.log(this.coins)
    },
  },
})
