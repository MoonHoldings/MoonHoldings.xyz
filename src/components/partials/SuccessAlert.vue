<script setup>
import { useUtilStore } from '@/stores/util'

const utilStore = useUtilStore()

const removeIt = () => {
  utilStore.mutate_showSuccessAlert(false)
  utilStore.mutate_successMessage('')
}
</script>

<template>
  <div class="success-alert" @click="removeIt">
    <div>{{ utilStore.successMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/mixins/breakpoints.scss';
.success-alert {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  width: 100%;
  min-height: 80px;
  padding: 1rem;
  background-color: #78ffa6db;
  z-index: 100;
  @include bp-down(small) {
    min-height: 50px;
    font-size: 1rem;
    text-align: center;
    padding: 15px;
  }
}
</style>
