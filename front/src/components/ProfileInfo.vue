<template>
  <div>
    <h2>Profile Info</h2>
    <p>{{ myProfile }}</p>
    <div class="profile">
      <img :src="`${store.API_URL}${myProfile.profile_thumbnail}`" alt="Profile_image">
      <p>UserName: {{ myProfile.username }}</p>

      <div v-if="isSavedNickname">
        <p>NickName: {{ myProfile.nickname }}</p>
        <button @click="isSavedNickname =!isSavedNickname">🖍</button>
      </div>
      <div v-else>
        <span>NickName:</span>
        <input type="text" v-model="changeProfile">
        <button @click="editField('nickname')">저장</button>
      </div>
      <!-- <p v-if="isSaved">NickName: {{ isSaved ? myProfile.nickname : changeProfile }}</p>
      <input v-else type="text" v-model="changeProfile">
      <button @click="editField('nickname')">{{ editBtn }}</button> -->
      
      <p>Email: {{ myProfile.email }}</p>
      <p>Age: {{ myProfile.age }}</p>

      <div v-if="isSavedMoney">
        <p>Money: {{ myProfile.money }}</p>
        <button @click="isSavedMoney =!isSavedMoney">🖍</button>
      </div>
      <div v-else>
        <span>Money:</span>
        <input type="text" v-model="changeProfile">
        <button @click="editField('money')">저장</button>
      </div>

      <p>Financial Products</p>
      <div v-if="isSavedDep">
        <span>예금: {{ myProfile.financial_products_dep }}</span>
        <button @click="isSavedDep =!isSavedDep">🖍</button>
      </div>
      <div v-else>
        <span>예금:</span>
        <button @click="editField('financial_products_dep')">저장</button>
      </div>
      <div v-if="isSavedSav">
        <span>적금: {{ myProfile.financial_products_sav }}</span>
        <button @click="isSavedSav =!isSavedSav">🖍</button>
      </div>
      <div v-else>
        <span>적금:</span>
        <button @click="editField('financial_products_sav')">저장</button>
      </div>
      
      <div v-if="isSavedSalary">
        <p>Salary: {{ myProfile.salary }}</p>
        <button @click="isSavedSalary =!isSavedSalary">🖍</button>
      </div>
      <div v-else>
        <span>Salary:</span>
        <input type="text" v-model="changeProfile">
        <button @click="editField('salary')">저장</button>
      </div>

      <div v-if="isSavedFavorite">
        <p>Favorite: {{ myProfile.favorite }}</p>
        <button @click="isSavedFavorite =!isSavedFavorite">🖍</button>
      </div>
      <div v-else>
        <span>Favorite:</span>
        <button @click="editField('favorite')">저장</button>
      </div>
      
      <div v-if="isSavedMbti">
        <p>MBTI: {{ myProfile.mbti }}</p>
        <button @click="isSavedMbti =!isSavedMbti">🖍</button>
      </div>
      <div v-else>
        <span>MBTI:</span>
        <button @click="editField('mbti')">저장</button>
      </div>
      
      <div v-if="isSavedMainBank">
      <p>Main Bank: {{ myProfile.main_bank }}</p>
        <button @click="isSavedMainBank =!isSavedMainBank">🖍</button>
      </div>
      <div v-else>
        <span>Main Bank:</span>
        <button @click="editField('main_bank')">저장</button>
      </div>
      
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
// const changeNickName = ref(null)
// const changeMoney = ref(null)
// const changeFinancialProductsDep = ref(null)
// const changechangeFinancialProductsSav = ref(null)
// const changeSalary = ref(null)
// const changeFavorite = ref(null)
// const changeMbti = ref(null)
// const changeMainBank = ref(null)
const editBtn = ref('변경')


onMounted(() => {
  store.getProfile()
})

const myProfile = computed(()=>{
  return store.myProfile
})


// const isSaved = function () {
//   if (changeProfile === null) {
//     return true
//   } else {
//     return false
//   }
// }

const isSavedNickname = ref(true)
const isSavedMoney = ref(true)
const isSavedDep = ref(true)
const isSavedSav = ref(true)
const isSavedSalary = ref(true)
const isSavedFavorite = ref(true)
const isSavedMbti = ref(true)
const isSavedMainBank = ref(true)

const editField = function (fieldName) {
  const newValue = changeProfile.value
  store.editProfile(fieldName, newValue)

  changeProfile.value = null
  editBtn.value = '저장'
  
  isSavedNickname.value = true
  isSavedMoney.value = true
  isSavedDep.value = true
  isSavedSav.value = true
  isSavedSalary.value = true
  isSavedFavorite.value = true
  isSavedMbti.value = true
  isSavedMainBank.value = true
  }

</script>

<style scoped>
.profile {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>