<template>
  <div>
    <h1>SignUp View</h1>
    <form @submit.prevent="signUp">
      <!--사용정보-->
      <label for="username" style="color: red;">* username: </label>
      <input type="text" id="username" v-model.trim="username">
      <label for="password1" style="color: red;">* password1: </label>
      <input type="text" id="password1" v-model.trim="password1">
      <label for="password2" style="color: red;">* password2: </label>
      <input type="text" id="password2" v-model.trim="password2">
      
      <!--개인정보-->
      <label for="nickname" style="color: red;">* nickname: </label>
      <input type="text" id="nickname" v-model.trim="nickname">
      <label for="profile-img">profileImg: </label>
      <input type="file" id="profile-img" ref="profileImgInput" @change="handleProfileImageChange">
      <!-- <input type="text" id="profile-img" v-model.trim="profileImg"> -->
      <label for="age" style="color: red;">* age: </label>
      <input type="text" id="age" v-model.trim="age">
      <label for="email">email: </label>
      <input type="text" id="email" v-model.trim="email">      

      <!--개인화 요소-->
      <label for="money">money: </label>
      <input type="text" id="money" v-model.trim="money">
      <label for="salary">salary: </label>
      <input type="text" id="salary" v-model.trim="salary">
      <!-- <label for="financial-products">financial products: {{ financialProducts }} </label>
      <div>
        <input type="checkbox" id="예금" value="예금" v-model="financialProducts"> <label for="예금">예금</label>
      </div>
      <div>
        <input type="checkbox" id="적금" value="적금" v-model="financialProducts"> <label for="적금">적금</label>
      </div> -->
      <!-- <input type="text" id="financial-products" v-model.trim="financialProducts"> -->
      <label for="favorite">favorite: {{ favorite }} </label>
      <div>
        <input type="checkbox" id="전자기기" value="전자기기" v-model="favorite"> <label for="전자기기">전자기기</label>
      </div>
      <div>
        <input type="checkbox" id="영화" value="영화" v-model="favorite"> <label for="영화">영화</label>
      </div>
      <div>
        <input type="checkbox" id="패션" value="패션" v-model="favorite"> <label for="패션">패션</label>
      </div>
      <label for="mbti">mbti: </label>
      <select id="mbti" v-model="mbti">
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="INFJ">INFJ</option>
        <option value="INTJ">INTJ</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="INFP">INFP</option>
        <option value="INTP">INTP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
        <option value="ENFP">ENFP</option>
        <option value="ENTP">ENTP</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENTJ">ENTJ</option>
      </select>
      
      <input type="submit">
    </form>
    {{ comm }}
    <!-- {{ comm2 }} -->

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSignupStore } from '@/stores/signup'

const store = useSignupStore()
const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)
const nickname = ref(null)
const profileImg = ref(null)
const profileImgInput = ref(null)
const age = ref(null)
const email = ref('')
const money = ref(0)
const salary = ref(0)
// const financialProducts = ref([])
// const financialProducts = ref([])
const favorite = ref([])
const mbti = ref(null)

const handleProfileImageChange = function () {
  const file = profileImgInput.value.files[0]
  if (file) {
    // 필요한 경우 여기서 이미지 미리보기 또는 기타 작업을 처리 가능
    profileImg.value = file
  }
}

const favorite2 = ref('')
const comm = computed(() => {
  favorite2.value = favorite.value.join(', ')
  console.log(favorite2)
  return favorite.value.length
})

// const finan = ref('')
// const comm2 = computed(() => {
//   finan.value = financialProducts.value.join(', ')
//   console.log(finan.value)
//   return financialProducts.value.length
// })

const signUp = function () {
  const formData = new FormData()
  formData.append('username', username.value)
  formData.append('password1', password1.value)
  formData.append('password2', password2.value)
  formData.append('nickname', nickname.value)
  formData.append('age', age.value)
  formData.append('email', email.value)
  formData.append('money', money.value)
  formData.append('salary', salary.value)
  
  // if (financialProducts.value.length > 0) {
  //   formData.append('financial_products', finan.value)
  // }

  if (favorite.value.length > 0) {
    formData.append('favorite', favorite2.value)
  }

  formData.append('mbti', mbti.value)

  
  if (profileImg.value) {
    formData.append('profile_thumbnail', profileImg.value)
  }


  store.signUp(formData)
}

// const signUp = function () {
//   const payload = {
//     username: username.value,
//     password1: password1.value,
//     password2: password2.value,
//     nickname: nickname.value,
//     profileImg: profileImg.value, 
//     age: age.value,
//     email: email.value,
//     money: money.value,
//     salary: salary.value,
//     financialProducts: financialProducts.value,
//     mbti: mbti.value,
//   }
//   store.signUp(payload)
// }

</script>

<style scoped>

</style>