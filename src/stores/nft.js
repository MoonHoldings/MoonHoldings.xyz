import { defineStore } from 'pinia'
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

export const useNftStore = defineStore('nft', {
  state: () => ({
    server_url: `${import.meta.env.VITE_MOONSERVER_URL}`,
    shyft_url: `${import.meta.env.VITE_SHYFTSERVER_URL}`,
    shyft_key: `${import.meta.env.VITE_SHYFT_KEY}`,
    axios_config: { headers: { 'Content-Type': 'application/json' } },
    portfolios: [],
    nfts: [],
    nft: {}
  }),
  getters: {
    get_portfolios(state) {
      return state.portfolios
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
        // console.log('res.result', res.result) // ? res.result.sol_balance = SOL balance
        console.log('nfts', nfts)

        if (res.success && nfts.length > 0) {
          let name = ""
          let image = ""

          // grouping collection to check if any nft item contains collection address
          let collections = {}

          // ! steps to try
          // ? Filter NFTs together into Arrays based on update_authority
          // ? New collections will have collection.address (query to get collection info)
          // ? Old collections will have collection null (query first one to get collection info)

          if (nfts && nfts.length > 0) {
            nfts.forEach(nft => {
              const collectionAddress = nft?.collection?.address ?? 'unknown'

              // ? Known Collections
              if (collections[collectionAddress]) {
                collections[collectionAddress] = []
                collections[collectionAddress].push(nft.mintAddress)
              // ? Unknown Collections (Lotus Gang & randoms) should be 2 collections
              // ? Lotus Gang & Unknown
              } else {
                collections[collectionAddress] = []
                collections[collectionAddress].push(nft.mintAddress)
              }
            });
          }

          // ! Goals:
          // Connect wallet: 5wwb8L8FQyH3MRfQa6GpcP6xNt3XQqSC1wHiVTiLhQA6
          // ? Lotus Gang collection with 10 NFTs
          // ? Critters Cult collection with 8 NFTs
          // ? Unknown Mixed collection with 3 random NFTs

          console.log('collections', collections)

          // let isGrouped = false

          // if (isGrouped) {

          // } else {
          //   await axios.get(nfts[0].uri).then((res) => {
          //     name = res?.data?.collection?.name
          //     image = res?.data?.image
          //   })
          // }

          this.portfolios.push({
            walletAddress,
            name,
            image,
            // ...result.result
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