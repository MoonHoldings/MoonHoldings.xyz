<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps(['collection'])
const { collection } = props
</script>

<template>
  <div class="element">
    <div class="element-container" :class="{ 'element-container-non-sol': !collection.sol ||collection.sol == 0 }">
      <div v-if="collection.sol && collection.sol > 0" class="header header-normal">
        <div>
          Listed: {{ collection.sol }} SQL
        </div>
        <img class="image" src="/svg/icon-nft-demo-down.svg" alt="nft-image" />
      </div>
      <div class="content"></div>
      <div class="footer footer-normal">
        <div class="label">
          {{ collection.name }}
        </div>
        <img class="image" src="/svg/icon-nft-expand.svg" alt="expand" />
      </div>
    </div>
    <div class="element-black-shadow" :class="{ 'element-black-shadow-non-sol': !collection.sol ||collection.sol == 0 }" />
    <div class="element-gray-shadow" :class="{ 'element-gray-shadow-non-sol': !collection.sol ||collection.sol == 0 }" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nft-collection-box.scss';
</style>