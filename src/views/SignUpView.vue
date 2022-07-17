<script setup>
import { ref } from 'vue'
import { MOONHOLDINGS } from '../constants/copy'
import { CONTINUE } from '../constants'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'

let clicks = 0
const emTranslate = ref(0)
const pTranslate = ref(130)
const cpTranslate = ref(130)

const continueBtn = () => {
  switch (clicks) {
    case 0:
      emTranslate.value = -130
      break
    case 1:
      pTranslate.value = 0
      break
    case 2:
      pTranslate.value = -130
      break
    case 3:
      cpTranslate.value = 0
      break

    default:
      break
  }
  // ---------
  clicks++
}
</script>

<template>
  <main class="signup-container">
    <div />
    <div class="signup-section">
      <div class="signup-window">
        <h1>{{ MOONHOLDINGS }}</h1>
        <h2>Sign Up</h2>

        <form action="">
          <div class="email-input">
            <input
              class="e-box"
              :style="{ transform: `translateX(${emTranslate}%)` }"
              type="email"
              placeholder="Email"
            />
            <input
              class="p-box"
              :style="{ transform: `translateX(${pTranslate}%)` }"
              type="password"
              placeholder="Password"
            />
            <input
              class="c-p-box"
              :style="{ transform: `translateX(${cpTranslate}%)` }"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button class="continue-btn" @click.prevent="continueBtn">
            {{ CONTINUE }}
          </button>
        </form>
        <div class="social-signin">
          <SocialAuthBtn bg-color="#55ACEE" text="Log In With Twitter" />
          <SocialAuthBtn bg-color="#7289DA" text="Log In With Discord" />
        </div>
      </div>
    </div>
    <div />
  </main>
</template>

<style scoped lang="scss">
@import '@/sass/mixins/primary-btn.scss';

.signup-window {
  overflow: hidden;
}

.email-input {
  .e-box {
    position: relative;
    z-index: 20;
    transition: transform 0.5s ease-in-out;
  }
  .p-box {
    position: absolute;
    z-index: 19;
    transition: transform 0.5s ease-in-out;
  }
  .c-p-box {
    position: absolute;
    z-index: 18;
    transition: transform 0.5s ease-in-out;
  }
}

.continue {
  @include primary-btn;
}

form {
  margin-bottom: 20px;
}
.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
