import { defineStore } from 'pinia'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

export const useNftStore = defineStore('nft', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}`,
    shyft_url: `${import.meta.env.VITE_SHYFTSERVER_URL}`,
    shyft_key: `${import.meta.env.VITE_SHYFT_KEY}`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    portfolio: {}
  }),
  getters: {
    get_portfolio(state) {
      return state.portfolio
    }
  },
  actions: {
    mutate_emptyPortfolio() {
      this.portfolio = {}
    },
    async connectWalletWithAddress(walletAddress) {
      try {
        const response = await axios.get(
          `${this.shyft_url}/wallet/get_portfolio?network=mainnet-beta&wallet=${walletAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': `${this.shyft_key}`
            }
          }
        )

        const result = await response.data
        if (result.success) {
          this.portfolio = result.result
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async connectWallet() {}
  }
})