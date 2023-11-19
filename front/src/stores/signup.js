import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useSignupStore = defineStore('signup', () => {
  const router = useRouter()
  const API_URL = 'http://127.0.0.1:8000'

  const signUp = function (payload) {
    axios({
      method: 'post',
      url: `${API_URL}/dj-rest-auth/registration/`,
      data: {
        username: payload.username,
        password1: payload.password1, 
        password2: payload.password2,
        nickname: payload.nickname,
        // profile_thumbnail: payload.profileImg,
        age: payload.age,
        // email: payload.email,
        // money: payload.money,
        // salary: payload.salary,
        // financial_products: payload.financialProducts,
        // mbti: payload.mbti,
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return { API_URL, signUp }
}, { persist: true })