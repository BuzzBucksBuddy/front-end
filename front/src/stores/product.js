import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const API_URL = 'http://127.0.0.1:8000/api/v1/products'
  const dep_products = ref([])
  const sav_products = ref([])

  // 상품/옵션 데이터 저장하기
  const getProductsData = function() {
    axios({
      method: 'get',
      url: `${API_URL}/products-data/`
    })
      .then(res => {
        console.log('success!')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 예금 상품 정보 가져오기 (은행 따라서)
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

  // 적금 상품 정보 가져오기 (은행 따라서)
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

  // 예금 상품 옵션 가져오기 (기간 따라서)
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

  // 적금 상품 옵션 가져오기 (기간, 유형 따라서)
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


  // 그래프 -> 디테일 페이지
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
    getProductsData,
    getDepProducts,
    getSavProducts,
    depCategorize,
    savCategorize,
    findProduct,
    go
  }
}, { persist: false })