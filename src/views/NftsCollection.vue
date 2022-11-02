<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNftStore } from '@/stores/nft'

import Header from '@/components/partials/Header.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

const router = useRouter()
const route = useRoute()
const nftStore = useNftStore()

const isWalletAddressModal = ref(false)
const walletAddress = ref('')
const isLoading = ref(false)
const selectedNft = ref(null)

const nfts = computed(() => {
  return nftStore.nfts ?? []
})

const isNfts = computed(() => {
  if (nftStore.nfts) {
    return nftStore.nfts.length > 0
  }
})

const backCollections = () => {
  router.push({ name: 'nftsPortfolio' })
}

const selectDetailNFT = (nft) => {
  selectedNft.value = nft.mint
  nftStore.mutate_setNft(nft)
}

const goDetailNFT = (nft) => {
  router.push({ name: 'nftSingleCollection', params: { id: nft.mint }})
}

const showWalletAddressModal = () => {
  isWalletAddressModal.value = true
  walletAddress.value = ''
}

const closeWalletAddressModal = () => {
  isWalletAddressModal.value = false
  walletAddress.value = ''
}

const addWallet = () => {
  console.log('wallet address to add', walletAddress.value)
}

onMounted(async () => {
  nftStore.mutate_emptyNfts()
  nftStore.mutate_emptyNft()

  isLoading.value = true

  await nftStore.fetchNfts(route.params.address)

  isLoading.value = false
})
</script>

<template>
  <div class="loading-squares" v-if="isLoading">
    <img
      src="/gif/loading-squares.gif"
      width="200"
      height="200"
      alt="loading"
    />
  </div>

  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div v-if="isNfts" class="nft-summary">
        <div class="route" @click="backCollections">
          &#10094; Back to Collections
        </div>
        <div class="count">
          You own <span class="value">{{ nfts.length }}</span> NFTs
        </div>
        <div class="floor">
          <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
          <div class="label">Floor</div>
          <div class="down-value">13.6</div>
          <img class="image" src="/svg/icon-arrow-circle-down.svg" alt="nft-image" />
        </div>
        <div class="floor">
          <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
          <div class="label">Floor</div>
          <div class="up-value">16</div>
          <img class="image" src="/svg/icon-arrow-circle-up.svg" alt="nft-image" />
        </div>
      </div>

      <div v-if="isNfts" class="grid">
        <div class="element" v-for="(nft, i) in nfts" :key="i">
          <div
            class="element-container"
            :class="{
              'element-container-non-sol': !nft.royalty ||nft.royalty == 0,
              'element-container element-selected-line' : selectedNft == nft.mint,
              'element-container element-normal-line' : selectedNft !== nft.mint,
            }"
          >
            <div
              v-if="nft.royalty && nft.royalty > 0"
              :class="{
                'header header-selected' : selectedNft == nft.mint,
                'header header-normal' : selectedNft !== nft.mint,
              }"
            >
              <div>
                Listed: {{ nft.royalty }} SQL
              </div>
              <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
            </div>
            <div class="content" @click="selectDetailNFT(nft)">
              <img v-if="nft.image_uri" class="image" :src="nft.image_uri" alt="Nft Image" />
            </div>
            <div
              :class="{
                'footer footer-selected' : selectedNft == nft.mint,
                'footer footer-normal' : selectedNft !== nft.mint,
              }"
            >
              <div class="label">
                {{ nft.name }}
              </div>
              <img class="image" src="/svg/icon-nft-expand.svg" alt="expand" @click="goDetailNFT(nft)" />
            </div>
          </div>
          <div class="element-black-shadow" :class="{ 'element-black-shadow-non-sol': !nft.royalty ||nft.royalty == 0 }" />
          <div class="element-gray-shadow" :class="{ 'element-gray-shadow-non-sol': !nft.royalty ||nft.royalty == 0 }" />
        </div>
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
            Add Wallet
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
@import '@/sass/nft-collection.scss';
@import '@/sass/nft-collection-box.scss';
@import '@/sass/nft-collection-address-modal.scss';
</style>
