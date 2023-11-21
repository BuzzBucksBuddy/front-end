import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const route = useRoute()

  const API_URL = 'http://127.0.0.1:8000'
  const token = ref(null)
  const myName = ref(null)
  const myId = ref(null)

  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

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
        userInfo()
        router.push({ name: 'Home' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const logOut = function () {
    axios({
      method: 'post',
      url: `${API_URL}/dj-rest-auth/logout/`,
    })
      .then((res) => {
        token.value = null
        myName.value = null
        myId.value = null
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const myProfile = ref([])
  const getProfile = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/accounts/profile/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        console.log(res)
        myProfile.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const userInfo = function () {
    if (isLogin.value === true) {
      axios({
        method: 'get',
        url: `${API_URL}/dj-rest-auth/user/`,
        headers: {
          Authorization: `Token ${token.value}`
        }
      })
        .then((res) => {
          console.log(res.data)

          myName.value = res.data.username
          myId.value = res.data.pk
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  
  const favoriteCategory = ref([])
  const getFavoriteCategory = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/accounts/favorites/`,
      headers: {
        Authorization: `Token ${token.value}`     // password1 오류
      }
    })
      .then((res) => {
        console.log(res.data)
        favoriteCategory.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const favoriteSelect = function (favoriteId) {
    axios({
      method: 'post',
      url: `${API_URL}/api/v1/accounts/favorites/${favoriteId}/select/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then ((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const editProfile = function(fieldName, newValue) {
    console.log(newValue)
    axios({
      method: 'put',
      url: `${API_URL}/api/v1/accounts/profile/`,
      data:{
        [fieldName]: newValue,
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then ((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log('profile 수정오류', err)
      })
  }


  return { 
    API_URL, 
    logIn, 
    token, 
    isLogin, 
    userInfo, 
    myName, 
    myId, 
    logOut, 
    myProfile, 
    getProfile,
    favoriteCategory, 
    getFavoriteCategory,
    favoriteSelect,
    editProfile,
   }
}, { persist: true })