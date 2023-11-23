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


  // 로그인
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


  // 회원가입페이지 -> 로그인 상태로 -> 관심사 선택 페이지 
  const fromSignuptoLogIn = function (payload) {
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
        // router.push({name: 'FavoriteSelect'})
      })
      .catch((err) => {
        console.log(err)
      })
  }


  // 로그아웃
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


  // user 정보 가져오기(로그인시 사용)
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
  

  // user 전체 정보 가져오기
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


  const editProfile = function(fieldName, newValue) {
    console.log(newValue)
    axios({
      method: 'put',
      url: `${API_URL}/api/v1/accounts/profile/`,
      data:{
        [fieldName]: newValue
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then ((res) => {
        console.log(res.data, 'ddddd')
      })
      .catch((err) => {
        console.log('profile 수정오류', err)
      })
  }
  

  // 관심사 카테고리 가져오기
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


  // 관심사 선택 / 저장
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




  // 관심사가 비슷한 사람들의 가입 상품 순위
  const depLankfromFavorite = ref([])
  const savLankfromFavorite = ref([])
  const usersFavorite = function (favoriteId) {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/accounts/users_favorite/${favoriteId}/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then ((res) => {
      console.log(res.data)
      depLankfromFavorite.value = res.data.most_financial_options_dep
      savLankfromFavorite.value = res.data.most_financial_options_sav
    })
    .catch((err) => {
      console.log('favorit 추천 오류', err)
    })
  }


  

  return { 
    API_URL, 
    logIn,
    fromSignuptoLogIn, 
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
    // editProfile,
    depLankfromFavorite,
    savLankfromFavorite,
    usersFavorite,

   }
}, { persist: true })