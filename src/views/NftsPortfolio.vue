<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { WalletMultiButton } from 'solana-wallets-vue'
import { useNftStore } from '@/stores/nft'

import Header from '@/components/partials/Header.vue'
import PortfolioBox from '@/components/nft/PortfolioBox.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

const router = useRouter()
const nftStore = useNftStore()

const isWalletAddressModal = ref(false)
const walletAddress = ref('')
const isLoading = ref(false)

const portfolios = computed(() => {
  return nftStore.portfolios ?? []
})

const isPortfolios = computed(() => {
  if (nftStore.portfolios) {
    return nftStore.portfolios.length > 0
  }
})

const handleConnectWallet = async () => {
  await console.log('handleConnectWallet')
}

const selectPortfolio = (portfolio) => {
  router.push({ name: 'nftsCollection', params: { address: portfolio.walletAddress }})
}

const showWalletAddressModal = () => {
  isWalletAddressModal.value = true
  walletAddress.value = ''
}

const closeWalletAddressModal = () => {
  isWalletAddressModal.value = false
  walletAddress.value = ''
}

const addWallet = async () => {
  isLoading.value = true
  await nftStore.connectWalletWithAddress(walletAddress.value)
  isWalletAddressModal.value = false
  isLoading.value = false
}

onMounted(async () => {
  nftStore.mutate_emptyNft()
})
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div v-if="isPortfolios" class="label">
        Displaying {{portfolios?.length ?? 0}} collections
      </div>

      <div v-if="isPortfolios" class="grid">
        <PortfolioBox v-for="(portfolio, i) in portfolios" :key="i" :portfolio="portfolio" @click="selectPortfolio(portfolio)" />
      </div>

      <div v-else class="empty-nft-summary">
        <div class="empty-title">
          Import your NFT collection
        </div>
        <div class="empty-content">
          Select Connect Wallet or Add Address to get Started
        </div>
        <img class="empty-image" src="/svg/icon-empty-nft.svg" alt="nft-image" />
      </div>
    </div>

    <div class="collection__right-side">
      <WalletManage @showWalletAddress="showWalletAddressModal" />
    </div>
  </div>

  <div v-if="isWalletAddressModal" class="wallet-modal">
    <div class="wallet-modal-content">
      <div class="wallet-modal-container">
        <div class="wallet-modal-header">
          <div class="label">
            Add your Solana wallet address
          </div>
          <img
            class="image"
            src="/svg/icon-close.svg"
            alt="Close Modal"
            @click="closeWalletAddressModal"
          />
        </div>

        <div class="wallet-input-content">
          <input type="text" v-model="walletAddress" class="input-text" />
          <div class="input-button" @click="addWallet">
            {{ isLoading ? "Connecting..." : "Add Wallet"}}
          </div>
        </div>
      </div>

      <div class="wallet-modal-shadow">
        <div class="wallet-top-corner" />
        <div class="wallet-bottom-corner" />
      </div>

      <div class="wallet-modal-blur" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nft-portfolio.scss';
@import '@/sass/nft-collection-address-modal.scss';
</style>
