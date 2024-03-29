<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
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
import { useCoinStore } from '@/stores/coin'
import { useUtilStore } from '@/stores/util'
import cryptoJS from 'crypto-js'
import decoding from 'jwt-decode'
import setMoonUser from '@/utils/setMoonUser'
import setMoonToken from '@/utils/setMoonToken'

const clicks = ref(0)
const submitClick = ref(false)
const email = ref('')
const password = ref('')
const isEyeOpen = ref('password')

const errorEmail = ref(false)
const errorPassword = ref(false)
const emailRef = ref(null)

const emTranslate = ref(0)
const pTranslate = ref(130)

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const coinStore = useCoinStore()
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
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage("Email field can't be empty")
  } else if (!isValidEmail) {
    errorEmail.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage('Email is not valid')
  } else {
    utilStore.mutate_errorToggle(false)
    utilStore.mutate_errorMessage('')
    errorEmail.value = false
    emTranslate.value = -130
    pTranslate.value = 0

    clicks.value++
  }
}

const login = async () => {
  submitClick.value = true
  utilStore.mutate_errorToggle(false)
  try {
    const response = await userStore.login({
      email: email.value,
      password: password.value,
    })

    if (!response.success) {
      utilStore.mutate_errorToggle(true)
      utilStore.mutate_errorMessage(response.message)
      submitClick.value = false
      return
    }

    clicks.value++

    const moonUser = await decoding(response.accessToken)

    setMoonUser(moonUser)
    setMoonToken(response.accessToken)

    //navigate to crypto vue
    router.push('/crypto')
  } catch (error) {
    submitClick.value = false
    mixpanel.track('Error: LoginView.vue > login', {
      error: error,
      message: error.message,
    })
    utilStore.mutate_errorToggle(true)
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

const disabled_continue_btn = reactive({
  background: 'rgb(110,110,110)',
  borderColor: 'rgb(110,110,110)',
})

onMounted(() => {
  submitClick.value = false
  const error = route.query.error ? true : false

  if (error) {
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage(
      'Verify link is invalid, reset password in order to reset verify link.'
    )
  }

  emailRef.value.focus()
})
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

        <div>
          <div class="email-input">
            <input
              class="e-box"
              :class="{ error: errorEmail, 'input-default': !errorEmail }"
              :style="{ transform: `translateX(${emTranslate}%)` }"
              type="email"
              placeholder="Email"
              v-model="email"
              ref="emailRef"
              @keyup.enter="continueBtn"
              @keydown.prevent.tab="continueBtn"
            />

            <input
              class="p-box"
              :class="{ error: errorPassword, 'input-default': !errorPassword }"
              :style="{ transform: `translateX(${pTranslate}%)` }"
              :type="isEyeOpen"
              placeholder="Password"
              tabindex="0"
              v-model="password"
              @keyup.enter="continueBtn"
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
                tabindex="-1"
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
            <button
              class="continue-btn"
              :style="submitClick === true ? disabled_continue_btn : ''"
              :disabled="submitClick"
              @click.prevent="continueBtn"
            >
              {{ clicks === 1 ? SUBMIT : CONTINUE }}
            </button>
          </div>

          <div class="dont-have-account">
            <router-link to="/sign-up" tabindex="1">{{
              DONT_HAVE_ACCOUNT
            }}</router-link>
            <button
              class="signup-btn"
              @click.prevent="$router.push('/sign-up')"
            >
              {{ SIGN_UP }}
            </button>
          </div>

          <!-- <div class="social-signin">
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
          </div> -->
        </div>
      </div>
    </div>
    <div />
  </main>
</template>

<style scoped lang="scss">
@import '@/sass/mixins/primary-btn.scss';
.input-default {
  background: #eee;
  border: 0.2rem solid var(--pink);
}
.error {
  background: rgba(255, 111, 111, 0.5);
  border: 0.2rem solid #ff6f6f;
}

.login-window {
  height: 58rem;
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
    margin-bottom: 2.041rem;
    border-radius: 0.4rem;
  }

  a {
    color: #000;
    text-decoration: none;
    font-size: 1.6rem;
    margin-bottom: 2.041rem;
  }

  .eye {
    position: absolute;
    top: 1rem;
    background: none;
    border: none;
    outline: none;
    z-index: 25;

    svg {
      height: 3rem;
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
  margin-bottom: 2.041rem;

  a {
    color: #000;
    text-decoration: none;
    font-size: 1.6rem;
  }
  button {
    height: 4.8rem;
  }
}
.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
</style>
