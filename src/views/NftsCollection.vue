<script setup>
import Header from '@/components/partials/Header.vue'
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side">
      <div class="label">
        Displaying 20 out of 64 collections, scroll for more
      </div>
    </div>
    <div class="collection__right-side">
      <div class="label">
        Connected Wallets
      </div>

      <div class="button-section">
        <div class="button">
          Connect Wallet
        </div>
        <div class="button">
          Add Address
        </div>
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

      <div class="button-section">
        <div class="button">
          Disconnect All
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nftCollection.scss';
</style>
