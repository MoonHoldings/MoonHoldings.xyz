import { defineStore } from 'pinia'
import axios from 'axios'
import * as R from 'ramda'
import deleteNFTkeys from '../utils/deleteNFTkeys'
import {
  AXIOS_CONFIG,
  AXIOS_CONFIG_SHYFT_KEY,
  SHYFT_URL,
} from '../constants/api'

export const useNftStore = defineStore('nft', {
  state: () => ({
    portfolios: [], // User can have multiple portfolios
    collections: [], // Collection of NFT collections
    wallets: [],
    nfts: [],
    nft: {}, // Rendered in Single Item view
  }),
  getters: {
    get_portfolios(state) {
      return state.portfolios
    },
    get_collections(state) {
      return state.collections
    },
    get_wallets(state) {
      return state.wallets
    },
    get_nfts(state) {
      return state.nfts
    },
    get_nft(state) {
      return state.nft
    },
  },
  actions: {
    mutate_emptyPortfolios() {
      this.portfolios = []
    },
    mutate_emptyCollections() {
      this.collections = []
    },
    mutate_emptyWallets() {
      this.wallets = []
    },
    mutate_emptyNfts() {
      this.nfts = []
    },
    mutate_emptyNft() {
      this.nft = {}
    },
    // mutate_removeCollection(collection) {
    //   const searchCollections = this.collections.findIndex(
    //     (item) => item.wallet === collection.wallet
    //   )
    // },
    mutate_removeWallet(wallet) {
      console.log('store removeWallet', wallet)
      const searchCollections = this.collections.findIndex(item => item.wallet === wallet)
      this.collections.splice(searchCollections, 1)
    },
    mutate_setNfts(nfts) {
      this.nfts = nfts
    },
    mutate_setNft(nft) {
      this.nft = nft
    },
    async addAddress(walletAddress) {
      try {
        const response = await axios.get(
          `${SHYFT_URL}/wallet/collections?network=mainnet-beta&wallet_address=${walletAddress}`,
          AXIOS_CONFIG_SHYFT_KEY
        )
        const res = await response.data
        const resCollections = res.result.collections

        console.log('this.collections', this.collections)

        // ? Add associate collections with walletAddress

        resCollections.forEach((collection) => {
          collection.wallet = walletAddress
        })

        if (res.success && resCollections) {
          if (this.collections.length > 0) {
            // ? Add any new incoming collections into collections
            for (let i = 0; i < resCollections.length; i++) {
              const record = this.collections.find(
                (el) => el.name === resCollections[i].name
              )
              if (record) {
                for (let x = 0; x < this.collections.length; x++) {
                  if (resCollections[i].name === this.collections[x].name) {
                    resCollections[i].nfts.forEach((nft) => {
                      const index = this.collections[x].nfts.findIndex(
                        (el) => el.name === nft.name
                      )

                      if (index === -1) this.collections[x].nfts.push(nft)
                    })
                  }
                }
              } else {
                this.collections.push(resCollections[i])
              }
            }
          } else {
            // ? First wallet and collections added
            this.collections = [...resCollections]
          }
        }

        // ? Get collection image & update wallets
        this.collections.forEach((collection) => {
          this.fetchURI(collection.nfts[0].metadata_uri, collection)
          this.wallets.push(collection.wallet)
        })
        
        this.wallets = [...new Set(this.wallets)]

        console.log('this.wallets', this.wallets)

      } catch (error) {
        console.error('Error: nft.js > addAddress', error)
        mixpanel.track('Error: nft.js > addAddress', {
          error: error,
          message: error.message,
        })
      }
    },
    async fetchNfts(walletAddress) {
      try {
        const response = await axios.get(
          `${SHYFT_URL}/nft/read_all?network=mainnet-beta&address=${walletAddress}`,
          AXIOS_CONFIG_SHYFT_KEY
        )
        const result = await response.data

        if (result.success) {
          this.nfts = result.result
        }
      } catch (error) {
        console.error('Error: nft.js > fetchNfts', error)
        mixpanel.track('Error: nft.js > fetchNfts', {
          error: error,
          message: error.message,
        })
      }
    },
    // ? For unknown NFT collections
    async fetchURI(uriAddress, item) {
      if (!item.image) {
        try {
          const response = await axios.get(`${uriAddress}`, AXIOS_CONFIG)
          const res = await response.data

          item.image = res.image
          item.description = res.description
          item.collection = res.collection
        } catch (error) {
          console.error('Error: nft.js > fetchURI', error)
          mixpanel.track('Error: nft.js > fetchURI', {
            error: error,
            message: error.message,
          })
        }
      } else {
        return item
      }
    },
    async fetchAttributes() {
      try {
        const response = await axios.get(this.nft.metadata_uri, AXIOS_CONFIG)
        const res = await response.data
        this.nft.attributes = res.attributes
        this.nft.symbol = res.symbol
      } catch (error) {
        console.error('Error: nft.js > fetchAttributes', error)
        mixpanel.track('Error: nft.js > fetchAttributes', {
          error: error,
          message: error.message,
        })
      }
    },
    async connectWallet() {},
  },
  persist: true,
})
