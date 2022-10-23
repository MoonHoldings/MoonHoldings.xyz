<script setup>
import { MOONHOLDINGS, RESET_PASSWORD, SUBMIT } from '../constants/copy'
</script>

<template>
  <main class="resetPassword-container">
    <div />
    <div class="reset-section">
      <div class="reset-window">
        <h1>{{ MOONHOLDINGS }}</h1>
        <h2>{{ RESET_PASSWORD }}</h2>

        <form>
          <input type="email" placeholder="Email" />
          <button>{{ SUBMIT }}</button>
        </form>

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
.resetPassword-container {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));

  .reset-section {
    height: 100%;
    min-width: 40rem;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .reset-window {
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

    form {
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
      border: 0.2rem solid var(--pink);
      background: #eee;
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
