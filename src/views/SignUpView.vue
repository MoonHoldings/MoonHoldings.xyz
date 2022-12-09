<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { MOONHOLDINGS, SUBMIT } from '../constants/copy'
import { CONTINUE, SIGN_UP } from '../constants'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'
import { useUserStore } from '@/stores/user'
import { useUtilStore } from '@/stores/util'
import passwordValidate from '@/utils/passwordValidate'

const route = useRoute()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isPasswordOpen = ref('password')

const errorEmail = ref(false)
const errorPassword = ref(false)
const errorCPassword = ref(false)

const clicks = ref(0)
const submitClick = ref(false)
const emTranslate = ref(0)
const pTranslate = ref(130)
const cpTranslate = ref(130)
const checkboxValue = ref(null)

const userStore = useUserStore()
const utilStore = useUtilStore()

const continueBtn = () => {
  switch (clicks.value) {
    case 0:
      validateEmail()
      break
    case 1:
      validatePassword()
      break
    case 2:
      signup()
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
    if (checkboxValue.value === true) {
      utilStore.mutate_errorToggle(false)
      utilStore.mutate_errorMessage('')
      errorEmail.value = false
      emTranslate.value = -130
      pTranslate.value = 0

      clicks.value++
    } else {
      errorEmail.value = false
      utilStore.mutate_errorToggle(true)
      utilStore.mutate_errorMessage('Check the terms and policies')
    }
  }
}

const validatePassword = () => {
  const isValid = passwordValidate(password.value)
  if (!password.value) {
    errorPassword.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage("Password field can't be empty")
  } else if (!isValid) {
    errorPassword.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage("Password doesn't meet the criteria")
  } else {
    errorPassword.value = false
    utilStore.mutate_errorToggle(false)
    utilStore.mutate_errorMessage('')
    pTranslate.value = -130
    cpTranslate.value = 0

    clicks.value++
  }
}

const signup = async () => {
  submitClick.value = true
  if (password.value !== confirmPassword.value) {
    errorCPassword.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage('Password does not match')
    submitClick.value = false
  } else {
    errorCPassword.value = false
    utilStore.mutate_errorToggle(false)
    utilStore.mutate_errorMessage('')
    try {
      const response = await userStore.signup({
        email: email.value,
        password: password.value,
      })

      if (!response.success) {
        utilStore.mutate_errorToggle(true)
        utilStore.mutate_errorMessage(
          'There is an account associated with this email'
        )
        utilStore.mutate_headingEndPoint('login')
        submitClick.value = false

        mixpanel.track('*User Signed up*', {
          email: email.value,
        })

        return
      }

      utilStore.mutate_showSuccessAlert(true)
      utilStore.mutate_successMessage(
        'We have sent a confirmation email, please verify then login! :D'
      )
      clicks.value++
    } catch (error) {
      mixpanel.track('Error: SignUpView.vue > signup', {
        error: error,
        message: error.message,
      })
      errorCPassword.value = true
      utilStore.mutate_errorToggle(true)
      utilStore.mutate_errorMessage(error.message)
      submitClick.value = false
    }
  }
}

const fieldBack = () => {
  if (clicks.value > 0) {
    if (clicks.value === 1) {
      emTranslate.value = 0
      pTranslate.value = 130
    }
    if (clicks.value === 2) {
      pTranslate.value = 0
      cpTranslate.value = 130
    }
    clicks.value--
    errorEmail.value = false
    utilStore.mutate_errorToggle(false)
    utilStore.mutate_errorMessage('')
  }
}

const disabled_continue_btn = reactive({
  background: 'rgb(110,110,110)',
  borderColor: 'rgb(110,110,110)',
})

const incSignup = computed(() => {
  return pTranslate.value === 0
})

const toggleEye = () => {
  if (isPasswordOpen.value === 'password') {
    isPasswordOpen.value = 'text'
  } else {
    isPasswordOpen.value = 'password'
  }
}

onMounted(() => {
  submitClick.value = false
})
watch(route, (newValue) => {
  if (newValue.path !== '/sign-up') {
    utilStore.mutate_errorToggle(false)
    utilStore.mutate_showSuccessAlert(false)
  }
})
watch(clicks, () => {
  isPasswordOpen.value = 'password'
})
</script>

