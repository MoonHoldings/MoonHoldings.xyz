<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps(['collection'])
const { collection } = props
console.log('CollectionBox collection:', collection)
</script>

<template>
  <div class="grid-element">
    <div v-if="false" class="grid-header">
      <div class="header-left">
        <div class="left-label">
          Floor
        </div>
        <div class="left-number">
          {{ collection?.floor }}
        </div>
      </div>
      <div class="header-right">
        <div class="image-container">
          <img v-if="collection?.floor > 20" src="/svg/icon-arrow-circle-down.svg" alt="down value" />
          <img v-else src="/svg/icon-arrow-circle-up.svg" alt="up value" />
        </div>
      </div>
    </div>
    <div class="grid-box">
      <div class="grid-container">
        <div class="grid-content">
          <img v-if="collection.image" class="image" :src="collection?.image" alt="Collection Main Image" />
        </div>
        <div class="grid-name">
          {{ collection?.name }}
        </div>
        <div class="grid-footer">
          <div class="footer-info">
            <div class="info-label">Items</div>
            <div class="info-value">{{ collection?.nft_count }}</div>
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
@import '@/sass/portfolio-box.scss';
</style>