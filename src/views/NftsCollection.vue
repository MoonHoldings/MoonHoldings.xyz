<script setup>
import { ref, reactive, computed, onMounted, onUpdated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNftStore } from '@/stores/nft'

import Header from '@/components/partials/Header.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

import { BACK_TO_COLLECTIONS } from '../constants/copy'

const router = useRouter()
const route = useRoute()
const nftStore = useNftStore()

const isWalletAddressModal = ref(false)
const walletAddress = ref('')
const isLoading = ref(false)
const isFetchingNfts = ref(false)
const selectedNft = ref(null)

const nfts = computed(() => {
  return nftStore.nfts ?? []
})

const isNfts = computed(() => {
  if (nftStore.nfts) {
    return nftStore.nfts.length > 0
  }
})

const collectionName = computed(() => {
  const collectionNFT = nftStore.nfts.find((el) => el.update_authority === route.params.name)
  if (collectionNFT?.collection?.name) return collectionNFT.collection?.name
  if (collectionNFT?.symbol && collectionNFT?.symbol !== '') return collectionNFT.symbol
  if (collectionNFT?.name) return collectionNFT.name
})

const backCollections = () => {
  router.push({ name: 'nftsPortfolio' })
}

const selectDetailNFT = (nft) => {
  selectedNft.value = nft.mint
  nftStore.mutate_setNft(nft)
}

const goDetailNFT = (nft) => {
  nftStore.mutate_setNft(nft)
  router.push({ name: 'nftSingleItem', params: { name: route.params.name } })
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

const pluckSelectedCollection = () => nftStore.collections.filter(
  (collection) => route.params.name === collection.update_authority
)[0]

const returnToPortfolio = () => router.push({ name: 'nftsPortfolio', path: '/nfts/portfolio' })

onMounted(async () => {
  nftStore.mutate_emptyNfts()
  nftStore.mutate_emptyNft()
  isFetchingNfts.value = true

  const selectedCollection = pluckSelectedCollection()

  if (!selectedCollection) {
    returnToPortfolio()
  } else {
    nftStore.fetchAllURIs(selectedCollection.nfts)
    nftStore.mutate_setNfts(selectedCollection.nfts)
  }

  isFetchingNfts.value = false
})

onUpdated(() => {
  if (!pluckSelectedCollection()) {
    returnToPortfolio()
  }

  console.log('nfts', nfts)
  console.log('collectionName', collectionName)
})
</script>

<template>
  <div class="loading-squares" v-if="isFetchingNfts">
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
          &#10094; {{ BACK_TO_COLLECTIONS }}
        </div>
        <div class="count">
          You own <span class="value">{{ nfts.length }}</span> NFTs in {{ collectionName }}
        </div>
        <!-- ? MagicEden -->
        <!-- <div class="floor">
          <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
          <div class="label">Floor</div>
          <div class="down-value">13.6</div>
          <img class="image" src="/svg/icon-arrow-circle-down.svg" alt="nft-image" />
        </div> -->
        <!-- ? HyperSpace -->
        <!-- <div class="floor">
          <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
          <div class="label">Floor</div>
          <div class="up-value">16</div>
          <img class="image" src="/svg/icon-arrow-circle-up.svg" alt="nft-image" />
        </div> -->
      </div>

      <div v-if="isNfts" class="grid">
        <div class="element" v-for="(nft, i) in nfts" :key="i">
          <div
            class="element-container"
            :class="{
              'element-container-non-sol': !nft.royalty || nft.royalty == 0,
              'element-container element-selected-line':
                selectedNft == nft.mint,
              'element-container element-normal-line': selectedNft !== nft.mint,
            }"
          >
            <!-- <div
              v-if="nft.royalty && nft.royalty > 0"
              :class="{
                'header header-selected' : selectedNft == nft.mint,
                'header header-normal' : selectedNft !== nft.mint,
              }"
            >
              <div>
                Listed: {{ nft.royalty }} SOL
              </div>
              <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
            </div> -->
            <div class="content" @click="selectDetailNFT(nft)">
              <img
                v-if="nft.image"
                class="image"
                :src="nft.image"
                alt="Nft Image"
              />
            </div>
            <div
              :class="{
                'footer footer-selected': selectedNft == nft.mint,
                'footer footer-normal': selectedNft !== nft.mint,
              }"
            >
              <div class="label">
                {{ nft.name }}
              </div>
              <img
                class="image"
                src="/svg/icon-nft-expand.svg"
                alt="expand"
                @click="goDetailNFT(nft)"
              />
            </div>
          </div>
          <div
            class="element-black-shadow"
            :class="{
              'element-black-shadow-non-sol': !nft.royalty || nft.royalty == 0,
            }"
          />
          <div
            class="element-gray-shadow"
            :class="{
              'element-gray-shadow-non-sol': !nft.royalty || nft.royalty == 0,
            }"
          />
        </div>
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
          <div class="label">Add your Solana wallet address 1</div>
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
@import '@/sass/nft-collection.scss';
@import '@/sass/nft-collection-box.scss';
@import '@/sass/nft-collection-address-modal.scss';
</style>
