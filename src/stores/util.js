import { defineStore } from 'pinia'

export const useUtilStore = defineStore('util', {
  state: () => ({
    headingEndPoint: '',
    showSuccessAlert: false,
    successMessage: '',
    errorToggle: false,
    errorMessage: '',
    addCoinModalsToggle: false,
    updateBoxesKey: 0,
  }),
  getters: {},
  actions: {
    mutate_updateBoxesKey() {
      this.updateBoxesKey++
    },
    mutate_headingEndPoint(payload) {
      this.headingEndPoint = payload
    },
    mutate_showSuccessAlert(payload) {
      this.showSuccessAlert = payload
    },
    mutate_successMessage(payload) {
      this.successMessage = payload
    },
    mutate_errorToggle(payload) {
      this.errorToggle = payload
    },
    mutate_errorMessage(payload) {
      this.errorMessage = payload
    },
    mutate_addCoinModalsToggle(payload) {
      this.addCoinModalsToggle = payload
    },
  },
})
