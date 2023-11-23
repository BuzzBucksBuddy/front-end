<template>
  <div>
    <div id="favorite-back" v-if="!isSavedFavorite">
      <Favorite
        id="favorite"
        @do-update="update"
      />
    </div>

    <h2>Profile Info</h2>
    <!-- <p>{{ myProfile }}</p> -->
    <div class="profile ">
      <div class="profile-img">
        <img :src="`${store.API_URL}${myProfile.profile_thumbnail}`" alt="Profile_image">
      </div>

      <div>
      <p class="d-flex gap-3">아이디 <span>{{ myProfile.username }}</span></p>
      <br>

      <div v-if="isSavedNickname" class="d-flex gap-3">
        <p>닉네임</p>
        <span>{{ myProfile.nickname }}</span>
        <button @click="isSavedNickname =!isSavedNickname" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <span>닉네임</span>
        <input type="text" v-model="myProfile.nickname">
        <button @click="editField(myProfile.nickname, 'nickname')">저장</button>
      </div>
      <br>
      <!-- <p v-if="isSaved">NickName: {{ isSaved ? myProfile.nickname : changeProfile }}</p>
      <input v-else type="text" v-model="changeProfile">
      <button @click="editField('nickname')">{{ editBtn }}</button> -->
      
      <div v-if="isSavedEmail" class="d-flex gap-3">
        <p class="d-flex gap-3">Email <span>{{ myProfile.email }}</span></p>
        <button @click="isSavedEmail =!isSavedEmail" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <span>E-mail</span>
        <input type="text" v-model="myProfile.email">
        <button @click="editField(myProfile.email, 'email')">저장</button>
      </div>
      <br>

      <p class="d-flex gap-3">나이 <span>{{ myProfile.age }}</span></p>
      <br>
      </div>

      <div>
      <div v-if="isSavedMoney" class="d-flex gap-3">
        <p>자산</p>
        <span>{{ myProfile.money }}</span>
        <button @click="isSavedMoney =!isSavedMoney" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <span>자산</span>
        <input type="text" v-model="myProfile.money">
        <button @click="editField(myProfile.money, 'money')">저장</button>
      </div>
      <br>

      
      <div v-if="isSavedSalary" class="d-flex gap-3">
        <p>연봉</p>
        <span>{{ myProfile.salary }}</span>
        <button @click="isSavedSalary =!isSavedSalary" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <span>연봉</span>
        <input type="text" v-model="myProfile.salary">
        <button @click="editField(myProfile.salary, 'salary')">저장</button>
      </div>
      <br>
      
      <div v-if="isSavedFavorite" class="d-flex gap-3">
        <p>Favorite</p>
        <span v-for="favorie in myProfile.favorite">{{ favorie.title }}</span>
        <button @click="isSavedFavorite =!isSavedFavorite" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <p>Favorite</p>
        <button @click="editField(myProfile.favorite, 'favorite')">저장</button>
      </div>
      <br>
      
      <div v-if="isSavedMbti" class="d-flex gap-3">
        <p>MBTI</p>
        <span>{{ myProfile.mbti }}</span>
        <button @click="isSavedMbti =!isSavedMbti" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <label for="mbti">MBTI</label>
        <select id="mbti" v-model="myProfile.mbti">
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
        <button @click="editField(myProfile.mbti, 'mbti')">저장</button>
      </div>
      <br>
      
      <div v-if="isSavedMainBank" class="d-flex gap-3">
        <p>주거래 은행</p>
        <span>{{ myProfile.main_bank }}</span>
        <button @click="isSavedMainBank =!isSavedMainBank" class="edit-button">🖍</button>
      </div>
      <div v-else class="d-flex gap-3">
        <label>주거래 은행</label>
        <select id="mbti" v-model="myProfile.main_bank">
          <option value="국민은행">국민은행</option>
          <option value="경남은행">경남은행</option>
          <option value="광주은행">광주은행</option>
          <option value="농협은행 주식회사">농협은행 주식회사</option>
          <option value="대구은행">대구은행</option>
          <option value="부산은행">부산은행</option>
          <option value="수협은행">수협은행</option>
          <option value="신한은행">신한은행</option>
          <option value="우리은행">우리은행</option>
          <option value="전북은행">전북은행</option>
          <option value="주식회사 카카오뱅크">주식회사 카카오뱅크</option>
          <option value="주식회사 케이뱅크">주식회사 케이뱅크</option>
          <option value="중소기업은행">중소기업은행</option>
          <option value="제주은행">제주은행</option>
          <option value="토스뱅크 주식회사">토스뱅크 주식회사</option>
          <option value="하나은행">하나은행</option>
          <option value="한국산업은행">한국산업은행</option>
          <option value="한국스탠다드차타드은행">하나은행</option>
        </select>
        <button @click="editField(myProfile.main_bank, 'main_bank')">저장</button>
      </div>
      <br>
    </div>
  </div>
     

    <div>
      <div class="profile">
        <p>My Financial Product(=Options기준)</p>
        <div v-if="isSavedDep">
          <span>예금: {{ myProfile.financial_options_dep }}</span>
          <!-- <button @click="isSavedDep =!isSavedDep">🖍</button> -->
        </div>
        <div v-else>
          <span>예금:</span>
          <button @click="editField(myProfile.financial_options_dep, 'financial_options_dep')">저장</button>
        </div>
        <div v-if="isSavedSav">
          <span>적금: {{ myProfile.financial_options_sav }}</span>
          <!-- <button @click="isSavedSav =!isSavedSav">🖍</button> -->
        </div>
        <div v-else>
          <span>적금:</span>
          <button @click="editField(myProfile.financial_options_sav, 'financial_options_sav')">저장</button>
        </div>
        <div class="my-products-chart">
          <MyProductsChart/>
        </div>
      </div>

    
  </div> 
