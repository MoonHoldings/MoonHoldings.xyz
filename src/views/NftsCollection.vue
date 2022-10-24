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

      <div class="grid">
        <div class="grid-element">
          <div class="grid-header">
            <div class="header-left">
              <div class="left-label">
                Floor
              </div>
              <div class="left-number">
                93.9
              </div>
            </div>
            <div class="header-right">
              <div class="image-container">
                <img src="/svg/icon-arrow-circle-down.svg" alt="down value" />
              </div>
            </div>
          </div>
          <div class="grid-content"></div>
          <div class="grid-name">
            yoots: mint t00bs
          </div>
          <div class="grid-footer">
            <div class="footer-info">
              <div class="info-label">Items</div>
              <div class="info-value">10</div>
            </div>
            <div class="footer-info">
              <div class="info-label">Total</div>
              <div class="info-label">939 = $29,109</div>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
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
@import '@/sass/nftCollection.scss';
</style>
