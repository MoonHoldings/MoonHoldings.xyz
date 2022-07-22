<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MOON_XYZ, SUBMIT } from '../constants/copy'
import { CONTINUE } from '../constants'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'
import { useUserStore } from '@/stores/user'
import { useUtilStore } from '@/stores/util'
import passwordValidate from '@/utils/passwordValidate'

// const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorEmail = ref(false)
const errorPassword = ref(false)

const clicks = ref(0)
const emTranslate = ref(0)
const pTranslate = ref(130)
const cpTranslate = ref(130)
const incSignup = ref(false)

const userStore = useUserStore()
const utilStore = useUtilStore()

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
    utilStore.mutate_errorSignup(true)
    utilStore.mutate_errorMessage('Password does not match')
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
        return
      }

      utilStore.mutate_showSuccessAlert(true)
      clicks.value++
    } catch (error) {
      utilStore.mutate_errorSignup(true)
      utilStore.mutate_errorMessage(error.message)
    }
  }
}

const showPassNote = computed(() => {
  if (emTranslate.value === -130) {
    return true
  }
  return false
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
</style>
