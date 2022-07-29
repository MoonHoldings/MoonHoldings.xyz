<script setup>
import {
  MOON_XYZ,
  LOGIN,
  FORGOT_PASSWORD,
  DONT_HAVE_ACCOUNT,
} from '../constants/copy'
import SocialAuthBtn from '@/components/partials/SocialAuthBtn.vue'
import ErrorAlert from '@/components/partials/ErrorAlert.vue'
</script>

<template>
  <main class="login-container">
    <ErrorAlert message="Error Message" />
    <div />
    <div class="login-section">
      <div class="login-window">
        <h1>{{ MOON_XYZ }}</h1>
        <h2>{{ LOGIN }}</h2>

        <form action="">
          <div class="email-input">
            <input type="text" placeholder="Email" class="error-input" />
            <a href="/reset-password">{{ FORGOT_PASSWORD }}</a>
            <button>Continue</button>
          </div>

          <div class="dont-have-account">
            <a href="/sign-up">{{ DONT_HAVE_ACCOUNT }}</a>
            <button>Sign Up</button>
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
.error-input {
  background-color: #ff6f6f;
  border: 2px solid #ff6f6f;
}
.dont-have-account {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #000;
    text-decoration: none;
    font-size: 1rem;
  }

  button {
    min-width: 118px;
    min-height: 48px;
    background: #13f195;
    border: 1px solid #a1a1a1;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 400;
  }
}
.social-signin {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
