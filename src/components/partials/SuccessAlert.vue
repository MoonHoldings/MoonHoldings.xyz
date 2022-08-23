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
.success-alert {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 100%;
  height: 80px;
  background-color: #78ffa6db;
  z-index: 100;
}
</style>
