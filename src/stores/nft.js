import { defineStore } from 'pinia'
import axios from 'axios'
import * as R from 'ramda'
import deleteNFTkeys from '../utils/deleteNFTkeys'
import { AXIOS_CONFIG, SHYFT_URL, SHYFT_KEY } from '../constants/api'

const AXIOS_CONFIG_SHYFT_KEY = R.assoc('x-api-key', SHYFT_KEY, AXIOS_CONFIG)

export const useNftStore = defineStore('nft', {
  state: () => ({
    portfolios: [],
    collections: [], // All filtered Collections <- render in UI
    nfts: [],
    nft: {}
  }),
  getters: {
    get_portfolios(state) {
      return state.portfolios
    },
    get_collections(state) {
      return state.collections
    },
    get_nfts(state) {
      return state.nfts
    },
    get_nft(state) {
      return state.nft
    }
  },
  actions: {
    mutate_emptyPortfolios() {
      this.portfolios = []
    },
    mutate_emptyCollections() {
      this.collections = []
    },
    mutate_emptyNfts() {
      this.nfts = []
    },
    mutate_emptyNft() {
      this.nft = {}
    },
    mutate_removeCollection(collection) {
      const searchCollections = this.collections.findIndex(item => item.wallet === collection.wallet)
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
        console.log('resCollections', resCollections)

        // ? Add associate collections with walletAddress
        resCollections.forEach(collection => {
          collection.wallet = walletAddress
        })

        if (res.success && resCollections) {
          if (this.collections.length > 0) {
            // TODO New collection found, add to this.collections
            
            // ? Match with existing collections
            for (let i=0; i < resCollections.length; i++) {              
              for (let x=0; x < this.collections.length; x++) {
                if (resCollections[i].name === this.collections[x].name) {
                  this.collections[x].nfts.push(...resCollections[i].nfts)
                }
              }
              
            }
            
          } else {
            // ? First wallet and collections added
            this.collections.push(...resCollections)
          }
        }

        this.collections.forEach((collection) => {
          this.fetchURI(collection.nfts[0].metadata_uri, collection)
        })

      } catch (error) {
        console.error('Error: nft.js > addAddress', error)
        mixpanel.track('Error: nft.js > addAddress', { error: error, message: error.message })
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
        mixpanel.track('Error: nft.js > fetchNfts', { error: error, message: error.message })
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
          mixpanel.track('Error: nft.js > fetchURI', { error: error, message: error.message })
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
        mixpanel.track('Error: nft.js > fetchAttributes', { error: error, message: error.message })
      }
    },
    async connectWallet() {}
  },
  persist: true
})