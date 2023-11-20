import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// https://juso.dev/docs/reg-code-api/

export const useMapStore = defineStore('map', () => {
  const doList = ref([])
  const guList = ref([])

  const depList = ref([])
  const savList = ref([])

  const API_URL = 'http://127.0.0.1:8000/api/v1/maps/'

  const doLoader = function () {
    axios({
      method: 'get',
      url: 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000'
    })
      .then((res) => {
        doList.value = res.data.regcodes
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const guLoader = function (code) {
    console.log(code)
    const doCode = code.slice(0, 2)
    axios({
      method: 'get',
      url: `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${doCode}*00000&is_ignore_zero=true`
    })
      .then((res) => {
        guList.value = res.data.regcodes
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllDepositProducts = function () {
    axios({
      method: 'get',
      url: `${API_URL}deposits/`
    })
      .then((res) => {
        depList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAllSavingProducts = function () {
    axios({
      method: 'get',
      url: `${API_URL}savings/`
    })
      .then((res) => {
        savList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getDepositProducts = function (name) {
    axios({
      method: 'get',
      url: `${API_URL}deposits/${name}/`
    })
      .then((res) => {
        depList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getSavingProducts = function (name) {
    axios({
      method: 'get',
      url: `${API_URL}savings/${name}/`
    })
      .then((res) => {
        savList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    doLoader,
    doList,
    guLoader,
    guList,
    getAllDepositProducts,
    getAllSavingProducts,
    depList,
    savList,
    getDepositProducts,
    getSavingProducts
  }
}, { persist: true })
