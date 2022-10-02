<script setup>
import { useUtilStore } from '@/stores/util'

const utilStore = useUtilStore()

const removeAlert = () => {
  utilStore.mutate_errorToggle(false)
  utilStore.mutate_errorMessage('')
}
</script>

<template>
  <div class="error-alert" @click="removeAlert">
    {{ utilStore.errorMessage }}
  </div>
</template>

<style lang="scss">
@import '@/sass/mixins/breakpoints.scss';

.error-alert {
  width: 100%;
  position: fixed;
  top: 0;
  min-height: 80px;
  padding: 1rem;
  background: #ff6f6f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 24px;
  z-index: 100;
  @include bp-down(small) {
    min-height: 50px;
    padding: 15px;
    font-size: 16px;
  }
}
</style>
