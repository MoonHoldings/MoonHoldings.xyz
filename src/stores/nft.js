import { defineStore } from 'pinia'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

export const useNftStore = defineStore('nft', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}/api`,
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
    async addSolanaWallet(walletAddress) {},
    async connectWallet() {}
  }
})