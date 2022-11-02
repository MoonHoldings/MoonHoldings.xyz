<script setup>
import { ref, computed } from 'vue'
import WalletManage from '@/components/nft/WalletManage.vue'
import { useNftStore } from '@/stores/nft'
import { WalletMultiButton } from 'solana-wallets-vue'
import "solana-wallets-vue/styles.css"

const emit = defineEmits()
const nftStore = useNftStore()

const portfolios = computed(() => {
  return nftStore.portfolios ?? []
})

const hoverPortfolio = ref(null)

const showWalletAddressModal = () => {
  emit("showWalletAddress")
}

const showCloseButton = (portfolio) => {
  hoverPortfolio.value = portfolio
}

const removePortfolio = (portfolio) => {
  console.log('remove portfolio', portfolio)
}

const parsingWalletAddress = (walletAddress) => {
  const truncateRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = walletAddress.match(truncateRegex);
  if (!match) {
    return walletAddress
  }

  return `${match[1]}…${match[2]}`;
}
</script>

<template>
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

  <wallet-multi-button></wallet-multi-button>

  <div class="button">
    Connect Wallet
  </div>

  <div class="button" @click="showWalletAddressModal">
    Add Address
  </div>

  <div class="grid-container">
    <div class="grid-item" v-for="(portfolio, i) in portfolios" :key="i">
      <span @mouseover="showCloseButton(portfolio)">{{parsingWalletAddress(portfolio.walletAddress)}}</span>
      <img
        v-if="hoverPortfolio?.walletAddress == portfolio.walletAddress"
        class="close"
        src="/svg/icon-close-black.svg"
        alt="close"
        @click="removePortfolio(portfolio)"
      />
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
</template>

<style lang="scss" scoped>
@import '@/sass/wallet-manage.scss';
</style>