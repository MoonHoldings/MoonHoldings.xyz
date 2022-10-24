<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps(['nft'])
const { nft } = props
</script>

<template>
  <div class="grid-element">
    <div class="grid-header">
      <div class="header-left">
        <div class="left-label">
          Floor
        </div>
        <div class="left-number">
          {{ nft?.floor }}
        </div>
      </div>
      <div class="header-right">
        <div class="image-container">
          <img v-if="nft?.floor > 20" src="/svg/icon-arrow-circle-down.svg" alt="down value" />
          <img v-else src="/svg/icon-arrow-circle-up.svg" alt="up value" />
        </div>
      </div>
    </div>
    <div class="grid-box">
      <div class="grid-container">
        <div class="grid-content"></div>
        <div class="grid-name">
          {{ nft?.name }}
        </div>
        <div class="grid-footer">
          <div class="footer-info">
            <div class="info-label">Items</div>
            <div class="info-value">{{ nft?.items }}</div>
          </div>
          <div class="footer-info">
            <div class="info-label">Total</div>
            <div class="info-label">939 = $29,109</div>
          </div>
        </div>
      </div>
      <div class="grid-shadow">
        <div class="top-corner"></div>
        <div class="bottom-corner"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nftBox.scss';
</style>