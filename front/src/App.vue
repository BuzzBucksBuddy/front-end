<template>
  <div>
    <nav>
      <RouterLnk :to="{ name: 'home' }">Home</RouterLnk>
      <RouterLnk :to="{ name: 'signup' }">signup</RouterLnk>
      <RouterLnk :to="{ name: 'login' }">login</RouterLnk>
      <RouterLnk :to="{ name: 'profile' }">profile</RouterLnk>
      <RouterLnk :to="{ name: 'productList' }">productList</RouterLnk>
      <RouterLnk :to="{ name: 'exchangeRate' }">exchangeRate</RouterLnk>
      <RouterLnk :to="{ name: 'bankMap' }">bankMap</RouterLnk>
      <RouterLnk :to="{ name: 'articleList' }">articleList</RouterLnk>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLnk, RouterView } from 'vue-router'
</script>

<style scoped>

</style>