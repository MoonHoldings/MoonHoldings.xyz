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
    portfolio: {},
    nfts: []
  }),
  getters: {
    get_portfolio(state) {
      return state.portfolio
    },
    get_nfts(state) {
      return state.nfts
    }
  },
  actions: {
    mutate_emptyPortfolio() {
      this.portfolio = {}
    },
    mutate_emptyNfts() {
      this.nfts = []
    },
    async connectWalletWithAddress(walletAddress) {
      try {
        const portfolioResponse = await axios.get(
          `${this.shyft_url}/wallet/get_portfolio?network=mainnet-beta&wallet=${walletAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': `${this.shyft_key}`
            }
          }
        )

        const portfolioResult = await portfolioResponse.data

        if (portfolioResult.success) {
          this.portfolio = portfolioResult.result
        }

        const nftsResponse = await axios.get(
          `${this.shyft_url}/nft/read_all?network=mainnet-beta&address=${walletAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': `${this.shyft_key}`
            }
          }
        )

        const nftsResult = await nftsResponse.data

        if (nftsResult.success) {
          this.nfts = nftsResult.result
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async connectWallet() {}
  }
})