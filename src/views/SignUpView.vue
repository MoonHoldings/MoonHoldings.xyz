<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { MOON_XYZ, SUBMIT } from '../constants/copy'
import { CONTINUE, SIGN_UP } from '../constants'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'
import { useUserStore } from '@/stores/user'
import { useUtilStore } from '@/stores/util'
import passwordValidate from '@/utils/passwordValidate'
// import delay from '@/utils/delay'

const route = useRoute()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorEmail = ref(false)
const errorPassword = ref(false)

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
    utilStore.mutate_errorSignup(true)
    utilStore.mutate_errorMessage("Email field can't be empty")
  } else if (!isValidEmail) {
    errorEmail.value = true
    utilStore.mutate_errorSignup(true)
    utilStore.mutate_errorMessage('Email is not valid')
  } else {
    if (checkboxValue.value === true) {
      utilStore.mutate_errorSignup(false)
      utilStore.mutate_errorMessage('')
      errorEmail.value = false
      emTranslate.value = -130
      pTranslate.value = 0

      clicks.value++
    } else {
      // clickedOnce.value = true
      errorEmail.value = false
      utilStore.mutate_errorSignup(true)
      utilStore.mutate_errorMessage('Check the terms and policies')
    }
  }
}

const validatePassword = () => {
  const isValid = passwordValidate(password.value)
  if (!isValid || !password.value) {
    errorPassword.value = true
  } else {
    errorPassword.value = false
    pTranslate.value = -130
    cpTranslate.value = 0

    clicks.value++
  }
}

const signup = async () => {
  submitClick.value = true
  if (password.value !== confirmPassword.value) {
    utilStore.mutate_errorSignup(true)
    utilStore.mutate_errorMessage('Password does not match')
    submitClick.value = false
  } else {
    utilStore.mutate_errorSignup(false)
    try {
      const response = await userStore.signup({
        email: email.value,
        password: password.value,
      })

      if (!response.success) {
        utilStore.mutate_errorSignup(true)
        utilStore.mutate_errorMessage('')
        utilStore.mutate_headingEndPoint('login')
        submitClick.value = false
        return
      }

      utilStore.mutate_showSuccessAlert(true)
      clicks.value++
    } catch (error) {
      utilStore.mutate_errorSignup(true)
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
    utilStore.mutate_errorSignup(false)
    utilStore.mutate_errorMessage('')
  }
}

const incSignup = computed(() => {
  return pTranslate.value === 0
})
const disabled_continue_btn = reactive({
  background: 'rgb(110,110,110)',
  borderColor: 'rgb(110,110,110)',
})
onMounted(() => {
  submitClick.value = false
})
watch(route, (newValue) => {
  if (newValue.path !== '/sign-up') {
    utilStore.mutate_errorSignup(false)
    utilStore.mutate_showSuccessAlert(false)
  }
})
</script>

<template>
  <main class="signup-container">
    <div />
    <div class="signup-section">
      <div class="signup-window" :class="{ 'inc-signup': incSignup }">
        <RouterLink to="/">
          <h1>{{ MOON_XYZ }}</h1>
        </RouterLink>
        <h2>{{ SIGN_UP }}</h2>

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

            <input
              class="c-p-box"
              :class="{
                error: utilStore.errorSignup,
                'input-default': !utilStore.errorSignup,
              }"
              :style="{ transform: `translateX(${cpTranslate}%)` }"
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
          </div>

          <div class="pass-note" :class="{ 'note-open': incSignup }">
            <div>
              Minimum 8 characters long, at least 1 special, 1 number and 1
              letter
            </div>
          </div>

          <div class="accept-terms-section">
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
        </form>
        <div class="social-signin">
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
        </div>
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
  min-height: 513.6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: min-height 0.4s ease;
  padding: 2rem;
}
.arrow {
  position: absolute;
  left: -50px;
  width: 0;
  height: 0;
  background: none;
  outline: none;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid #fff;
}

.inc-signup {
  min-height: 571.2px;
}

.input-default {
  background: #eee;
  border: 2px solid var(--pink);
}

.error {
  background: rgba(255, 111, 111, 0.5);
  border: 2px solid #ff6f6f;
}

.email-input {
  margin-bottom: 20px;

  input {
    left: 0;
  }

  .c-p-box {
    position: absolute;
    z-index: 18;
    transition: transform 0.4s ease-in-out;
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
  transition: all 0.4s ease;
}

.note-open {
  height: 60px;
}

.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.accept-terms-section {
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 15px;
  font-size: 12px;
  background-color: #fff;

  a {
    text-decoration: underline;
  }
}

#accept-terms {
  height: 20px;
}
</style>
