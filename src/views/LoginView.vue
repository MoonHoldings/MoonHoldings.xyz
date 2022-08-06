<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import {
  MOON_XYZ,
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  DONT_HAVE_ACCOUNT,
  CONTINUE,
  SUBMIT,
} from '../constants/copy'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'
import { useUserStore } from '@/stores/user'
import { useUtilStore } from '@/stores/util'

const clicks = ref(0)
const email = ref('')
const password = ref('')

const errorEmail = ref(false)
const errorPassword = ref(false)

const emTranslate = ref(0)
const pTranslate = ref(130)

const userStore = useUserStore()
const utilStore = useUtilStore()

const continueBtn = async () => {
  switch (clicks.value) {
    case 0:
      validateEmail()
      break
    case 1:
      await login()
      break

    default:
      break
  }
}

const validateEmail = () => {
  const isValidEmail = email.value.includes('@')
  if (!email.value) {
    errorEmail.value = true
    utilStore.mutate_errorLogin(true)
    utilStore.mutate_errorMessage("Email field can't be empty")
  } else if (!isValidEmail) {
    errorEmail.value = true
    utilStore.mutate_errorLogin(true)
    utilStore.mutate_errorMessage('Email is not valid')
  } else {
    utilStore.mutate_errorLogin(false)
    utilStore.mutate_errorMessage('')
    errorEmail.value = false
    emTranslate.value = -130
    pTranslate.value = 0

    clicks.value++
  }
}
const login = async () => {
  utilStore.mutate_errorLogin(false)
  try {
    const response = await userStore.login({
      email: email.value,
      password: password.value,
    })

    if (!response.success) {
      utilStore.mutate_errorLogin(true)
      utilStore.mutate_errorMessage(response.message)
      return
    }

    utilStore.mutate_showSuccessAlert(true)
    clicks.value++
  } catch (error) {
    utilStore.mutate_errorLogin(true)
    utilStore.mutate_errorMessage(error.message)
  }
}
</script>

<template>
  <main class="login-container">
    <div />
    <div class="login-section">
      <div class="login-window">
        <RouterLink to="/">
          <h1>{{ MOON_XYZ }}</h1>
        </RouterLink>
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
            <button class="continue-btn" @click.prevent="continueBtn">
              {{ clicks === 1 ? SUBMIT : CONTINUE }}
            </button>
          </div>

          <div class="dont-have-account">
            <router-link to="/sign-up">{{ DONT_HAVE_ACCOUNT }}</router-link>
            <button
              class="signup-btn"
              @click.prevent="$router.push('/sign-up')"
            >
              {{ SIGN_UP }}
            </button>
          </div>

          <div class="social-signin">
            <SocialAuthBtn
              social-name="twitter"
              bg-color="#55ACEE"
              text="Log In With Twitter"
            />
            <SocialAuthBtn
              social-name="discord"
              bg-color="#7289DA"
              text="Log In With Discord"
            />
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
  overflow: hidden;
}

.email-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20.41px;

  input {
    margin-bottom: 20.41px;
    border-radius: 4px;
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
