import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const route = useRoute()

  const API_URL = 'http://127.0.0.1:8000'
  const token = ref(null)

  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })


  // const signUp = function (payload) {
  //   const { username, password1, password2 } = payload

  //   axios({
  //     method: 'post',
  //     url: `${API_URL}/accounts/signup/`,
  //     data: {
  //       username, password1, password2
  //     }
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       const password = password1
  //       logIn({ username, password })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const logIn = function (payload) {
    const { username, password } = payload

    axios({
      method: 'post',
      url: `${API_URL}/dj-rest-auth/login/`,
      data: {
        username, password
      }
    })
      .then((res) => {
        console.log(res.data)
        token.value = res.data.key
        router.push({ name: 'Home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const logOut = function () {
  //   axios({
  //     method: 'post',
  //     url: `${API_URL}/accounts/logout/`,
  //   })
  //     .then((res) => {
  //       token.value = null
  //       router.push({ name: 'ArticleView' })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const myProfile = ref([])
  const getProfile = function () {
    const nickName = route.params
    console.log(nickName)
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/accounts/지수/`     // 잘모르겟..
    })
      .then((res) => {
        console.log(res)
        myProfile.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { API_URL, logIn, token, isLogin, myProfile, getProfile }
}, { persist: true })