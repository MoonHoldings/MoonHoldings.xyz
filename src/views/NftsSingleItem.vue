<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNftStore } from '@/stores/nft'
import Header from '@/components/partials/Header.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

const router = useRouter()
const route = useRoute()
const nftStore = useNftStore()

const isImageModal = ref(false)
const isWalletAddressModal = ref(false)
const walletAddress = ref('')
const isLoading = ref(false)

const selectedNft = computed(() => {
  return nftStore.get_nft ?? {}
})

const collectionName = computed(() => {
  console.log('selectedNft', selectedNft)
  return nftStore.get_nft.collection?.name ?? nftStore.get_nft.name
})

const backCollections = () => {
  router.push({ name: 'nftsPortfolio' })
}

const backCollection = () => {
  router.push({ name: 'nftsCollection', params: { name: route.params.name }})
}

const showImageModal = () => {
  isImageModal.value = true
}

const closeImageModal = () => {
  isImageModal.value = false
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

const parsingWalletAddress = (walletAddress) => {
  const truncateRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = walletAddress.match(truncateRegex)
  if (!match) {
    return walletAddress
  }

  return `${match[1]}…${match[2]}`
}

// console.log('selectedNft', selectedNft)

onMounted(async () => {
  nftStore.fetchAttributes()
})
</script>

<template>
  <Header />

  <div class="single-collection">
    <div class="single-collection__left-side">
      <div class="collection-summary">
        <div class="route" @click="backCollections">
          &#10094; Back to Collections
        </div>
        <div class="slash">/</div>
        <div class="route" @click="backCollection">
          &#10094; {{ collectionName }}
        </div>
        <div class="slash">/</div>
      </div>

      <div class="collection-data-section">
        <div class="collection-image">
          <img
            class="image"
            :src="selectedNft.cached_image_uri"
            alt="nft-image"
            @click="showImageModal"
          />

          <!-- <div class="image-info">
            <div class="image-info-detail">
              <div class="left">
                Mint Address:
              </div>
              <div class="right">
                {{ parsingWalletAddress(selectedNft.mint) }}
              </div>
            </div>
            <div class="image-info-detail">
              <div class="left">
                Owner:
              </div>
              <div class="right">
                {{ parsingWalletAddress(selectedNft.owner) }}
              </div>
            </div>
          </div> -->
        </div>

        <div class="collection-data">
          <div class="title">
            {{ selectedNft.name }}
          </div>
          <div class="explanation">
            {{ selectedNft.description }}
          </div>

          <div class="info">
            <div class="info-item" v-for="(attribute, index) in selectedNft.attributes" :key="index">
              <div class="label">{{ attribute.trait_type }}</div>
              <div class="value">{{ attribute.value }}</div>
            </div>
          </div>
          <!-- <div class="floor-section">
            <div class="floor">
              <img class="image" src="/svg/icon-magiceden.svg" alt="nft-image" />
              <div class="label">Floor</div>
              <div class="down-value">13.6</div>
              <img class="image" src="/svg/icon-arrow-circle-down.svg" alt="nft-image" />
            </div>

            <div class="floor">
              <img class="image" src="/svg/icon-hyperspace.svg" alt="nft-image" />
              <div class="label">Floor</div>
              <div class="up-value">16</div>
              <img class="image" src="/svg/icon-arrow-circle-up.svg" alt="nft-image" />
            </div>
          </div>

          <div class="floor-section">
            <div class="floor">
              <img class="image" src="/svg/icon-moonrank.svg" alt="nft-image" />
              <div class="number">2589</div>
            </div>

            <div class="floor">
              <img class="image" src="/svg/icon-howrare.svg" alt="nft-image" />
              <div class="number">3280</div>
            </div>
          </div> -->

          <!-- <div class="accept-offer">
            Accept Hightest Offer @ 10.123
          </div> -->

          <!-- <div class="info">
            <div class="info-item">
              <div class="label">Background</div>
              <div class="value">{{ selectedNft.attributes.background ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Type</div>
              <div class="value">{{ selectedNft.attributes.type ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Head</div>
              <div class="value">{{ selectedNft.attributes.head ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Facial Hair</div>
              <div class="value">{{ selectedNft.attributes["facial hair"] ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Clothing</div>
              <div class="value">{{ selectedNft.attributes.clothing ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Helmet</div>
              <div class="value">{{ selectedNft.attributes.helmet ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Accessory 1</div>
              <div class="value">{{ selectedNft.attributes["accessory 1"] ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Accessory 2</div>
              <div class="value">{{ selectedNft.attributes["accessory 2"] ?? "N/A" }}</div>
            </div>

            <div class="info-item">
              <div class="label">Accessory 3</div>
              <div class="value">{{ selectedNft.attributes["accessory 3"] ?? "N/A" }}</div>
            </div>
          </div> -->

        </div>
      </div>
    </div>

    <div class="single-collection__right-side">
      <WalletManage @showWalletAddress="showWalletAddressModal" />
    </div>
  </div>

  <div v-if="isImageModal" class="modal">
    <span class="close" @click="closeImageModal">&times;</span>
    <div class="modal-content">
      <img class="image" :src="selectedNft.image_uri" alt="nft-image" />
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
@import '@/sass/nft-single-collection.scss';
@import '@/sass/nft-single-collection-image-modal.scss';
@import '@/sass/nft-collection-address-modal.scss';
</style>