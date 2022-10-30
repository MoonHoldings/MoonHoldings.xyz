<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/partials/Header.vue'

const router = useRouter()
</script>

<template>
  <Header />

  <div class="single-collection">
    <div class="single-collection__left-side">
      <div class="collection-summary">
        <div class="route">
          &#10094; Back to Collections
        </div>
        <div class="slash">/</div>
        <div class="route">
          &#10094; Back to Lotus Gang NFT
        </div>
        <div class="slash">/</div>
      </div>
      <div class="collection-data-section">
        <div class="collection-image">
          <img class="image" src="/svg/icon-demo-single-collection.svg" alt="nft-image" />
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
        </div>
      </div>
    </div>
    <div class="single-collection__right-side">
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
@import '@/sass/nft-single-collection.scss';
</style>