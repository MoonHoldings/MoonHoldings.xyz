import { defineStore } from 'pinia'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export const useCoinStore = defineStore('coin', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}/api`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    modalCoin: {},
    portfolioCoins: [],
    coins: [],
  }),
  getters: {
    get_modalCoin(state) {
      return state.modalCoin
    },
    get_modalCoinWallets(state) {
      return state.modalCoin.wallets
    },
    get_walletsLength(state) {
      return this.get_modalCoinWallets?.length
    },
    get_unsavedWalletExist(state) {
      const unsavedWallet = state.modalCoin.wallets.find(
        (wallet) => wallet.saved === false
      )

      if (unsavedWallet) {
        return true
      } else {
        return false
      }
    },
  },
  actions: {
    mutate_emptyCoins() {
      this.coins = []
    },
    mutate_emptyModalCoin() {
      this.modalCoin = {}
    },
    addPortfolioCoin(totalHoldings, totalValue) {
      this.modalCoin.totalHoldings = totalHoldings
      this.modalCoin.totalValue = totalValue

      this.portfolioCoins.push(this.modalCoin)
      this.modalCoin = {}
    },
    addNewWallet() {
      const emptyWallet = this.modalCoin.wallets.find(
        (wallet) => wallet.saved === false
      )
      if (!emptyWallet) {
        this.modalCoin.wallets.push({
          name: '',
          holding: null,
          value: null,
          saved: false,
        })
      }
    },
    removeNewWallet() {
      const unsavedWalletIndex = this.modalCoin.wallets.findIndex(
        (wallet) => wallet.saved === false
      )
      this.modalCoin.wallets.splice(unsavedWalletIndex, 1)
    },
    addHoldings(walletName, holding) {
      const unsavedWalletIndex = this.modalCoin.wallets.findIndex(
        (wallet) => wallet.saved === false
      )
      const totalValue = Number(this.modalCoin.price) * Number(holding)
      this.modalCoin.wallets[unsavedWalletIndex].name = walletName
      this.modalCoin.wallets[unsavedWalletIndex].holding = holding
      this.modalCoin.wallets[unsavedWalletIndex].value = totalValue
      this.modalCoin.wallets[unsavedWalletIndex].saved = true
    },
    totalPortfolioValue() {
      let totalValue = 0
      const allCoins = this.portfolioCoins

      allCoins.forEach((coin) => {
        totalValue += Number
      })
    },
    async getSingleCoin(coinId) {
      const NOMICS_KEY = import.meta.env.VITE_NOMICS_KEY
      try {
        const response = await axios.get(
          `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&ids=${coinId}&intervals=1d,30d`
        )

        const coin = response.data[0]

        const _24hr = coin['1d'] ? coin['1d']['price_change_pct'] : ''

        this.modalCoin = {
          id: coin?.id,
          symbol: coin?.symbol,
          name: coin?.name,
          price: coin?.price,
          logo_url: coin?.logo_url,
          _24hr,
          wallets: [],
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
        }
      }
    },
    async getAllCoinsBrowser() {
      let allCoins
      try {
        const docRef = await doc(db, 'coins', 'all_coins')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          allCoins = docSnap.data()
        } else {
          console.log('Firestore error')
        }

        localStorage.setItem('MoonCoins', JSON.stringify(allCoins))
      } catch (error) {
        console.log(error.message)
      }
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
