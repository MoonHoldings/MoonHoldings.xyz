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
          // this.collections = [] // TODO temp
          this.raw_collections = {} // TODO temp
          let raw_collections = {}
          let filteredCollections = {}
          let collectionAddress = ''
          let updateAuthority = ''

          // ? Group Known & Unknown collections (creates 2 arrays)
          if (nfts && nfts.length > 0) {
            nfts.forEach(nft => {
              collectionAddress = nft?.collection?.address ?? 'unknown'

              if (raw_collections[collectionAddress]) {
                raw_collections[collectionAddress].push(nft)
              } else {
                raw_collections[collectionAddress] = []
                raw_collections[collectionAddress].push(nft)
              }
            })
          }

          // console.log('RAW COLLECTIONS', raw_collections)
          Object.assign(this.raw_collections, raw_collections)
          // console.log('this.raw_collections', this.raw_collections)

          // console.log('GROUPED.unknown', raw_collections.unknown)

          // ? Filter and group unique unknown collections
          if (raw_collections['unknown'] && raw_collections['unknown'].length > 0) {
            raw_collections['unknown'].forEach((nft) => {
              updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority' // 3n1mz8MyqpQwgX9E8CNPPZtAdJa3aLpuCSMbPumM9wzZ

              Object.assign(filteredCollections, {
                [updateAuthority]: []
              })
            })

            // ? Organize all NFTs into each unknown collection
            raw_collections['unknown'].forEach((nft) => {
              updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority'
              
              for (const [key, value] of Object.entries(filteredCollections)) {
                if (updateAuthority === key) {
                  filteredCollections[key].push(nft)
                }
              }
            })
          }

          // ? GET Collection {name} & {image} by calling URI
          const getURI = (collection) => {
            // ? If Known collection use NFT.read(collection.address) otherwise GET(collection[0].uri)

            // console.log(collection)
            const collectionURI = (collection[0].collection) ? collection[0].collection.address : collection[0].uri
            const knownCollection = (collection[0].collection)

            if (knownCollection) {
              this.fetchNFT(collectionURI)  
            } else {
              this.fetchURI(collectionURI)
            }
          }

          // ? Reset this.collections
          this.collections = [] // TODO need to fix logic so we don't reset & duplicate everytime
          
          // ? map known collections from raw_collections into this.collections
          for (const [key, value] of Object.entries(this.raw_collections)) {
            if (key != 'unknown') {
              this.collections.push(value)
            }
          }

          // https://ramdajs.com/docs/#forEachObjIndexed (Iterate over object)
          R.forEachObjIndexed(getURI, this.collections);

          // R.forEachObjIndexed(getURI, filteredCollections);

          // Set this.filtered_collections
          this.filtered_collections = filteredCollections

          console.log('All raw collections', raw_collections)
          console.log('Know collections (this.collections)', this.collections) // TODO <- why does this grow
          // console.log('filteredCollections', filteredCollections)
          console.log('Unknow collections (this.filtered_collections)', this.filtered_collections)

          // R.forEachObjIndexed(getURI, filteredCollections);

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
    async fetchNFT(uriAddress) {
      console.log('fetchNFT uriAddress:', uriAddress)
      try {
        const response = await axios.get(
          `${this.shyft_url}/nft/read?network=mainnet-beta&token_address=${uriAddress}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': `${this.shyft_key}`
            }
          }
        )
        const res = await response.data
        console.log('res', res) // result.name result.cached_image_uri

        if (res.success) {
          for (const [key, value] of Object.entries(this.collections)) {

            // console.log('key', key)
            // console.log('value', value)
            value.forEach(nft => {
              if (nft.collection.address === uriAddress) {
                nft.collection.collection_name = res.result.name
                nft.collection.collection_image = res.result.cached_image_uri
              }
            })

            // if (value[0].collection.address === uriAddress) {
            //   value[0].collection.collection_name = res.result.name
            //   value[0].collection.collection_image = res.result.cached_image_uri
            //   // console.log('2 this.filtered_collections', this.filtered_collections)
            // }
          }
        }

      } catch (error) {
        console.log(error)
      }
    },
    async fetchURI(uriAddress) {
      console.log('fetchURI uriAddress:', uriAddress)
      try {
        const response = await axios.get(
          `${uriAddress}`,
          { headers: { 'Content-Type': 'application/json', } }
        )
        const result = await response.data
        console.log('result', result)

        if (result) {
          // return result // result.name result.image
          for (const [key, value] of Object.entries(this.filtered_collections)) {
            // const collection_name = result.collection.name
            // collection[0].name = result.name
            // collection[0].image = result.image
            // console.log('this.filtered_collections', this.filtered_collections)
            // if (uriAddress === '3n1mz8MyqpQwgX9E8CNPPZtAdJa3aLpuCSMbPumM9wzZ') {
            //   console.log('here')
            // }
            if (key === uriAddress) {
              console.log('key', key)
              console.log('result', result)
              // this.filtered_collections[key].forEach((nft) => {
              //   nft.collection = {
              //     collection_name
              //   }
              // })

              // console.log('2 this.filtered_collections', this.filtered_collections)
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async connectWallet() {}
  },
  persist: true
})