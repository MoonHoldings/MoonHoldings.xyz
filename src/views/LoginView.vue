<script setup>
import { MOONHOLDINGS, LOGIN, FORGOT_PASSWORD } from '../constants/copy'
</script>

<template>
  <main class="login-container">
    <div />
    <div class="login-section">
      <div class="login-window">
        <h1>{{ MOONHOLDINGS }}</h1>
        <h2>{{ LOGIN }}</h2>

        <form action="">
          <input type="text" placeholder="Email" />
          <a href="/forgot-password">{{ FORGOT_PASSWORD }}</a>
          <button>Continue</button>

          <div class="dont-have-account">
            <a href="/forgot-password">{{ FORGOT_PASSWORD }}</a>
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

<style scoped>
.login-container {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  height: 100%;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));
}
.login-section {
  height: 100%;
  min-width: 500px;
  min-height: 100%;
}

.login-window {
  margin: 10em 0;
  padding: 2em;
  height: 500px;
  background: #fff;
  border-radius: 1em;
}

h1,
h2 {
  text-align: center;
}

h1 {
  margin: 1em 0 0.5em;
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  font-size: 1.5em;
}
</style>
