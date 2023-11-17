<template>
  <div>
    <h1>안녕</h1>
    <h3 v-if="loginStore.isLogin">로그인되어있음</h3>
    <nav>
      <RouterLink :to="{ name: 'Home' }">Home</RouterLink> |
      <RouterLink :to="{ name: 'SignUp' }">SignUp</RouterLink> |
      <RouterLink :to="{ name: 'LogIn' }">LogIn</RouterLink> |
      <RouterLink :to="{ name: 'Profile' }">Profile</RouterLink> |
      <RouterLink :to="{ name: 'ProductList' }">Products</RouterLink> |
      <RouterLink :to="{ name: 'ExchangeRate' }">ExchangeRate</RouterLink> |
      <RouterLink :to="{ name: 'BankMap' }">Map</RouterLink> |
      <RouterLink :to="{ name: 'ArticleList' }">Articles</RouterLink> |
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()

</script>

<style scoped>

</style>