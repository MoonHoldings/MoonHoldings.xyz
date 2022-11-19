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
    raw_collections: {}, // All newly imported Collections
    filtered_collections: {}, // Unknown Collections
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
    get_raw_collections(state) {
      return state.raw_collections
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
    mutate_emptyRawCollections() {
      this.raw_collections = {}
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

        if (res.success && nfts.length > 0) {
          let name = '' // TODO update to support new collection logic
          let image = '' // TODO update to support new collection logic

          this.collections = [] // TODO temp <- we don't want to reset here
          this.raw_collections = {} // TODO temp
          let raw_collections = {}
          let filteredCollections = {}
          let collectionAddress = ''
          let updateAuthority = ''

          // ? Group Known & Unknown collections (creates 2 arrays)
          if (nfts && nfts.length > 0) {
            nfts.forEach(nft => {
              deleteNFTkeys(nft)
              nft.wallet = walletAddress
              collectionAddress = nft?.collection?.address ?? 'unknown'

              if (raw_collections[collectionAddress]) {
                raw_collections[collectionAddress].push(nft)
              } else {
                raw_collections[collectionAddress] = []
                raw_collections[collectionAddress].push(nft)
              }
            })
          }

          Object.assign(this.raw_collections, raw_collections)

          // ? Filter and group unique unknown collections
          if (raw_collections['unknown'] && raw_collections['unknown'].length > 0) {
            raw_collections['unknown'].forEach(nft => {
              updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority'

              Object.assign(filteredCollections, {
                [updateAuthority]: []
              })
            })

            // ? Organize all NFTs into each unknown collection
            raw_collections['unknown'].forEach(nft => {
              updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority'
              
              for (const [key, value] of Object.entries(filteredCollections)) {
                if (updateAuthority === key) {
                  filteredCollections[key].push(nft)
                }
              }
            })
          }

          // ? GET Collection {name} & {image} by calling URI
          const getCollectionNameImage = collection => {
            // If Known collection use NFT.read(collection.address) otherwise GET(collection[0].uri)
            const knownCollection = (collection[0].collection?.address)

            if (collection[0].collection?.collection_name && collection[0].collection?.collection_image) {
              return
            }

            if (knownCollection) {
              this.fetchNFT(collection[0].collection?.address, collection[0])  
            } else {
              this.fetchURI(collection[0].uri, collection[0])
            }
          }

          // ? Reset this.collections
          // this.collections = [] // TODO need to fix logic so we don't reset & duplicate everytime
          
          // map known collections from raw_collections into this.collections
          // TODO we need logic that will not add the same NFTs
          // TODO there should never be duplicate collections or NFTs
          // TODO if there is a new NFT added to an existing collection, that NFT should be added
          for (const [key, value] of Object.entries(this.raw_collections)) {
            if (key != 'unknown') {
              this.collections?.push(value)
            }
          }

          // ? Set this.filtered_collections state with filteredCollections object
          this.filtered_collections = filteredCollections

          // Add all known collections
          this.collections = [
            ...this.collections,
          ]

          // Add all unknown collections
          for (const [key, value] of Object.entries(this.filtered_collections)) {
            this.collections?.push(value)
          }

          // https://ramdajs.com/docs/#forEachObjIndexed (Iterate over object)
          R.forEachObjIndexed(getCollectionNameImage, this.collections)
          R.forEachObjIndexed(getCollectionNameImage, filteredCollections)

          // console.log('Raw collections', raw_collections)
          console.log('THIS.COLLECTIONS', this.collections) // TODO <- why does this grow
          // console.log('Unknown collections (this.filtered_collections)', this.filtered_collections)
          
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
    // ? For known NFT collections
    async fetchNFT(uriAddress, nftZero) {
      try {
        const response = await axios.get(
          `${this.shyft_url}/nft/read?network=mainnet-beta&token_address=${uriAddress}`,
          { headers: { 'Content-Type': 'application/json', 'x-api-key': `${this.shyft_key}` } }
        )
        const res = await response.data

        if (res.success) {
          for (const [key, value] of Object.entries(this.collections)) {
            value.forEach(nft => {
              if (nft.collection.address === uriAddress) {
                nft.collection.collection_name = res.result.name
                nft.collection.collection_image = res.result.cached_image_uri
              }
            })
          }
        }

      } catch (error) {
        console.log(error)
        mixpanel.track('Error: nft.js > fetchNFT', { error: error, message: error.message })
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