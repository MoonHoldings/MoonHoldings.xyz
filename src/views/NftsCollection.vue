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
.collection {
  color: var(--ash);
  min-height: 100vh;
  min-width: calc(100% - 200px);
  padding: 11rem 46px 46px calc(46px + 200px);
  background: linear-gradient(180deg, #f0f6f0 0%, #cecece 100%);
  display: flex;
  gap: 8px;
  &__left-side {
    width: 75%;
    .label {
      font-size: 18px;
      font-weight: 400;
      line-height: 22px;
      color: #000000;
    }
  }
  &__right-side {
    width: 25%;
    .label {
      font-size: 18px;
      font-weight: 400;
      line-height: 27px;
      color: #000000;
    }
    .button-section {
      display: flex;
      gap: 8px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .button {
      padding: 6px 16px;
      border-radius: 2px;
      background: #6D2E46;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      color: #fff;
      cursor: pointer;
    }
    .grid-container {
      display: grid;
      gap: 8px;
      grid-template-columns: auto auto auto;
    }
    .grid-item {
      position: relative;
      width: 100%;
      text-align: center;
      border: 0.5px solid #000000;
      border-radius: 6px;
      background: #fff;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      color: #000000;
      cursor: pointer;
      .close {
        position: absolute;
        top: -8px;
        right: -4px;
        background: white;
      }
    }
  }
}
</style>
