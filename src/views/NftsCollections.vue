<script setup>
import { ref, reactive, computed } from 'vue'
import { WalletMultiButton } from 'solana-wallets-vue'
import Header from '@/components/partials/Header.vue'
import NftCollectionBox from '@/components/nft/NftCollectionBox.vue'

const nfts = ref([
  { id: 1, floor: 93.5, name: 'y00ts: mint t00bs', items: 10 },
  { id: 2, floor: 185, name: 'Solana Monkey Business', items: 5 },
  { id: 3, floor: 15, name: 'Chill Chat', items: 50 },
  { id: 4, floor: 14.49, name: 'Lotus Gang NFT', items: 40 },
  { id: 5, floor: 11, name: 'Test NFT', items: 11 },
  { id: 6, floor: 12, name: 'Chris NFT', items: 12 }
])

const handleConnectWallet = async () => {
  await console.log('Connect Wallet')
}
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div class="label">
        Displaying 20 out of 64 collections, scroll for more
      </div>

      <div class="grid">
        <NftCollectionBox v-for="(nft, i) in nfts" :key="i" :nft="nft" />
      </div>
    </div>

    <div class="collection__right-side">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nft-collections.scss';
</style>
