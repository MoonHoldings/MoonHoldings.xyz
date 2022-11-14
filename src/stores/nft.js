import { defineStore } from 'pinia'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import * as R from 'ramda'

const { cookies } = useCookies() // TODO need this?

export const useNftStore = defineStore('nft', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}`,
    shyft_url: `${import.meta.env.VITE_SHYFTSERVER_URL}`,
    shyft_key: `${import.meta.env.VITE_SHYFT_KEY}`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    portfolios: [],
    collections: [], // ? Known Collections <- render in UI
    raw_collections: {},
    filtered_collections: {}, // ? Unknown Collections
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
      const searchPortfolio = this.portfolios.findIndex(item => {
        return item.walletAddress === portfolio.walletAddress
      })

      this.portfolios.splice(searchPortfolio, 1)
    },
    mutate_setNft(nft) {
      this.nft = nft
    },
    async connectWalletWithAddress(walletAddress) {
      try {
        const response = await axios.get(
          `${this.shyft_url}/wallet/get_portfolio?network=mainnet-beta&wallet=${walletAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': `${this.shyft_key}`
            }
          }
        )

        const res = await response.data
        const nfts = res.result.nfts

        if (res.success && nfts.length > 0) {
          let name = ""
          let image = ""

          // grouping collection to check if any nft item contains collection address
          let raw_collections = {}
          let filteredCollections = {}

          // ? Group Known & Unknown collections (creates 2 arrays)
          if (nfts && nfts.length > 0) {
            nfts.forEach(nft => {
              const collectionAddress = nft?.collection?.address ?? 'unknown'

              if (raw_collections[collectionAddress]) {
                raw_collections[collectionAddress].push(nft)
              } else {
                raw_collections[collectionAddress] = []
                raw_collections[collectionAddress].push(nft)
              }
            })
          }

          console.log('GROUPED RAW COLLECTIONS', raw_collections)
          console.log('this.collections', this.collections)
          this.raw_collections = raw_collections
          console.log('this.raw_collections', this.raw_collections)

          // console.log('GROUPED.unknown', raw_collections.unknown)

          // ? Filter and group unique unknown collections
          if (raw_collections['unknown'] && raw_collections['unknown'].length > 0) {
            raw_collections['unknown'].forEach((nft) => {
              const updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority' // 3n1mz8MyqpQwgX9E8CNPPZtAdJa3aLpuCSMbPumM9wzZ

              Object.assign(filteredCollections, {
                [updateAuthority]: [{
                  uri: nft.uri
                }]
              })
            })

            this.filtered_collections = filteredCollections
            
            // ? Call URI to get collection name & image
            const getURI = (collection, updateAddress) => {
              this.fetchURI(collection[0].uri)
              // console.log(collection)
              // console.log(updateAddress)
            }

            R.forEachObjIndexed(getURI, filteredCollections);

            // ? Organize all NFTs into each unknown collection
            raw_collections['unknown'].forEach((nft) => {
              const updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority'
              
              for (const [key, value] of Object.entries(filteredCollections)) {
                if (updateAuthority === key) {
                  filteredCollections[key].push(nft)
                }
              }
            })

            // ? GET the uri to obtain collection name and image
          }

          console.log('MIXED COLLECTIONS:', filteredCollections)
          console.log('FILTERED COLLECTIONS:', this.filtered_collections)

          // ? Organize all collections into collection objects to render in UI:
          this.portfolios.push({
            walletAddress,
            name,
            image
          })
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async fetchNfts(walletAddress) {
      try {
        const response = await axios.get(
          `${this.shyft_url}/nft/read_all?network=mainnet-beta&address=${walletAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': `${this.shyft_key}`
            }
          }
        )

        const result = await response.data

        if (result.success) {
          this.nfts = result.result
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchURI(uriAddress) {
      // console.log('fetchURI called with:', uriAddress)
      try {
        const response = await axios.get(
          `${uriAddress}`,
          { headers: { 'Content-Type': 'application/json', } }
        )

        const result = await response.data
        // console.log('fetchURI result', result)

        if (result) {
          // return result // result.name result.image
          for (const [key, value] of Object.entries(this.filtered_collections)) {
            // console.log('key', key)
            // console.log('value', value)
            console.log('result.collection.name', result.collection.name)
            // collection[0].name = result.name
            // collection[0].image = result.image
            console.log('this.filtered_collections', this.filtered_collections)
          }

          // this.filtered_collections.forEach((collection) => {
          //   if (uriAddress === collection[0].uri) {
          //     collection[0].name = result.name
          //     collection[0].image = result.image
          //   }
          // })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async connectWallet() {}
  },
  persist: true
})