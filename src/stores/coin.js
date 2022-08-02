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
    mutate_emptyCoins(){
      this.coins = []
    },
    async getCoins(payload) {
      try {
        const response = await axios.get(
          `${this.server_url}/coins`,
          this.axios_config
        )
        const result = await response.data
        const coinsArr = [...result.coins]
        coinsArr.forEach(coin=>{
          const coinChar = coin.id.slice(0,payload.length)
          if(coinChar === payload){
            this.coins.push(coin)
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    },
  },
})
