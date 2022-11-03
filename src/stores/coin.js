import { defineStore } from 'pinia'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

export const useCoinStore = defineStore('coin', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}/api`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    modalCoin: {},
    cryptoCoins: [],
    coins: [],
    user_coins_history: [],
  }),
  getters: {
    get_cryptoCoins(state) {
      return state.cryptoCoins
    },
    get_totalPortfolioValue() {
      let totalValue = 0
      const allCoins = this.get_cryptoCoins

      for (let i = 0; i < allCoins.length; i++) {
        totalValue += allCoins[i].totalValue
      }
      return totalValue
    },
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
      const unsavedWallet = state.modalCoin.wallets?.find(
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
    mutate_cryptoCoin(payload) {
      this.cryptoCoins.push(payload)
    },
    mutate_cryptoCoins(payload) {
      this.cryptoCoins = payload
    },
    mutate_emptyCryptoCoins() {
      this.cryptoCoins = []
    },
    mutate_modalCoin(payload) {
      this.modalCoin = payload
    },
    mutate_user_coins_history(payload) {
      this.user_coins_history = payload
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
    cancelNewWallet() {
      const cancelNewWallet = this.modalCoin.wallets.findIndex(
        (wallet) => wallet.saved === false
      )

      if (
        this.modalCoin.wallets[cancelNewWallet].name !== '' &&
        this.modalCoin.wallets[cancelNewWallet].holding
      ) {
        this.modalCoin.wallets[cancelNewWallet].saved = true
      } else {
        this.modalCoin.wallets.splice(cancelNewWallet, 1)
      }
    },
    unsaveWallet(walletName) {
      const walletIndex = this.modalCoin.wallets.findIndex(
        (wallet) => wallet.name === walletName
      )
      this.modalCoin.wallets[walletIndex].saved = false
    },
    removeWallet(walletName) {
      const walletIndex = this.modalCoin.wallets.findIndex(
        (wallet) => wallet.name === walletName
      )
      this.modalCoin.wallets.splice(walletIndex, 1)
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
    async addCryptoCoin(totalHoldings, totalValue) {
      this.modalCoin.totalHoldings = totalHoldings
      this.modalCoin.totalValue = totalValue

      try {
        let response
        const user = cookies.get('MOON_USER')
        const recordCoin = user.portfolio.coins.find(
          (c) => c.id === this.modalCoin.id
        )
        const token = cookies.get('MOON_TOKEN')

        if (recordCoin) {
          response = await axios.put(
            `${this.server_url}/update-coin`,
            {
              coin: this.modalCoin,
              email: user.email,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            }
          )

          const result = await response.data
          if (result.success) {
            const coinIndex = user.portfolio.coins.findIndex(
              (coin) => coin.id === this.modalCoin.id
            )
            user.portfolio.coins[coinIndex] = this.modalCoin
            cookies.set('MOON_USER', user)
            const pCoinIndex = this.cryptoCoins.findIndex(
              (coin) => coin.id === this.modalCoin.id
            )
            this.cryptoCoins[pCoinIndex] = this.modalCoin
          }
        } else {
          response = await axios.put(
            `${this.server_url}/save-coin`,
            {
              coin: this.modalCoin,
              email: user.email,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            }
          )
          const result = await response.data
          if (result.success) {
            user.portfolio.coins.push(this.modalCoin)
            cookies.set('MOON_USER', user)
            this.mutate_cryptoCoin(this.modalCoin)
          }
        }
      } catch (error) {
        console.log(error.message)
      }

      this.modalCoin = {}
    },
    async removeCryptoCoin() {
      const user = cookies.get('MOON_USER')
      const token = cookies.get('MOON_TOKEN')
      try {
        const response = await axios.put(
          `${this.server_url}/remove-coin`,
          {
            coinId: this.modalCoin.id,
            email: user.email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        )

        const result = await response.data

        if (result.success) {
          // removing from state
          const coinIndex = this.cryptoCoins.findIndex(
            (coin) => coin.id === this.modalCoin.id
          )
          this.cryptoCoins.splice(coinIndex, 1)

          // removing from cookies
          const cookiesCoinIndex = user.portfolio.coins.findIndex(
            (coin) => coin.id === this.modalCoin.id
          )
          user.portfolio.coins.splice(cookiesCoinIndex, 1)
          cookies.set('MOON_USER', user)
        }
      } catch (error) {
        console.log(error.message)
      }

      this.modalCoin = {}
    },
    async getSingleCoin(coinId) {
      const token = cookies.get('MOON_TOKEN')
      try {
        const response = await axios.post(
          `${this.server_url}/get-coin`,
          { coinId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        )

        const result = await response.data

        this.modalCoin = result.coin
      } catch (error) {
        mixpanel.track('Error: coin.js > getSingleCoin', {
          error: error,
          message: error.message,
        })
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
        mixpanel.track('Error: coin.js > getAllCoinsBrowser', {
          error: error,
          message: error.message,
        })
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
        mixpanel.track('Error: coin.js > fetchCoins', {
          error: error,
          message: error.message,
        })
        console.log(error.message)
      }
    },
    getCoins() {
      this.coins = JSON.parse(localStorage.getItem('coins'))
      console.log(this.coins)
    },
  },
})
