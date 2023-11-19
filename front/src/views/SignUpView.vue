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
      <input type="text" id="profile-img" v-model.trim="profileImg">
      <label for="age" style="color: red;">* age: </label>
      <input type="text" id="age" v-model.trim="age">
      <label for="email">email: </label>
      <input type="text" id="email" v-model.trim="email">      

      <!--개인화 요소-->
      <label for="money">money: </label>
      <input type="text" id="money" v-model.trim="money">
      <label for="salary">salary: </label>
      <input type="text" id="salary" v-model.trim="salary">
      <label for="financial-products">financial products: </label>
      <input type="text" id="financial-products" v-model.trim="financialProducts">
      <label for="mbti">mbti: </label>
      <input type="text" id="mbti" v-model.trim="mbti">
      
      <input type="submit">
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSignupStore } from '@/stores/signup'

const store = useSignupStore()
const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)
const nickname = ref(null)
const profileImg = ref(null)
const age = ref(null)
const email = ref(null)
const money = ref(null)
const salary = ref(null)
const financialProducts = ref(null)
const mbti = ref(null)

const signUp = function () {
  const payload = {
    username: username.value,
    password1: password1.value,
    password2: password2.value,
    nickname: nickname.value,
    profileImg: profileImg.value,
    age: age.value,
    email: email.value,
    money: money.value,
    salary: salary.value,
    financialProducts: financialProducts.value,
    mbti: mbti.value,
  }
  store.signUp(payload)
}

</script>

<style scoped>

</style>