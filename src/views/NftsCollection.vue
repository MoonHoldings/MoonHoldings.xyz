<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/partials/Header.vue'

const router = useRouter()

const collections = ref([
  { id: 1, sol: 25.42069, name: 'Lotus Lad #1226' },
  { id: 2, sol: 25, name: 'Lotus Lad #420' },
  { id: 3, sol: 25, name: 'Lotus Lad #1740' },
  { id: 4, sol: 25.432, name: 'Lotus Lad #153' },
  { id: 5, sol: 25, name: 'Lotus Lad #1838' },
  { id: 6, sol: 15, name: 'Lotus Lad #1766' },
  { id: 7, sol: 0, name: 'Lotus Lad #4664' },
  { id: 8, sol: 0, name: 'Lotus Lad #913' },
  { id: 9, sol: 0, name: 'Lotus Lad #1505' },
  { id: 10, sol: 0, name: 'Lotus Lad #475' },
])
const isWalletAddressModal = ref(false)
const walletAddress = ref('')
const selectedCollectionId = ref(null)

const isCollections = computed(() => {
  return collections.value.length > 0
})

const backCollections = () => {
  router.push({ name: 'nftsPortfolio' })
}

const selectDetailCollection = (collection) => {
  selectedCollectionId.value = collection.id
}

const goDetailCollection = (collection) => {
  router.push({ name: 'nftSingleCollection', params: { id: collection.id }})
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
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div v-if="isCollections" class="nft-summary">
        <div class="route" @click="backCollections">
          &#10094; Back to Collections
        </div>
        <div class="count">
          You own <span class="value">10</span> Lotus Gang NFT
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

      <div v-if="isCollections" class="grid">
        <div
          class="element"
          v-for="(collection, i) in collections"
          :key="i"
        >
          <div
            class="element-container"
            :class="{
              'element-container-non-sol': !collection.sol ||collection.sol == 0,
              'element-container element-selected-line' : selectedCollectionId == collection.id,
              'element-container element-normal-line' : selectedCollectionId !== collection.id,
            }"
          >
            <div
              v-if="collection.sol && collection.sol > 0"
              :class="{
                'header header-selected' : selectedCollectionId == collection.id,
                'header header-normal' : selectedCollectionId !== collection.id,
              }"
            >
              <div>
                Listed: {{ collection.sol }} SQL
              </div>
              <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
            </div>
            <div class="content" @click="selectDetailCollection(collection)"></div>
            <div
              :class="{
                'footer footer-selected' : selectedCollectionId == collection.id,
                'footer footer-normal' : selectedCollectionId !== collection.id,
              }"
            >
              <div class="label">
                {{ collection.name }}
              </div>
              <img class="image" src="/svg/icon-nft-expand.svg" alt="expand" @click="goDetailCollection(collection)" />
            </div>
          </div>
          <div class="element-black-shadow" :class="{ 'element-black-shadow-non-sol': !collection.sol ||collection.sol == 0 }" />
          <div class="element-gray-shadow" :class="{ 'element-gray-shadow-non-sol': !collection.sol ||collection.sol == 0 }" />
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
