import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useLoginStore } from '@/stores/login'

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const bankCategories = ref([])
  const productCategories = ref([])
  const API_URL = 'http://127.0.0.1:8000/api/v1/articles/'

  // const token = ref(null)

  // DRF에 article 조회 요청을 보내는 action
  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}`,
      // headers: {
      //   Authorization: `Token ${token.value}`
      // }
    })
      .then((res) => {
        // console.log(res)
        articles.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getBankCategories = function () {
    axios({
      method: 'get',
      url: `${API_URL}category/banks/`
    })
      .then((res) => {
        bankCategories.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getProductCategories = function () {
    axios({
      method: 'get',
      url: `${API_URL}category/products/`
    })
      .then((res) => {
        productCategories.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { articles, API_URL, getArticles, getBankCategories, getProductCategories, bankCategories, productCategories }
}, { persist: true })
