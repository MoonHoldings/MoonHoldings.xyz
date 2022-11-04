<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNftStore } from '@/stores/nft'
import { WalletMultiButton } from 'solana-wallets-vue'
import "solana-wallets-vue/styles.css"
import WalletManage from '@/components/nft/WalletManage.vue'

const emit = defineEmits()
const router = useRouter()
const nftStore = useNftStore()

const portfolios = computed(() => {
  return nftStore.portfolios ?? []
})

const isPortfolios = computed(() => {
  if (nftStore.portfolios) {
    return nftStore.portfolios.length > 0
  }
  return false
})

const selectedNft = computed(() => {
  return nftStore.get_nft ?? {}
})

const isSelectedNft = computed(() => {
  if (nftStore.get_nft) {
    return Object.keys(nftStore.get_nft).length > 0
  }
  return false
})

const hoverPortfolio = ref(null)

const showWalletAddressModal = () => {
  emit("showWalletAddress")
}

const showCloseButton = (portfolio) => {
  hoverPortfolio.value = portfolio
}

const removePortfolio = (portfolio) => {
  nftStore.mutate_removePortfolio(portfolio)
}

const parsingWalletAddress = (walletAddress) => {
  const truncateRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = walletAddress.match(truncateRegex)
  if (!match) {
    return walletAddress
  }

  return `${match[1]}…${match[2]}`
}

const disconnectAllAddress = () => {
  nftStore.mutate_emptyPortfolios()
  nftStore.mutate_emptyNfts()
  nftStore.mutate_emptyNft()

  router.push({ name: 'nftsPortfolio' })
}

onMounted(() => {
  let walletButton = document.getElementsByClassName("swv-button swv-button-trigger")

  walletButton[0].style["width"] = "100%"
  walletButton[0].style["height"] = "fit-content"
  walletButton[0].style["display"] = "flex"
  walletButton[0].style["justify-content"] = "center"
  walletButton[0].style["background"] = "#5B218F"
  walletButton[0].style["border-radius"] = "4px"
  walletButton[0].style["font-size"] = "16px"
  walletButton[0].style["font-weight"] = "400"
  walletButton[0].style["font-family"] = "Inter"
  walletButton[0].style["line-height"] = "20px"
  walletButton[0].style["padding"] = "10px 16px"
})
</script>

<template>
  <div v-if="isSelectedNft">
    <div class="nft-info-title">
      Selected NFT
    </div>

    <div class="nft-info">
      <div class="nft-info-header">
        <img v-if="selectedNft.cached_image_uri" class="image" :src="selectedNft.cached_image_uri" alt="header-image" />
        <div class="label">
          {{ selectedNft.name }}
        </div>
      </div>
      <input class="nft-info-content" type="text" v-model="selectedNft.name">
      <div class="nft-info-footer">
        <div class="nft-info-button">Delist</div>
        <div class="nft-info-button">Update</div>
      </div>
    </div>
  </div>

  <div class="label">
    Connected Wallets
  </div>

  <wallet-multi-button></wallet-multi-button>

  <div class="button">
    Connect Wallet
  </div>

  <div class="button" @click="showWalletAddressModal">
    Add Address
  </div>

  <div v-if="isPortfolios" class="grid-container">
    <div class="grid-item" v-for="(portfolio, i) in portfolios" :key="i">
      <span @mouseover="showCloseButton(portfolio)">{{parsingWalletAddress(portfolio.walletAddress)}}</span>
      <img
        v-if="hoverPortfolio?.walletAddress == portfolio.walletAddress"
        class="close"
        src="/svg/icon-close-black.svg"
        alt="close"
        @click="removePortfolio(portfolio)"
      />
    </div>
  </div>

  <div class="button" @click="disconnectAllAddress">
    Disconnect All
  </div>

  <div v-if="isSelectedNft" class="detail-info">
    <div class="detail-info-header">
      <div class="left">{{ selectedNft.name }} NFT</div>
      <div class="right">Listed:</div>
    </div>
    <div class="detail-info-item">
      <div class="left">
        <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
        <div class="label">floor:</div>
        <div class="value">13.6</div>
      </div>
      <div class="right">
        3
      </div>
    </div>
    <div class="detail-info-item">
      <div class="left">
        <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
        <div class="label">floor:</div>
        <div class="value">13.6</div>
      </div>
      <div class="right">
        3
      </div>
    </div>
    <div class="detail-info-label">
      You own 10, estimated value:
    </div>
    <div class="detail-info-footer">
      <div class="value">135</div>
      <div class="label">SOL</div>
      <div class="value">$3915</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/wallet-manage.scss';
</style>