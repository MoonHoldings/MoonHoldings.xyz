import { defineStore } from 'pinia'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { AXIOS_CONFIG, SERVER_URL } from '../constants/api'
import getMoonToken from '@/utils/getMoonToken'
import getMoonUser from '@/utils/getMoonUser'
import setMoonUser from '@/utils/setMoonUser'

export const useCoinStore = defineStore('coin', {
  state: () => ({
    modalCoin: {},
    cryptoCoins: [],
    coins: [],
    chartValues: [],
    chartLabels: [],
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
    mutate_chartValues(payload) {
      this.chartValues = payload
    },
    mutate_chartLabels(payload) {
      this.chartLabels = payload
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
      const cancellingWalletIndex = this.modalCoin.wallets.findIndex(
        (wallet) => wallet.saved === false
      )

      if (
        this.modalCoin.wallets[cancellingWalletIndex].name !== '' &&
        this.modalCoin.wallets[cancellingWalletIndex].holding
      ) {
        this.modalCoin.wallets[cancellingWalletIndex].saved = true
      } else {
        this.modalCoin.wallets.splice(cancellingWalletIndex, 1)
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
        const user = getMoonUser()
        const recordCoin = user.portfolio.coins.find(
          (c) => c.id === this.modalCoin.id
        )
        const token = getMoonToken()

        if (recordCoin) {
          response = await axios.put(
            `${SERVER_URL}/update-coin`,
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
            setMoonUser(user)
            const pCoinIndex = this.cryptoCoins.findIndex(
              (coin) => coin.id === this.modalCoin.id
            )
            this.cryptoCoins[pCoinIndex] = this.modalCoin
          }
        } else {
          response = await axios.put(
            `${SERVER_URL}/save-coin`,
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
            setMoonUser(user)
            this.mutate_cryptoCoin(this.modalCoin)
          }
        }
      } catch (error) {
        console.log(error.message)
      }

      this.modalCoin = {}
    },
    async removeCryptoCoin() {
      const user = getMoonUser()
      const token = getMoonToken()
      try {
        const response = await axios.put(
          `${SERVER_URL}/remove-coin`,
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

          // removing from localStorage
          const storedCoinIndex = user.portfolio.coins.findIndex(
            (coin) => coin.id === this.modalCoin.id
          )
          user.portfolio.coins.splice(storedCoinIndex, 1)
          setMoonUser(user)
        }
      } catch (error) {
        console.log(error.message)
      }

      this.modalCoin = {}
    },
    async getSingleCoin(coinId) {
      try {
        let coin
        const token = getMoonToken()
        const response = await axios.post(
          `${SERVER_URL}/get-coin`,
          {
            coinId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        )

        const result = response.data

        if (result.success) {
          coin = result.coin
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
        }
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
          mixpanel.track(
            'Error: coin.js > getAllCoinsBrowser (docSnap.exists)',
            {
              message: 'Not able to get docSnap.data()',
              allCoins: allCoins,
            }
          )
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
        const response = await axios.get(`${SERVER_URL}/coins`, AXIOS_CONFIG)
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
    },
  },
})
