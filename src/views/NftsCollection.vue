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
const selectedCollectionId = ref(null)


const backCollections = () => {
  router.push({ name: 'nftsCollections' })
}

const selectDetailCollection = (collection) => {
  selectedCollectionId.value = collection.id
}

const goDetailCollection = (collection) => {}
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div class="nft-summary">
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

      <div class="grid">
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
    </div>

    <div class="collection__right-side">
      <div class="nft-info-title">
        Selected NFT
      </div>

      <div class="nft-info">
        <div class="nft-info-header">
          <img class="image" src="/svg/icon-nft-demo.svg" alt="header-image" />
          <div class="label">
            Lotus Lad #1226
          </div>
        </div>
        <input class="nft-info-content" type="text">
        <div class="nft-info-footer">
          <div class="nft-info-button">Delist</div>
          <div class="nft-info-button">Update</div>
        </div>
      </div>

      <div class="label">
        Connected Wallets
      </div>

      <div class="button">
        Connect Wallet
      </div>

      <div class="button">
        Add Address
      </div>

      <div class="grid-container">
        <div class="grid-item">
          <span>AdDL..gg9F</span>
          <img class="close" src="/svg/icon-close-black.svg" alt="close" />
        </div>
        <div class="grid-item">
          AdDL..gg9F
        </div>
        <div class="grid-item">
          AdDL..gg9F
        </div>
        <div class="grid-item">
          AdDL..gg9F
        </div>
        <div class="grid-item">
          AdDL..gg9F
        </div>
        <div class="grid-item">
          AdDL..gg9F
        </div>
      </div>

      <div class="button">
        Disconnect All
      </div>

      <div class="detail-info">
        <div class="detail-info-header">
          <div class="left">Lotus Gang NFT</div>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nft-collection.scss';
@import '@/sass/nft-collection-box.scss';
</style>
