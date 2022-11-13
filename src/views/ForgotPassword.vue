<script setup>
import { MOONHOLDINGS, PASSWORD_RECOVERY, SUBMIT } from '../constants/copy'
import { ref } from 'vue'
import { useUtilStore } from '@/stores/util'
import { useUserStore } from '@/stores/user'

const utilStore = useUtilStore()
const emailInput = ref('')
const userStore = useUserStore()
const errorEmail = ref(false)
const disableButton = ref(false)

const submitEmail = async () => {
  const isValidEmail = emailInput.value.includes('@')

  if (!emailInput.value) {
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

    disableButton.value = true
    const response = await userStore.forgotPassword(emailInput.value)

    if (response.success) {
      utilStore.mutate_showSuccessAlert(true)
      utilStore.mutate_successMessage(response.message)
    }
    disableButton.value = false
  }
}
</script>

<template>
  <main class="forgotPassword-container">
    <div />
    <div class="forgot-section">
      <div class="forgot-window">
        <h1>{{ MOONHOLDINGS }}</h1>
        <h2>{{ PASSWORD_RECOVERY }}</h2>

        <div class="form">
          <input
            type="email"
            :class="{ error: errorEmail, 'input-default': !errorEmail }"
            placeholder="Email"
            v-model="emailInput"
          />
          <button
            :disabled="disableButton"
            :class="{ disabled_button_style: disableButton }"
            @click="submitEmail"
          >
            {{ SUBMIT }}
          </button>
        </div>

        <div class="guide-text">
          Submit the email you used to sign up with. If you used Twitter or
          Discord, this will be the email you signed up with on those accounts.
        </div>
      </div>
    </div>
    <div />
  </main>
</template>

<style lang="scss" scoped>
.input-default {
  background: #eee;
  border: 0.2rem solid var(--pink);
}
.error {
  background: rgba(255, 111, 111, 0.5);
  border: 0.2rem solid #ff6f6f;
}

.disabled_button_style {
  background: rgb(110, 110, 110) !important;
  border: 1px solid rgb(110, 110, 110) !important;
  color: #fff !important;
}
.forgotPassword-container {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));

  .forgot-section {
    height: 100%;
    min-width: 40rem;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .forgot-window {
    width: 40rem;
    background: #ffffff;
    border: 1px solid #979797;
    border-radius: 0.4rem;
    padding: 4em;

    h1,
    h2 {
      text-align: center;
    }

    h1 {
      font-size: 3.2rem;
      font-weight: 400;
      text-transform: uppercase;
    }
    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      row-gap: 2rem;
    }

    input {
      width: 100%;
      outline: none;
      min-height: 5.3rem;
      padding-left: 1.9rem;
      font-size: 2rem;
      border-radius: 0.5rem;
    }

    button {
      width: 100%;
      min-height: 4.8rem;
      background: #13f195;
      border: 1px solid #a1a1a1;
      border-radius: 0.4rem;
      font-size: 2rem;
      font-weight: 400;
      letter-spacing: 0.04rem;
      margin-bottom: 2rem;
    }

    .guide-text {
      font-size: 1.6rem;
      text-align: center;
      line-height: 3rem;
    }
  }
}
</style>
