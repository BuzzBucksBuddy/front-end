import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const API_URL = 'http://127.0.0.1:8000/api/v1/products'
  const dep_products = ref([])
  const sav_products = ref([])
  const dep_category = ref([])
  const sav_category = ref([])

  // 은행별 예금 상품 가져오기
  const getDepProducts = function(bank) {
    axios({
      method: 'get',
      url: `${API_URL}/deposit-list/${bank}/`
    })
      .then(res => {
        dep_products.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 은행별 적금 상품 가져오기
  const getSavProducts = function(bank) {
    axios({
      method: 'get',
      url: `${API_URL}/saving-list/${bank}/`
    })
      .then(res => {
        sav_products.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 기간별 예금 상품 옵션 가져오기
  const depCategorize = function(code, term) {
    axios({
      method: 'get',
      url: `${API_URL}/deposit-categorize/${code}/${term}/`
    })
      .then(res => {
        dep_category.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 기간별 적금 상품 옵션 가져오기
  const savCategorize = function(code, term, type) {
    axios({
      method: 'get',
      url: `${API_URL}/saving-categorize/${code}/${term}/${type}/`
    })
      .then(res => {
        sav_category.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { 
    API_URL,
    dep_products,
    sav_products,
    dep_category,
    sav_category,
    getDepProducts,
    getSavProducts,
    depCategorize,
    savCategorize,
  }
}, { persist: false })