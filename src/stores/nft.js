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
    nfts: []
  }),
  getters: {
    get_nfts(state) {
      return state.nfts
    }
  },
  actions: {
    mutate_emptyNfts() {
      this.nfts = []
    },
    async connectWalletWithAddress(walletAddress) {
      const user = cookies.get('MOON_USER')
      const token = cookies.get('MOON_TOKEN')

      try {
        const response = await axios.get(
          `${this.shyft_url}/wallet/get_portfolio?network=devnet&wallet=${walletAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
              'x-api-key'
            }
          }
        )

        const result = await response.data
        if (result.success) {
          console.log('get portfolio', result)
        }
      } catch (error) {

      }
    },
    async connectWallet() {}
  }
})