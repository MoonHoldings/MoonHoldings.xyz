<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/partials/Header.vue'

const router = useRouter()
</script>

<template>
  <Header />
</template>

<style lang="scss" scoped>
@import '@/sass/nft-single-collection.scss';
</style>