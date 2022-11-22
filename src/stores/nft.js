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
    mutate_setNft(nft) {
      this.nft = nft
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
              updateAuthorityAddress = nft?.updateAuthorityAddress ?? null

              if (filteredCollections[updateAuthorityAddress]) {
                filteredCollections[updateAuthorityAddress].push(nft)
              } else {
                filteredCollections[updateAuthorityAddress] = []
                filteredCollections[updateAuthorityAddress].push(nft)
              }
            })
          }

          console.log('1 filteredCollections', filteredCollections)

          // ? GET Collection {name} & {image} by calling URI
          const getCollectionNameImage = collection => {
            // if (collection[0].collection?.collection_name && collection[0].collection?.collection_image) {
            //   return
            // }

            this.fetchURI(collection[0].uri, collection[0])
          }

          // ? Reset this.collections
          // this.collections = [] // TODO need to fix logic so we don't reset & duplicate everytime
          
          // TODO we need logic that will not add the same NFTs
          // TODO there should never be duplicate collections or NFTs
          // TODO if there is a new NFT added to an existing collection, that NFT should be added

          // ? Set this.filtered_collections state with filteredCollections object
          // this.filtered_collections = filteredCollections

          // Add all unknown collections
          for (const [key, nft] of Object.entries(filteredCollections)) {
            console.log('nft', nft)
            let nftObject = nft[0]

            // If collections is empty add first nft
            if (this.collections.length === 0) {
              this.collections.push(nftObject)
            }

            for (let i = 0; i<this.collections.length; i++) {
              if (this.collections[i][0].updateAuthorityAddress === nftObject.updateAuthorityAddress) {
                this.collections[i].push(nft)
              }
            }
          }

          // https://ramdajs.com/docs/#forEachObjIndexed (Iterate over object)
          R.forEachObjIndexed(getCollectionNameImage, this.collections)

          console.log('2 THIS.COLLECTIONS', this.collections) // TODO <- why does this grow
          
          // ? Organize all collections into collection objects to render in UI:
          this.portfolios.push({
            walletAddress,
            name,
            image
          })
        }
      } catch (error) {
        console.log('error', error)
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
        console.log(error)
        mixpanel.track('Error: nft.js > fetchNfts', { error: error, message: error.message })
      }
    },
    // ? For unknown NFT collections
    async fetchURI(uriAddress, firstNFT) {
      try {
        const response = await axios.get(
          `${uriAddress}`,
          { headers: { 'Content-Type': 'application/json', } }
        )
        const res = await response.data

        if (res) {
          for (const [key, value] of Object.entries(this.filtered_collections)) {
            if (key === firstNFT.updateAuthorityAddress) {
              value.forEach(nft => {
                if (nft.updateAuthorityAddress === firstNFT.updateAuthorityAddress) {
                  const name = (res.collection && res.collection.name) ? res.collection.name : res.name
                  const image = res.image

                  nft.collection = {
                    collection_name: name,
                    collection_image: image
                  }
                }
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
        mixpanel.track('Error: nft.js > fetchURI', { error: error, message: error.message })
      }
    },
    async connectWallet() {}
  },
  persist: true
})