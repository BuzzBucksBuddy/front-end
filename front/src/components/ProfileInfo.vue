<template>
  <div>
    <h2>Profile Info</h2>
    <p>{{ myProfile }}</p>
    <div class="profile">
      <img :src="myProfile.profile_thumbnail" alt="Profile_image">
      <p>UserName: {{ myProfile.username }}</p>
      <p>NickName: {{ myProfile.nickname }}</p>
      <p>Email: {{ myProfile.email }}</p>
      <p>Age: {{ myProfile.age }}</p>
      <p>Money: {{ myProfile.money }}</p>
      <p>Financial Products: ???????</p>
      <p>Salary: {{ myProfile.salary }}</p>
      <p>Favorite: {{ myProfile.favorite }}</p>
      <p>MBTI: {{ myProfile.mbti }}</p>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useLoginStore()
const route = useRoute()

onMounted(() => {
  // console.log()
  store.getProfile()
})

const myProfile = computed(()=>{
  return store.myProfile
})

</script>

<style scoped>
.profile {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>