<script setup>
import { computed, ref } from 'vue'
import { MOON_XYZ } from '../constants/copy'
import { CONTINUE } from '../constants'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'

const clicks = ref(0)
const emTranslate = ref(0)
const pTranslate = ref(130)
const cpTranslate = ref(130)
const incSignup = ref(false)

const continueBtn = () => {
  switch (clicks.value) {
    case 0:
      emTranslate.value = -130
      pTranslate.value = 0
      incSignup.value = true
      break
    case 1:
      pTranslate.value = -130
      cpTranslate.value = 0
      break

    default:
      break
  }
  // ---------
  clicks.value++
}

const showPassNote = computed(() => {
  if (clicks.value !== 0) {
    return true
  }
  return false
})
</script>

<template>
  <main class="signup-container">
    <div />
    <div class="signup-section">
      <div class="signup-window" :class="{ 'inc-signup': incSignup }">
        <h1>{{ MOON_XYZ }}</h1>
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
          <div class="pass-note" :class="{ 'note-open': showPassNote }">
            <div>
              Minimum 8 characters long, at least 1 special, 1 number and 1
              letter
            </div>
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
  height: 446px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: height 0.5s ease;
}
.inc-signup {
  height: 506px;
}
h2 {
  margin-bottom: 15px;
}

.email-input {
  margin-bottom: 20px;
  input {
    left: 0;
  }
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

form {
  margin-bottom: 20px;
}
.pass-note {
  height: 0px;
  display: flex;
  align-items: flex-start;
  text-align: center;
  font-size: 12px;
  transition: all 1s ease;
}
.note-open {
  height: 60px;
}
.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
