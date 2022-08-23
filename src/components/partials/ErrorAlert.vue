<script setup>
import { useUtilStore } from '@/stores/util'

const utilStore = useUtilStore()

const removeAlert = () => {
  console.log('works')
  utilStore.mutate_errorSignup(false)
  utilStore.mutate_errorLogin(false)
  utilStore.mutate_errorMessage('')
}
</script>

<template>
  <div class="error-alert" @click="removeAlert">
    <div v-if="utilStore.errorMessage">
      {{ utilStore.errorMessage }}
    </div>
    <div v-else>
      An account already exists with this email. Want to
      <router-link :to="{ name: utilStore.headingEndPoint }">login</router-link>
      instead?
    </div>
  </div>
</template>

<style lang="scss">
.error-alert {
  width: 100%;
  position: fixed;
  top: 0;
  height: 80px;
  background: #ff6f6f;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  > div {
    color: #ffffff;
    font-size: 24px;

    a {
      color: #fff;
    }
  }
}
</style>
