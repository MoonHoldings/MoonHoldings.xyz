<script setup>
import {
  MOON_XYZ,
  LOGIN,
  FORGOT_PASSWORD,
  DONT_HAVE_ACCOUNT,
  CONTINUE,
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
            <a href="/forgot-password">{{ FORGOT_PASSWORD }}</a>
            <button class="continue-btn">{{ CONTINUE }}</button>
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

.error-input {
  background-color: #ff6f6f;
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