<template>
  <main class="signup-container">
    <div />
    <div class="signup-section">
      <div class="signup-window" :class="{ 'inc-signup': incSignup }">
        <RouterLink to="/">
          <h1>{{ MOONHOLDINGS }}</h1>
        </RouterLink>
        <h2>{{ SIGN_UP }}</h2>

        <div class="form">
          <div class="email-input">
            <input
              class="e-box"
              :class="{ error: errorEmail, 'input-default': !errorEmail }"
              :style="{ transform: `translateX(${emTranslate}%)` }"
              type="email"
              placeholder="Email"
              v-model="email"
              @keyup.enter="continueBtn"
            />

            <input
              class="p-box"
              :class="{ error: errorPassword, 'input-default': !errorPassword }"
              :style="{ transform: `translateX(${pTranslate}%)` }"
              :type="isPasswordOpen"
              placeholder="Password"
              v-model="password"
              @keyup.enter="continueBtn"
            />

            <input
              class="c-p-box"
              :class="{
                error: errorCPassword,
                'input-default': !errorCPassword,
              }"
              :style="{ transform: `translateX(${cpTranslate}%)` }"
              :type="isPasswordOpen"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              @keyup.enter="continueBtn"
            />
            <transition
              mode="out-in"
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <button
                @click.prevent="toggleEye"
                class="eye"
                v-if="clicks > 0 && clicks <= 2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 open"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  v-if="isPasswordOpen === 'text'"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 closed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  v-if="isPasswordOpen === 'password'"
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
          </div>

          <div class="pass-note" :class="{ 'note-open': incSignup }">
            <div>
              Minimum 8 characters long, at least 1 special, 1 number and 1
              letter
            </div>
          </div>

          <div
            class="accept-terms-section"
            :class="{ 'check-open': clicks === 0 }"
          >
            <input type="checkbox" id="accept-terms" v-model="checkboxValue" />
            <label for="accept-terms">
              I certify that I am 18 years of age or older, agree to the
              <RouterLink to="/terms-of-service" target="_blank"
                >terms</RouterLink
              >, and acknowledge the
              <RouterLink to="/privacy-policy" target="_blank"
                >privacy policy</RouterLink
              >.
            </label>
          </div>
          <!-- :class="{ 'disable-bg': submitClick }" -->
          <button
            class="continue-btn"
            :style="submitClick === true ? disabled_continue_btn : ''"
            :disabled="submitClick"
            @click.prevent="continueBtn"
          >
            {{ clicks > 1 ? SUBMIT : CONTINUE }}
          </button>
        </div>
        <!-- <div class="social-signin">
          <SocialAuthBtn
            social-name="twitter"
            :submitClick="submitClick"
            bg-color="#55ACEE"
            text="Sign Up With Twitter"
          />
          <SocialAuthBtn
            social-name="discord"
            :submitClick="submitClick"
            bg-color="#7289DA"
            text="Sign Up With Discord"
          />
        </div> -->
      </div>
      <button
        @click.prevent="fieldBack"
        v-if="clicks > 0 && clicks < 3 && submitClick === false"
        class="arrow"
      ></button>
    </div>
    <div />
  </main>
</template>

<style scoped lang="scss">
@import '@/sass/mixins/primary-btn.scss';
.signup-window {
  position: relative;
  overflow: hidden;
  min-height: 44.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: min-height 0.4s ease;
  padding: 3.2rem;
}
.arrow {
  position: absolute;
  left: -5rem;
  width: 0;
  height: 0;
  background: none;
  outline: none;
  border-top: 1.5rem solid transparent;
  border-bottom: 1.5rem solid transparent;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid #fff;
}

.inc-signup {
  min-height: 50.1rem;
}

.input-default {
  background: #eee;
  border: 0.2rem solid var(--pink);
}

.error {
  background: rgba(255, 111, 111, 0.5);
  border: 0.2rem solid #ff6f6f;
}

.email-input {
  margin-bottom: 2rem;

  input {
    left: 0;
  }

  .c-p-box {
    position: absolute;
    z-index: 18;
    transition: transform 0.4s ease-in-out;
  }

  .eye {
    position: absolute;
    right: 0.2rem;
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
    --animate-duration: 0.7s;
  }
}

.form {
  margin-bottom: 2rem;
}

.pass-note {
  height: 0px;
  display: flex;
  align-items: flex-start;
  text-align: center;
  font-size: 1.2rem;
  transition: all 0.4s ease;
}

.note-open {
  height: 6rem;
}

.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

.accept-terms-section {
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 0;
  margin-bottom: 0;
  font-size: 1.2rem;
  background-color: #fff;
  transition: all 0.4s ease;
  overflow: hidden;
  input[type='checkbox'] {
    outline: none;
    border: none;
  }
  a {
    text-decoration: underline;
  }
}
.check-open {
  height: 7.26rem;
  margin-bottom: 1.5rem;
}

#accept-terms {
  height: 2rem;
}
</style>
