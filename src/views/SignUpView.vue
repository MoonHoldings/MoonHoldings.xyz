<script setup>
import { MOONHOLDINGS } from '../constants/copy'
import { CONTINUE, SIGN_UP_PATH } from '../constants'
import PrimaryBtn from '@/components/partials/PrimaryBtn.vue'
</script>

<template>
  <main class="signup-container">
    <div />
    <div class="signup-section">
      <div class="signup-window">
        <h1>{{ MOONHOLDINGS }}</h1>
        <h2>Sign Up</h2>

        <form action="">
          <div class="email-input">
            <input type="text" placeholder="Email" />
            <PrimaryBtn :copy="CONTINUE" :url="SIGN_UP_PATH" />
          </div>
        </form>
      </div>
    </div>
    <div />
  </main>
</template>

<style scoped lang="scss"></style>
