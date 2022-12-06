<script setup>
import { ref, reactive, computed, onMounted, onBeforeUpdate, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import { WalletMultiButton } from 'solana-wallets-vue'
import { useNftStore } from '@/stores/nft'

import Header from '@/components/partials/Header.vue'
import CollectionBox from '@/components/nft/CollectionBox.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

import {
  ADD_ADDRESS_TO_START,
  ADD_SOLANA_ADDRESS,
  CONNECT_WALLET_OR,
  IMPORT_YOUR_NFTS
} from '../constants/copy'

const router = useRouter()
const nftStore = useNftStore()

const isWalletAddressModal = ref(false)
const walletAddress = ref('')
const isLoading = ref(false)

let collections

collections = computed(() => {
  return nftStore.collections ?? []
})

const isCollections = computed(() => {
  if (nftStore.collections) {
    return nftStore.collections.length > 0
  }
})

const selectCollection = collection => {
  router.push({ name: 'nftsCollection', params: { name: collection.update_authority } })
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
  await nftStore.addAddress(walletAddress.value)
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
      <div v-if="isCollections" class="label">
        Displaying {{ collections?.length ?? 0 }} collections
      </div>

      <div v-if="isCollections" class="grid">
        <CollectionBox
          v-for="(collection, i) in collections"
          :key="i"
          :collection="collection"
          @click="selectCollection(collection)"
        />
      </div>

      <div v-else class="empty-nft-summary">
        <div class="empty-title">{{ IMPORT_YOUR_NFTS }}</div>
        <div class="empty-content">
          {{ CONNECT_WALLET_OR }}
          {{ ADD_ADDRESS_TO_START }}
        </div>
        <img
          class="empty-image"
          src="/svg/icon-empty-nft.svg"
          alt="nft-image"
        />
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
          <div class="label">{{ ADD_SOLANA_ADDRESS }}</div>
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
            {{ isLoading ? 'Connecting...' : 'Add Wallet' }}
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
