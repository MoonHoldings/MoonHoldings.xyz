import { defineStore } from 'pinia'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

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
    async getSingleCoin(coinSymbol) {
      const NOMICS_KEY = import.meta.env.VITE_NOMICS_KEY
      try {
        const response = await axios.get(
          `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&ids=${coinSymbol}&intervals=1d,30d`
        )

        const coin = response.data[0]

        const coinObj = {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          logo_url: coin.logo_url,
          price: coin.price,
          _24hr: coin['1d']['price_change_pct'],
        }

        return coinObj
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
