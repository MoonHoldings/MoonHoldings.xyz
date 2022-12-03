<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNftStore } from '@/stores/nft'
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import {
  ADD_ADDRESS,
  CONNECTED_WALLETS,
  DISCONNECT_ALL
} from '../../constants/copy'
import "solana-wallets-vue/styles.css"

const emit = defineEmits()
const router = useRouter()
const nftStore = useNftStore()

const wallets = computed(() => {
  return nftStore.wallets ?? []
})

const isWallets = computed(() => {
  if (nftStore.wallets) {
    return nftStore.wallets.length > 0
  }
  return false
})

const selectedNft = computed(() => {
  return nftStore.get_nft ?? {}
})

const isSelectedNft = computed(() => {
  if (nftStore.get_nft) {
    return Object.keys(nftStore.get_nft).length > 0
  }
  return false
})

const hoverWallet = ref(null)

const showWalletAddressModal = () => {
  emit("showWalletAddress")
}

const showCloseButton = wallet => {
  hoverWallet.value = wallet
}

const hiddenCloseButton = wallet => {
  hoverWallet.value = null
}

const removeCollection = wallet => {
  nftStore.mutate_removeWallet(wallet)
}

const parsingWalletAddress = walletAddress => {
  if (!walletAddress) {
    return
  }

  const truncateRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  const match = walletAddress.match(truncateRegex)

  if (!match) {
    return walletAddress
  }

  return `${match[1]}…${match[2]}`
}

const disconnectAllAddress = () => {
  nftStore.mutate_emptyCollections()
  nftStore.mutate_emptyWallets()
  nftStore.mutate_emptyNfts()
  nftStore.mutate_emptyNft()

  router.push({ name: 'nftsPortfolio' })
}

// ? Get publicKey from wallet connect
const { publicKey, sendTransaction } = useWallet()

if (publicKey && publicKey.value) {
  console.log('publicKey', publicKey.value.toBase58())
}
</script>

<template>
  <!-- TODO Hidden for now till MagicEden sprints -->
  <!-- <div v-if="isSelectedNft">
    <div class="nft-info-title">
      Selected NFT
    </div>

    <div class="nft-info">
      <div class="nft-info-header">
        <img v-if="selectedNft.cached_image_uri" class="image" :src="selectedNft.cached_image_uri" alt="header-image" />
        <div class="label">
          {{ selectedNft.name }}
        </div>
      </div>
      <input class="nft-info-content" type="text" v-model="selectedNft.name">
      <div class="nft-info-footer">
        <div class="nft-info-button">Delist</div>
        <div class="nft-info-button">Update</div>
      </div>
    </div>
  </div> -->

  <div class="label">
    {{ CONNECTED_WALLETS }}
  </div>

  <!-- ? Wallet Connect -->
  <!-- <wallet-multi-button dark></wallet-multi-button> -->

  <div class="button" @click="showWalletAddressModal">
    {{ ADD_ADDRESS }}
  </div>

  <div v-if="isWallets" class="grid-container">
    <div
      class="grid-item"
      v-for="(wallet, i) in wallets"
      :key="i"
      @mouseenter="showCloseButton(wallet)"
      @mouseleave="hiddenCloseButton(wallet)"
    >
      <span>
        {{ parsingWalletAddress(wallet) }}
      </span>
      <img
        v-if="hoverWallet == wallet"
        class="close"
        src="/svg/icon-close-black.svg"
        alt="close"
        @click="removeCollection(wallet)"
      />
    </div>
  </div>

  <div v-if="isWallets" class="button" @click="disconnectAllAddress">
    {{ DISCONNECT_ALL }}
  </div>

  <!-- TODO Hidden for now till MagicEden sprints -->
  <!-- <div v-if="isSelectedNft" class="detail-info">
    <div class="detail-info-header">
      <div class="left">{{ selectedNft.name }} NFT</div>
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
  </div> -->
</template>

<style lang="scss" scoped>
@import '@/sass/wallet-manage.scss';
</style>