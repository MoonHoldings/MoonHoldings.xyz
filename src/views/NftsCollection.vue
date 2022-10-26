<script setup>
import { ref, reactive, computed } from 'vue'
import Header from '@/components/partials/Header.vue'
</script>

<template>
  <Header />

  <div class="collection">
    <div class="collection__left-side"></div>

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
            <img class="image" src="/svg/icon-nft-demo-down.svg" alt="nft-image" />
            <div class="label">floor:</div>
            <div class="value">13.6</div>
          </div>
          <div class="right">
            3
          </div>
        </div>
        <div class="detail-info-item">
          <div class="left">
            <img class="image" src="/svg/icon-nft-demo-down.svg" alt="nft-image" />
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
</style>
