import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('article', () => {
  const API_URL = 'http://127.0.0.1:8000/api/v1/products'
  const dep_products = ref([])
  const sav_products = ref([])

  const getDepProducts = function() {
    axios({
      method: 'get',
      url: `${API_URL}/deposit-list/`
    })
      .then(res => {
        dep_products.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getSavProducts = function() {
    axios({
      method: 'get',
      url: `${API_URL}/saving-list/`
    })
      .then(res => {
        sav_products.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { API_URL, dep_products, sav_products, getDepProducts, getSavProducts }
}, { persist: false })