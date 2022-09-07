<script setup>
import monster from '/monster-logo.png'
import loader from '/gif/rhombus-loader.gif'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useUtilStore } from '@/stores/util'

const name = ref('')
const email = ref('')
const description = ref('')
const isSubscribed = ref(false)
const disabledSubmit = ref(false)
const nameFieldClasses = ref(['default-field'])
const emailFieldClasses = ref(['default-field'])

const userStore = useUserStore()
const utilStore = useUtilStore()

const submitInvite = async () => {
  nameFieldClasses.value = ['default-field']
  emailFieldClasses.value = ['default-field']
  utilStore.mutate_errorSignup(false)
  utilStore.mutate_errorMessage('')
  utilStore.mutate_showSuccessAlert(false)
  utilStore.mutate_successMessage('')

  if (name.value !== '' && email.value !== '') {
    if (!email.value.includes('@')) {
      emailFieldClasses.value = ['error-field']
      utilStore.mutate_errorSignup(true)
      utilStore.mutate_errorMessage('This is not a valid email address')
      return
    }

    disabledSubmit.value = true
    const response = await userStore.inviteBetaTester({
      name: name.value,
      email: email.value,
      description: description.value,
      subscription: isSubscribed.value,
    })
    if (response.success === true) {
      utilStore.mutate_showSuccessAlert(true)
      utilStore.mutate_successMessage(
        'Woot!! You are invited! An invite email has been sent!'
      )
    } else {
      utilStore.mutate_errorSignup(true)
      utilStore.mutate_errorMessage(response.message)
    }
    disabledSubmit.value = false
  } else {
    if (name.value === '') {
      nameFieldClasses.value = ['error-field']
      utilStore.mutate_errorSignup(true)
      utilStore.mutate_errorMessage('Every field needs to be fulfilled')
    }
    if (email.value === '') {
      emailFieldClasses.value = ['error-field']
      utilStore.mutate_errorSignup(true)
      utilStore.mutate_errorMessage('Every field needs to be fulfilled')
    }
  }
}
</script>

<template>
  <div class="temp-home">
    <div class="tester-form">
      <h3>Be a beta tester</h3>
      <h1>Grab an Invite</h1>
      <p>
        We're creating a dashboard to combine analytics from Moon Holdings'
        public portfolios. What are people buying? What's moving? What's going
        up? And how do these metrics align with Bitcoin and crypto cycles. Soon
        we'll expand to more nitty-gritty information on NFT collection
        statistics across multiple chains. Stay tuned. But, in the mean time,
        make our portfolio tracker part of your daily routine.
      </p>

      <form>
        <div class="name">
          <input
            id="name"
            type="text"
            placeholder="Your name"
            v-model="name"
            ref="nameField"
            :class="[...nameFieldClasses]"
          />
          <label for="name">Name<sup>*</sup></label>
        </div>
        <div class="email">
          <input
            id="email"
            type="email"
            placeholder="email@domain.com"
            v-model="email"
            ref="emailField"
            :class="[...emailFieldClasses]"
          />
          <label for="email">Email<sup>*</sup></label>
        </div>
        <div class="description">
          <input
            id="description"
            type="text"
            placeholder="Feature"
            v-model="description"
            class="default-field"
          />
          <label for="description"
            >What is the most important feature in a portfolio app to
            you?</label
          >
        </div>
      </form>

      <div class="agree-checkbox">
        <input type="checkbox" id="agree-subscribe" v-model="isSubscribed" />
        <label for="agree-subscribe"
          >I agree to receive communications from MoonHoldings. I can
          unsubscribe at any time.</label
        >
      </div>

      <div class="submit-div">
        <button class="submit" :disabled="disabledSubmit" @click="submitInvite">
          Get on the list
        </button>
        <span class="loader" :hidden="!disabledSubmit">
          <img :src="loader" alt="" />
        </span>
      </div>
    </div>
    <div class="monster-img">
      <img
        :src="monster"
        alt="MoonHoldings Astronaut"
        title="MoonHoldings Astronaut"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/mixins/breakpoints.scss';

.error-field {
  border-top: 1px solid red;
  border-right: 1px solid red;
  border-left: 1px solid red;
  border-bottom: 1px solid red;
}
.default-field {
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1.5px solid var(--gray);
}
.temp-home {
  display: grid;
  grid-template-columns: 50% 50%;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  @include bp-down(small) {
    display: flex;
    flex-direction: column;
  }

  .tester-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 100px;
    padding: 0 143px;
    @include bp-down(small) {
      order: 2;
      margin-top: 30px;
      padding: 0 20px;
    }

    h3 {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 700;
      color: var(--gray);
      @include bp-down(small) {
        font-size: 15px;
      }
    }
    h1 {
      font-size: 64px;
      font-weight: 800;
      margin-bottom: 10px;
      @include bp-down(small) {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 5px;
      }
    }
    p {
      font-size: 18px;
      margin-bottom: 68px;
      @include bp-down(small) {
        font-size: 14px;
        margin-bottom: 40px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 33px;
      width: 100%;
      @include bp-down(small) {
        margin-bottom: 20px;
      }

      ::placeholder {
        color: var(--gray);
      }
    }
  }
}

.name,
.email,
.description {
  input {
    width: 100%;
    font-size: 18px;
    padding: 5px 2px;
    outline: none;
    @include bp-down(small) {
      font-size: 15px;
    }
  }
  label {
    display: block;
    font-size: 13px;
    margin-top: 5px;
  }
}

.agree-checkbox {
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-bottom: 33px;
  @include bp-down(small) {
    align-items: flex-start;
    margin-bottom: 20px;

    label {
      transform: translateY(-4px);
    }
  }

  input {
    margin-right: 7px;
  }
}
.submit-div {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  .submit {
    padding: 20px 37px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    background: none;
    border: 2px solid #000;
    border-radius: 50px;
    margin-right: 20px;
    @include bp-down(small) {
      padding: 15px 26px;
      font-size: 13px;
      margin-bottom: 30px;
    }

    &:hover {
      background: #eee;
    }
  }
  .loader {
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.monster-img {
  @include bp-down(small) {
    order: 1;
    width: 100%;
    padding: 20px 20px 0 20px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    @include bp-down(small) {
      height: 180px;
      object-position: 50% 40%;
    }
  }
}
</style>
