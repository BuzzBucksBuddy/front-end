<template>
  <div class="container">
    <section class="container">
      <h1>로그인</h1>
      <div class="login-img">
  
      </div>
      <form @submit.prevent="logIn">
        <input type="text" v-model.trim="username">
        <input type="password" v-model.trim="password">
        <input type="submit" value="로그인">
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()
const username = ref(null)
const password = ref(null)

const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value
  }
  store.logIn(payload)
}
</script>

<style scoped>
.container {
  margin-top: 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 480px;
}
form input[type="text"],
form input[type="password"] {
  border-radius: 32px;
  height: 64px;
  margin: 12px 0;
  background-color: var(--gray-color);
  border: 6px solid var(--gray-color);
  transition: all 0.3s;
  padding-left: 24px;
  font-size: 16px;
}
form input[type="text"]:hover,
form input[type="password"]:hover {
  background-color: var(--main-color);
  border: 6px solid var(--sub-color);
}
form input[type="text"]:focus,
form input[type="password"]:focus {
  background-color: var(--main-color);
  border: 6px solid var(--sub-color);
}
form input[type="submit"] {
  border-radius: 32px;
  height: 64px;
  border: 0;
  background-color: var(--main-color);
  font-size: 24px;
  font-weight: 700;
  transition: all 0.5s;
}
form input[type="submit"]:hover {
  border-radius: 32px;
  height: 64px;
  border: 0;
  background-color: var(--sub-color);
  color: white;
}
</style>