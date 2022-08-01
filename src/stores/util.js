import { defineStore } from 'pinia'

export const useUtilStore = defineStore('util', {
  state: () => ({
    headingEndPoint: '',
    showSuccessAlert: false,
    errorSignup: false,
    errorLogin: false,
    errorMessage: '',
  }),
  getters: {},
  actions: {
    mutate_headingEndPoint(payload) {
      this.headingEndPoint = payload
    },
    mutate_showSuccessAlert(payload) {
      this.showSuccessAlert = payload
    },
    mutate_errorSignup(payload) {
      this.errorSignup = payload
    },
    mutate_errorLogin(payload) {
      this.errorLogin = payload
    },
    mutate_errorMessage(payload) {
      this.errorMessage = payload
    },
  },
})
