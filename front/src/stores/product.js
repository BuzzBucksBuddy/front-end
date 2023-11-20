import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('article', () => {
  const API_URL = 'http://127.0.0.1:8000/api/v1/products'
  const dep_products = ref([])
  const sav_products = ref([])
  // const dep_product = ref([])
  // const sav_product = ref([])
  // const options = ref([])

  // const depInfo = computed(() => {
  //     return dep_product.value
  //   })

  // const savInfo = computed(() => {
  //   return sav_product.value
  // })

  // const optionsValue = computed(() => {
  //   return options.value
  // })

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

  // const getDepProduct = function(dep_cd) {
  //   axios({
  //     method: 'get',
  //     url: `${API_URL}/deposit-product/${dep_cd}/`
  //   })
  //     .then(res => {
  //       console.log(res.data)
  //       dep_product.value = res.data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // const getSavProduct = function(sav_cd) {
  //   axios({
  //     method: 'get',
  //     url: `${API_URL}/saving-product/${sav_cd}/`
  //   })
  //     .then(res => {
  //       console.log(res.data)
  //       sav_product.value = res.data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // const getDepOptions = function(dep_cd) {
  //   axios({
  //     method: 'get',
  //     url: `${API_URL}/deposit-options/${dep_cd}/`
  //   })
  //     .then(res => {
  //       console.log(res.data)
  //       options.value = res.data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // const getSavOptions = function(sav_cd) {
  //   axios({
  //     method: 'get',
  //     url: `${API_URL}/saving-options/${sav_cd}/`
  //   })
  //     .then(res => {
  //       options.value = res.data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  return { API_URL, dep_products, sav_products, getDepProducts, getSavProducts }
}, { persist: false })
