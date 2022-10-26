<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps(['collection'])
const { collection } = props
</script>

<template>
  <div class="element element-normal-line">
    <div class="element-container">
      <div class="header header-normal">
        <div>
          Listed: {{ collection.list }} SQL
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
    <div class="element-black-shadow" />
    <div class="element-gray-shadow" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/nft-collection-box.scss';
</style>