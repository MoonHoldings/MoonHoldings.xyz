<script setup>
import { ref } from 'vue'
import {
  MOON_XYZ,
  LOGIN,
  FORGOT_PASSWORD,
  DONT_HAVE_ACCOUNT,
  CONTINUE,
} from '../constants/copy'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'

const clicks = ref(0)
const email = ref('')
const password = ref('')

const errorEmail = ref(false)
const errorPassword = ref(false)

const emTranslate = ref(0)
const pTranslate = ref(130)

const continueBtn = () => {
  switch (clicks.value) {
    case 0:
      validateEmail()
      break

    default:
      break
  }

  clicks.value++
}

const validateEmail = () => {
  const result = email.value.includes('@')
  if (!result || !email.value) {
    errorEmail.value = true
  } else {
    errorEmail.value = false
    emTranslate.value = -130
    pTranslate.value = 0

    clicks.value++
  }
}
// const login = ()=>{

// }
</script>

<template>
  <main class="login-container">
    <div />
    <div class="login-section">
      <div class="login-window">
        <h1>{{ MOON_XYZ }}</h1>
        <h2>{{ LOGIN }}</h2>

        <form action="">
          <div class="email-input">
            <input
              class="e-box"
              :class="{ error: errorEmail, 'input-default': !errorEmail }"
              :style="{ transform: `translateX(${emTranslate}%)` }"
              type="email"
              placeholder="Email"
              v-model="email"
            />

            <input
              class="p-box"
              :class="{ error: errorPassword, 'input-default': !errorPassword }"
              :style="{ transform: `translateX(${pTranslate}%)` }"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <a href="/forgot-password">{{ FORGOT_PASSWORD }}</a>
            <button class="continue-btn" @click="continueBtn">
              {{ CONTINUE }}
            </button>
          </div>

          <div class="dont-have-account">
            <router-link to="/sign-up">{{ DONT_HAVE_ACCOUNT }}</router-link>
            <button
              class="signup-btn"
              @click.prevent="$router.push('/sign-up')"
            >
              Sign Up
            </button>
          </div>

          <div class="social-signin">
            <SocialAuthBtn bg-color="#55ACEE" text="Log In With Twitter" />
            <SocialAuthBtn bg-color="#7289DA" text="Log In With Discord" />
          </div>
        </form>
      </div>
    </div>
    <div />
  </main>
</template>

<style scoped lang="scss">
@import '@/sass/mixins/primary-btn.scss';

.input-default {
  background: #eee;
  border: 2px solid var(--pink);
}
.error {
  background: rgba(255, 111, 111, 0.5);
  border: 2px solid #ff6f6f;
}

.login-window {
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2 {
  margin-bottom: 26px;
}
.email-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20.41px;

  input {
    margin-bottom: 20.41px;
  }
  a {
    color: #000;
    text-decoration: none;
    font-size: 1rem;
    margin-bottom: 20.41px;
  }
}

.dont-have-account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20.41px;

  a {
    color: #000;
    text-decoration: none;
    font-size: 1rem;
  }
  button {
    height: 48px;
  }
}
.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
