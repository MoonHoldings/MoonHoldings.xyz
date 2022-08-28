<script setup>
import { useUtilStore } from '@/stores/util'

const utilStore = useUtilStore()

const removeAlert = () => {
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
  z-index: 100;
  @include bp-down(small) {
    min-height: 50px;
    padding: 15px;
  }

  > div {
    color: #ffffff;
    font-size: 24px;
    @include bp-down(small) {
      font-size: 16px;
    }

    a {
      color: #fff;
    }
  }
}
</style>
