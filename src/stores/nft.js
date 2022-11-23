import { defineStore } from 'pinia'
import axios from 'axios'
import * as R from 'ramda'
import deleteNFTkeys from '../utils/deleteNFTkeys'

export const useNftStore = defineStore('nft', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}`,
    shyft_url: `${import.meta.env.VITE_SHYFTSERVER_URL}`,
    shyft_key: `${import.meta.env.VITE_SHYFT_KEY}`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
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
    mutate_removePortfolio(portfolio) {
      const searchPortfolio = this.portfolios.findIndex(item => item.walletAddress === portfolio.walletAddress)
      this.portfolios.splice(searchPortfolio, 1)
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
          `${this.shyft_url}/wallet/collections?network=mainnet-beta&wallet_address=${walletAddress}`,
          { headers: { 'Content-Type': 'application/json', 'x-api-key': `${this.shyft_key}` } }
        )

        const res = await response.data
        console.log('res', res)

        if (res.success && res.result.collections) {
          this.collections = [
            ...res.result.collections
          ]
        }

        this.collections.forEach((collection) => {
          console.log('forEach collection', collection)
          this.fetchURI(collection.nfts[0].metadata_uri, collection)
        })

        console.log('this.collections', this.collections)

      } catch (error) {
        mixpanel.track('Error: nft.js > addAddress', { error: error, message: error.message })
      }
    },
    // TODO rename to addAddress
    async connectWalletWithAddress(walletAddress) {
      try {
        const response = await axios.get(
          `${this.shyft_url}/wallet/get_portfolio?network=mainnet-beta&wallet=${walletAddress}`,
          { headers: { 'Content-Type': 'application/json', 'x-api-key': `${this.shyft_key}` } }
        )

        const res = await response.data
        const nfts = res.result.nfts
        console.log('nfts', nfts)

        if (res.success && nfts.length > 0) {
          let name = '' // TODO update to support new collection logic
          let image = '' // TODO update to support new collection logic

          let filteredCollections = {}
          let updateAuthorityAddress = ''
          let updateAuthority = ''

          // ? Group Known & Unknown collections (creates 2 arrays)
          if (nfts && nfts.length > 0) {
            nfts.forEach(nft => {
              deleteNFTkeys(nft)
              nft.wallet = walletAddress // create new key wallet
              // updateAuthorityAddress = nft?.updateAuthorityAddress ?? null

              // if (filteredCollections[updateAuthorityAddress]) {
              //   filteredCollections[updateAuthorityAddress].push(nft)
              // } else {
              //   filteredCollections[updateAuthorityAddress] = []
              //   filteredCollections[updateAuthorityAddress].push(nft)
              // }
            })
          }

          // ? GET Collection {name} & {image} by calling URI
          const getCollectionNameImage = collection => {
            // if (collection[0].collection?.collection_name && collection[0].collection?.collection_image) {
            //   return
            // }

            this.fetchURI(collection[0].metadata_uri, collection[0])
          }
          
          // TODO we need logic that will not add the same NFTs
          // TODO there should never be duplicate collections or NFTs
          // TODO if there is a new NFT added to an existing collection, that NFT should be added


          // https://ramdajs.com/docs/#forEachObjIndexed (Iterate over object)
          R.forEachObjIndexed(getCollectionNameImage, this.collections)
          
          // ? Organize all collections into collection objects to render in UI:
          // TODO remove this old code
          // this.portfolios.push({
          //   walletAddress,
          //   name,
          //   image
          // })
        }
      } catch (error) {
        mixpanel.track('Error: nft.js > connectWalletWithAddress', { error: error, message: error.message })
      }
    },
    async fetchNfts(walletAddress) {
      try {
        const response = await axios.get(
          `${this.shyft_url}/nft/read_all?network=mainnet-beta&address=${walletAddress}`,
          { headers: { 'Content-Type': 'application/json', 'x-api-key': `${this.shyft_key}` } }
        )

        const result = await response.data

        if (result.success) {
          this.nfts = result.result
        }
      } catch (error) {
        mixpanel.track('Error: nft.js > fetchNfts', { error: error, message: error.message })
      }
    },
    // ? For unknown NFT collections
    async fetchURI(uriAddress, item) {
      if (!item.image) {
        try {
          const response = await axios.get(
            `${uriAddress}`,
            { headers: { 'Content-Type': 'application/json', } }
          )
          const res = await response.data

          item.image = res.image
          item.description = res.description
          item.collection = res.collection
  
        } catch (error) {
          mixpanel.track('Error: nft.js > fetchURI', { error: error, message: error.message })
        }
      } else {
        return item
      }
    },
    async connectWallet() {}
  },
  persist: true
})