<script setup>
import { MOON_XYZ, RESET_PASSWORD } from '../constants/copy'
</script>

<template>
  <main class="resetPassword-container">
    <div />
    <div class="reset-section">
      <div class="reset-window">
        <h1>{{ MOON_XYZ }}</h1>
        <h2>{{ RESET_PASSWORD }}</h2>

        <form>
          <input type="email" placeholder="Email" />
          <button>Submit</button>
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
  height: 100%;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));

  .reset-section {
    height: 100%;
    min-width: 400px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .reset-window {
    width: 400px;
    background: #ffffff;
    border: 1px solid #979797;
    border-radius: 12px;
    padding: 4em;

    h1,
    h2 {
      text-align: center;
    }

    h1 {
      font-size: 2rem;
      font-weight: 400;
      text-transform: uppercase;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      row-gap: 20px;
    }

    input {
      width: 100%;
      outline: none;
      min-height: 53px;
      padding-left: 19px;
      font-size: 20px;
      border: 2px solid var(--pink);
      background: #eee;
    }

    button {
      width: 100%;
      min-height: 48px;
      background: #13f195;
      border: 1px solid #a1a1a1;
      border-radius: 8px;
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 0.4px;
      margin-bottom: 20px;
    }

    .guide-text {
      font-size: 1rem;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
