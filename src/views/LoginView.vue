<script setup>
import {
  MOONHOLDINGS,
  LOGIN,
  FORGOT_PASSWORD,
  DONT_HAVE_ACCOUNT,
} from '../constants/copy'
</script>

<template>
  <main class="login-container">
    <div />
    <div class="login-section">
      <div class="login-window">
        <h1>{{ MOONHOLDINGS }}</h1>
        <h2>{{ LOGIN }}</h2>

        <form action="">
          <div class="email-input">
            <input type="text" placeholder="Email" />
            <a href="/forgot-password">{{ FORGOT_PASSWORD }}</a>
            <button>Continue</button>
          </div>

          <div class="dont-have-account">
            <a href="/sign-up">{{ DONT_HAVE_ACCOUNT }}</a>
            <button>Sign Up</button>
          </div>

          <div class="social-signin">
            <button>Sign in with Twitter</button>
            <button>Sign in with Discord</button>
          </div>
        </form>
      </div>
    </div>
    <div />
  </main>
</template>

<style scoped lang="scss">
.dont-have-account {
  display: grid;
  grid-auto-columns: 1fr;
  width: 100%;
}
</style>
