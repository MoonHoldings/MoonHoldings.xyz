<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MOON_XYZ, SUBMIT } from '../constants/copy'
import { CONTINUE } from '../constants'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'
import SuccessAlert from '@/components/partials/SuccessAlert.vue'
import ErrorAlert from '@/components/partials/ErrorAlert.vue'
import { useUserStore } from '@/stores/user'
import passwordValidate from '@/utils/passwordValidate'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const errorEmail = ref(false)
const errorPassword = ref(false)
const errorCPassword = ref(false)

const clicks = ref(0)
const emTranslate = ref(0)
const pTranslate = ref(130)
const cpTranslate = ref(130)
const incSignup = ref(false)

const userStore = useUserStore()

const continueBtn = async () => {
  switch (clicks.value) {
    case 0:
      validateEmail()
      break
    case 1:
      validatePassword()
      break
    case 2:
      await signup()
      break

    default:
      break
  }
}

const validateEmail = () => {
  const result = email.value.includes('@')
  if (!result || !email.value) {
    errorEmail.value = true
  } else {
    errorEmail.value = false
    emTranslate.value = -130
    pTranslate.value = 0
    incSignup.value = true

    clicks.value++
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
  if (password.value !== confirmPassword.value) {
    errorCPassword.value = true
    errorMessage.value = 'Password does not match'
  } else {
    errorCPassword.value = false
    try {
      const response = await userStore.signup({
        email: email.value,
        password: password.value,
      })

      if (!response.success) {
        errorCPassword.value = true
        errorMessage.value = response.message
        setTimeout(() => {
          router.go()
        }, 5600)
        return
      }

      clicks.value++
    } catch (error) {
      errorCPassword.value = true
      errorMessage.value = error.message
    }
  }
}

const showPassNote = computed(() => {
  if (emTranslate.value === -130) {
    return true
  }
  return false
})
const showSuccessAlert = computed(() => {
  if (clicks.value > 2) {
    return true
  }
  return false
})
</script>

<template>
  <main class="signup-container">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInLeftBig"
    >
      <SuccessAlert v-if="showSuccessAlert" />
    </transition>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInLeftBig"
      leave-active-class="animate__animated animate__fadeOutRightBig"
    >
      <ErrorAlert :message="errorMessage" v-if="errorCPassword" />
    </transition>
    <div />
    <div class="signup-section">
      <div class="signup-window" :class="{ 'inc-signup': incSignup }">
        <h1>{{ MOON_XYZ }}</h1>
        <h2>Sign Up</h2>

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
              @change="insertPassword"
            />
            <input
              class="c-p-box"
              :class="{
                error: errorCPassword,
                'input-default': !errorCPassword,
              }"
              :style="{ transform: `translateX(${cpTranslate}%)` }"
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
          </div>
          <div class="pass-note" :class="{ 'note-open': showPassNote }">
            <div>
              Minimum 8 characters long, at least 1 special, 1 number and 1
              letter
            </div>
          </div>
          <button class="continue-btn" @click.prevent="continueBtn">
            {{ clicks > 1 ? SUBMIT : CONTINUE }}
          </button>
        </form>
        <div class="social-signin">
          <SocialAuthBtn bg-color="#55ACEE" text="Sign Up With Twitter" />
          <SocialAuthBtn bg-color="#7289DA" text="Sign Up With Discord" />
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
  transition: height 0.4s ease;
}
.inc-signup {
  height: 506px;
}
h2 {
  margin-bottom: 15px;
}

.input-default {
  border: 2px solid var(--pink);
  background: #eee;
}
.error {
  background: rgba(255, 111, 111, 0.5);
  border: 2px solid red;
}

.email-input {
  margin-bottom: 20px;
  input {
    left: 0;
  }
  .e-box {
    position: relative;
    z-index: 20;
    transition: transform 0.4s ease-in-out;
  }
  .p-box {
    position: absolute;
    z-index: 19;
    transition: transform 0.4s ease-in-out;
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
</style>