</div>
  
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MyProductsChart from '@/components/MyProductsChart.vue'
import Favorite from '@/components/Favorite.vue'


const update = function () {
  isSavedFavorite.value = !isSavedFavorite.value
  store.getProfile()
}

const store = useLoginStore()
const route = useRoute()
// const changeProfile = ref(null)
const editBtn = ref('변경')


onMounted(() => {
  store.getProfile()
})

const myProfile = computed(()=>{
  return store.myProfile
})


const isSavedNickname = ref(true)
const isSavedEmail = ref(true)
const isSavedMoney = ref(true)
const isSavedDep = ref(true)
const isSavedSav = ref(true)
const isSavedSalary = ref(true)
const isSavedFavorite = ref(true)
const isSavedMbti = ref(true)
const isSavedMainBank = ref(true)
const newValue = ref(null)

// 프로필 수정
const editField = function (value, fieldName) {
  newValue.value = value
  store.editProfile(fieldName, newValue.value)

  // changeProfile.value = null
  editBtn.value = '저장'
  
  isSavedNickname.value = true
  isSavedEmail.value = true
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
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  padding: 50px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px #333;
}

.profile-img {
  /* display: flex; */
  text-align: center; 
  margin-top: 30px;
  margin-bottom: 60px;
  border: ;
}

.profile-img > img {
  border-radius: 50%;
  height: 200px;
  width: 200px;
  
}
.my-products-chart {
  height: 800px;
}
#favorite {
  background-color: white;
  border-radius: 24px;
  padding: 16px;
  width: 50%;
  height: 500px;
  opacity: 1;
  padding: 16px;
}
#favorite-back {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-button {
  border: none;
  border-radius: 50%;
  background-color: var(--main-color);
  box-shadow: 1px 1px 3px #333;
}

.field {
  margin-right: 20px;
}
span {
  font-weight: 600;
}

button {
  font-size: 15px; 
  padding: 2px 2px 2px 2px;
}

</style>