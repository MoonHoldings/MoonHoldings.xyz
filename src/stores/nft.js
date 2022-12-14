import { defineStore } from 'pinia'
import axios from 'axios'
import * as R from 'ramda'

import {
  SERVER_URL,
  AXIOS_CONFIG,
  AXIOS_CONFIG_SHYFT_KEY,
  SHYFT_URL,
} from '../constants/api'

export const useNftStore = defineStore('nft', {
  state: () => ({
    portfolios: [], // User can have multiple portfolios
    collections: [], // Collection of NFT in Portfolio view
    wallets: [], // List of added wallets
    nfts: [], // NFTs in Collection view
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
    mutate_removeWallet(wallet) {
      // Remove all NFTs from Collections associated with wallet
      for (let i = 0; i < this.collections.length; i++) {
        for (let x = 0; x < this.collections[i].nfts.length; x++) {
          if (this.collections[i]?.nfts[x]?.wallet === wallet) {
            this.collections[i].nfts.splice(x, 1)
            x--
          }
        }
      }

      // If collection has no NFTS remove it
      const dropEmptyCollections = (collection) => collection.nfts.length === 0
      this.collections = R.dropWhile(dropEmptyCollections, this.collections)

      let tempCollections = []

      this.collections.forEach((item) => {
        if (item.nfts.length > 0) {
          tempCollections.push(item)
        }
      })

      this.collections = tempCollections

      // Remove wallet
      const walletToRemove = this.wallets.findIndex((item) => item === wallet)
      this.wallets.splice(walletToRemove, 1)
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
        const resCollections = res.result.collections.map((col) => col)

        // ? Add NFT update_authority to collection & Associate NFTs with wallet
        resCollections.forEach((collection) => {
          collection.wallet = walletAddress
          collection.update_authority = collection.nfts[0].update_authority
          collection.nfts.forEach((nft) => (nft.wallet = walletAddress))
        })

        if (res.success && resCollections) {
          if (this.collections.length > 0) {
            // ? Add any new incoming collections into collections
            for (let i = 0; i < resCollections.length; i++) {
              const recordIndex = this.collections.findIndex(
                (el) => el.name === resCollections[i].name
              )
              if (recordIndex !== -1) {
                for (let x = 0; x < resCollections[i].nfts.length; x++) {
                  const matchedNftIndex = this.collections[
                    recordIndex
                  ].nfts.findIndex(
                    (nft) => nft.name === resCollections[i].nfts[x].name
                  )

                  if (matchedNftIndex === -1)
                    this.collections[recordIndex].nfts.push(
                      resCollections[i].nfts[x]
                    )
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
        // TODO refactor fetchURI to Promise.all
        this.collections.forEach((collection) => {
          this.fetchURI(collection.nfts[0].metadata_uri, collection)
          // Add collection details to each nft
          collection.nfts.forEach((nft) => {
            nft.collection = collection.collection ?? {}
          })
          this.wallets.push(collection.nfts[0].wallet)
        })

        this.wallets = [...new Set(this.wallets)]
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
    async fetchAllURIs(nfts) {
      Promise.all(
        nfts.map((nft) => {
          return this.fetchURI(nft.metadata_uri, nft)
        })
      )
    },
    // ? Get NFT image and description
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
