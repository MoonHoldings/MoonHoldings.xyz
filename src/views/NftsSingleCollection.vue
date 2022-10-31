<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/partials/Header.vue'
import WalletManage from '@/components/nft/WalletManage.vue'

const router = useRouter()

const isImageModal = ref(false)
const imageUrl = ref('')

const backCollections = () => {
  router.push({ name: 'nftsCollections' })
}

const backCollection = () => {
  router.push({ name: 'nftsCollection', params: { id: 1 }})
}

const showImageModal = () => {
  isImageModal.value = true
  imageUrl.value = '/svg/icon-demo-single-collection.svg'
}

const closeImageModal = () => {
  isImageModal.value = false
  imageUrl.value = ''
}
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
          &#10094; Back to Lotus Gang NFT
        </div>
        <div class="slash">/</div>
      </div>

      <div class="collection-data-section">
        <div class="collection-image">
          <img
            class="image"
            src="/svg/icon-demo-single-collection.svg"
            alt="nft-image"
            @click="showImageModal"
          />

          <div class="image-info">
            <div class="image-info-detail">
              <div class="left">
                Mint Address:
              </div>
              <div class="right">
                9QN9Pbj83BN4DtEE5zTaP1mSeW8cEqAaAnKRukxTaHGj
              </div>
            </div>
            <div class="image-info-detail">
              <div class="left">
                Owner:
              </div>
              <div class="right">
                HEYw...ugUS
              </div>
            </div>
          </div>
        </div>

        <div class="collection-data">
          <div class="title">
            Lotus Lad #1226
          </div>
          <div class="explanation">
            Lotus Gang is a collection 4,000 randomly generated lads and ladies on the Solana Blockchain.
          </div>

          <div class="floor-section">
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
          </div>

          <div class="accept-offer">
            Accept Hightest Offer @ 10.123
          </div>

          <div class="info">
            <div class="info-item">
              <div class="label">Background</div>
              <div class="value">Blue</div>
              <div class="label">20%</div>
            </div>

            <div class="info-item">
              <div class="label">Type</div>
              <div class="value">Human</div>
              <div class="label">87%</div>
            </div>

            <div class="info-item">
              <div class="label">Head</div>
              <div class="value">Black Cap</div>
              <div class="label">3.6%</div>
            </div>

            <div class="info-item">
              <div class="label">Facial Hair</div>
              <div class="value">Beard</div>
              <div class="label">25%</div>
            </div>

            <div class="info-item">
              <div class="label">Clothing</div>
              <div class="value">Plain Black Tea</div>
              <div class="label">87%</div>
            </div>

            <div class="info-item">
              <div class="label">Helmet</div>
              <div class="value">No Helmet</div>
              <div class="label">97%</div>
            </div>

            <div class="info-item">
              <div class="label">Accessory 1</div>
              <div class="value">Red Scouter</div>
              <div class="label">11%</div>
            </div>

            <div class="info-item">
              <div class="label">Accessory 2</div>
              <div class="value">No Accessory</div>
              <div class="label">55%</div>
            </div>

            <div class="info-item">
              <div class="label">Accessory 3</div>
              <div class="value">No Accessory</div>
              <div class="label">55%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="single-collection__right-side">
      <WalletManage />
    </div>
  </div>

  <div v-if="isImageModal" class="modal">
    <span class="close" @click="closeImageModal">&times;</span>
    <div class="modal-content">
      <img class="image" :src="imageUrl" alt="nft-image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nft-single-collection.scss';
@import '@/sass/nft-single-collection-image-modal.scss';
</style>