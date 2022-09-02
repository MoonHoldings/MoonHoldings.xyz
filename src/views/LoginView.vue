<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import {
  MOONHOLDINGS,
  LOGIN,
  SIGN_UP,
  EMAIL_NOT_VALID,
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
const isEyeOpen = ref('password')

const errorEmail = ref(false)
const errorPassword = ref(false)

const emTranslate = ref(0)
const pTranslate = ref(130)

const userStore = useUserStore()
const utilStore = useUtilStore()

const continueBtn = async () => {
  console.log('continueBtn clicked')
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
    utilStore.mutate_successMessage('You have been logged in successfully!')
    clicks.value++
  } catch (error) {
    utilStore.mutate_errorLogin(true)
    console.log('error', error)
    utilStore.mutate_errorMessage(error.message)
  }
}

const blink = () => {
  if (isEyeOpen.value === 'password') {
    isEyeOpen.value = 'text'
  } else {
    isEyeOpen.value = 'password'
  }
}
</script>

<template>
  <main class="login-container">
    <div />
    <div class="login-section">
      <div class="login-window">
        <RouterLink to="/">
          <h1>{{ MOONHOLDINGS }}</h1>
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
              :type="isEyeOpen"
              placeholder="Password"
              v-model="password"
            />
            <transition
              mode="out-in"
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <button
                v-if="pTranslate === 0"
                @click.prevent="blink"
                class="eye"
              >
                <svg
                  v-if="isEyeOpen === 'text'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 open"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-if="isEyeOpen === 'password'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 closed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
              </button>
            </transition>
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
  position: relative;
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

  .eye {
    position: absolute;
    top: 10px;
    background: none;
    border: none;
    outline: none;
    z-index: 25;

    svg {
      height: 30px;
    }
  }

  .animate__animated.animate__fadeIn,
  .animate__animated.animate__fadeOut {
    --animate-duration: 1s;
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
