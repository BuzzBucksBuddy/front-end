<template>
  <div>
    <h2>Profile Info</h2>
    <p>{{ myProfile }}</p>
    <div class="profile">
      <img :src="`${store.API_URL}${myProfile.profile_thumbnail}`" alt="Profile_image">
      <p>UserName: {{ myProfile.username }}</p>

      <p>NickName: {{ myProfile.nickname }}</p>
      <input type="text" v-model="changeProfile">
      <button @click="editField('nickname')">Edit</button>
      <!-- <p v-if="isSaved">NickName: {{ isSaved ? myProfile.nickname : changeProfile }}</p>
      <input v-else type="text" v-model="changeProfile">
      <button @click="editField('nickname')">{{ editBtn }}</button> -->
      
      <p>Email: {{ myProfile.email }}</p>
      <p>Age: {{ myProfile.age }}</p>

      <p>Money: {{ myProfile.money }}</p>
      <button @click="editField('money')">Edit</button>

      <p>Financial Products</p>
      <span>예금: {{ myProfile.financial_products_dep }}</span>
      <button @click="editField('financialProductsDep')">Edit</button>
      <span>적금: {{ myProfile.financial_products_sav }}</span>
      <button @click="editField('financialProductsSav')">Edit</button>

      <p>Salary: {{ myProfile.salary }}</p>
      <button @click="editField('salary')">Edit</button>

      <p>Favorite: {{ myProfile.favorite }}</p>
      <button @click="editField('favorite')">Edit</button>
      
      <p>MBTI: {{ myProfile.mbti }}</p>
      <button @click="editField('mbti')">Edit</button>
      
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useLoginStore()
const route = useRoute()
const changeProfile = ref(null)
const editBtn = ref('')


onMounted(() => {
  store.getProfile()
})

const myProfile = computed(()=>{
  return store.myProfile
})


const isSaved = function () {
  if (changeProfile === null) {
    return true
  } else {
    return false
  }
}


const editField = function (fieldName) {
  const newValue = changeProfile.value
  store.editProfile(fieldName, newValue)
}

</script>

<style scoped>
.profile {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>