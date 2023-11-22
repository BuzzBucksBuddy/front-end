import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const API_URL = 'http://127.0.0.1:8000/api/v1/products'
  const dep_products = ref([])
  const sav_products = ref([])

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


  // 그래프 -> 디테일
  const go = ref(null)
  const findProduct = function (productName) {
    axios({
      method : 'get',
      url: `${API_URL}/goDetail/${productName}/`,
    })
      .then((res) => {
        console.log(res.data,'여기@')
        go.value = res.data        
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { 
    API_URL,
    dep_products,
    sav_products,
    getDepProducts,
    getSavProducts,
    depCategorize,
    savCategorize,
    findProduct,
    go
  }
}, { persist: false })