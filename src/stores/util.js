import { defineStore } from 'pinia'

export const useUtilStore = defineStore({
  id: 'util',
  state: () => ({
    headingEndPoint: '',
    showSuccessAlert: false,
    errorSignup: false,
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
    mutate_errorEmail(payload) {
      this.errorEmail = payload
    },
    mutate_errorSignup(payload) {
      this.errorSignup = payload
    },
    mutate_errorMessage(payload) {
      this.errorMessage = payload
    },
  },
})
