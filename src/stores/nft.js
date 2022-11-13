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
    collections: [],
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
          let groupCollections = {}
          let unknownCollections = {}
          let mixedCollections = {}

          if (nfts && nfts.length > 0) {
            nfts.forEach(nft => {
              const collectionAddress = nft?.collection?.address ?? 'unknown'

              if (groupCollections[collectionAddress]) {
                groupCollections[collectionAddress].push(nft)
              } else {
                groupCollections[collectionAddress] = []
                groupCollections[collectionAddress].push(nft)
              }
            })
          }

          console.log('GROUPED COLLECTIONS', groupCollections)

          // ? Group Unknown collections
          if (groupCollections['unknown'] && groupCollections['unknown'].length > 0) {
            groupCollections['unknown'].forEach((nft) => {
              const colName = nft?.name ?? 'unknown'

              if (unknownCollections[colName]) {
                unknownCollections[colName].push(nft)
              } else {
                unknownCollections[colName] = []
                unknownCollections[colName].push(nft)
              }
            })
          }

          console.log('GROUPED.unknown', groupCollections.unknown)

          // ? Filter and group unique unknown collections
          if (groupCollections['unknown'] && groupCollections['unknown'].length > 0) {
            groupCollections['unknown'].forEach((nft) => {
              const updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority' // 3n1mz8MyqpQwgX9E8CNPPZtAdJa3aLpuCSMbPumM9wzZ

              Object.assign(mixedCollections, {
                [updateAuthority]: []
              })
            })

            // ? Organize all NFTs into each unknown collection
            groupCollections['unknown'].forEach((nft) => {
              const updateAuthority = nft?.updateAuthorityAddress ?? 'missingUpdateAuthority'
              
              for (const [key, value] of Object.entries(mixedCollections)) {
                if (updateAuthority === key) {
                  mixedCollections[key].push(nft)
                }
              }
            })
          }

          console.log('UNKNOWN COLLECTIONS', unknownCollections)
          console.log('MIXED COLLECTIONS', mixedCollections)

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
    async connectWallet() {}
  },
  persist: true
})