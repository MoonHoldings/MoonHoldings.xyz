<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { WalletMultiButton } from 'solana-wallets-vue'
import { useNftStore } from '@/stores/nft'

import Header from '@/components/partials/Header.vue'
import NftCollectionsBox from '@/components/nft/NftCollectionsBox.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

const router = useRouter()
const nftStore = useNftStore()

const isWalletAddressModal = ref(false)
const walletAddress = ref('J8FcrKuB8ew5YU9w9AEhp68xFvKU1sFHhPo9GYk7122k')
const isLoading = ref(false)

const nfts = computed(() => {
  return nftStore.nfts ?? []
})
const isNfts = computed(() => {
  if (nftStore.nfts) {
    return nftStore.nfts.length > 0
  }
})

const handleConnectWallet = async () => {
  await console.log('handleConnectWallet')
}

const selectCollections = (collections) => {
  router.push({ name: 'nftsCollection', params: { id: collections.id }})
}

const showWalletAddressModal = () => {
  isWalletAddressModal.value = true
}

const closeWalletAddressModal = () => {
  isWalletAddressModal.value = false
}

const addWallet = async () => {
  isLoading.value = true
  await nftStore.connectWalletWithAddress(walletAddress.value)
  isWalletAddressModal.value = false
  isLoading.value = false
}
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div v-if="isNfts" class="label">
        Displaying {{nfts?.length ?? 0}} collections
      </div>

      <div v-if="isNfts" class="grid">
        <NftCollectionsBox v-for="(collection, i) in nfts" :key="i" :collections="collection" @click="selectCollections(collection)" />
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
            alt="nft-image"
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
@import '@/sass/nft-collections.scss';
@import '@/sass/nft-collection-address-modal.scss';
</style>
