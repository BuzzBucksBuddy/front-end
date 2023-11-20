import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import axios from 'axios'

export const useSignupStore = defineStore('signup', () => {
  const router = useRouter()
  const API_URL = 'http://127.0.0.1:8000'
  const store = useLoginStore()

  const signUp = function (payload, formData) {
    const { username, password } = payload
    console.log(formData)
    axios({
      method: 'post',
      url: `${API_URL}/dj-rest-auth/registration/`,
      data: formData,
      // {
      //   username: payload.username,
      //   password1: payload.password1, 
      //   password2: payload.password2,
      //   nickname: payload.nickname,
      //   profile_thumbnail: payload.profileImg,
      //   age: payload.age,
      //   email: payload.email,
      //   money: payload.money,
      //   salary: payload.salary,
      //   financial_products: payload.financialProducts,
      //   mbti: payload.mbti,
      // }
      headers: {
        'Content-Type': 'multipart/form-data', // 파일 업로드를 위한 콘텐츠 타입 설정
      },
    })
      .then((res) => {
        // console.log(formData)
        store.logIn(payload)
        router.push({name: 'Home'})
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return { API_URL, signUp }
}, { persist: true })