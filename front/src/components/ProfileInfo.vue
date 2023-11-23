<template>
  <div>
    <div id="favorite-back" v-if="!isSavedFavorite">
      <Favorite
        id="favorite"
        @do-update="update"
      />
    </div>

    <!-- <h2>Profile Info</h2> -->
    <!-- 나의 개인 정보 -->
    <div class="profile ">
      <div class="profile-img">
        <img :src="`${LoginStore.API_URL}${myProfile.profile_thumbnail}`" alt="Profile_image">
      </div>

      <div class="info-box">
      <div class="inner-box">
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

      <div class="inner-box">
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
      
      <div>
        <div v-if="isSavedFavorite" class="gap-3">
          <p>Favorite</p>
          <div class="d-flex m-1 flex-wrap">
            <div v-for="favorie in myProfile.favorite" class="me-3">
              <span>{{ favorie.title }}</span>
            </div>
            <button @click="isSavedFavorite =!isSavedFavorite" class="edit-button">🖍</button>
          </div>
        </div>
        <div v-else class="d-flex gap-3">
          <p>Favorite</p>
          <button @click="editField(myProfile.favorite, 'favorite')">저장</button>
        </div>
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
  </div>

  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { ref, onMounted, computed } from 'vue'
import Favorite from '@/components/Favorite.vue'


const update = function () {
  isSavedFavorite.value = !isSavedFavorite.value
  LoginStore.getProfile()
}

const LoginStore = useLoginStore()
const editBtn = ref('변경')


onMounted(() => {
  LoginStore.getProfile()
})

const myProfile = computed(()=>{
  return LoginStore.myProfile
})


// 내 프로필 정보
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
  LoginStore.editProfile(fieldName, newValue.value)

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
  width: 90%;
  height: 80%;
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  padding: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 3px #333;
}

.profile-img {
  /* display: flex; */
  text-align: center; 
  /* margin-top: 30px; */
  margin-bottom: 60px;
}

.profile-img > img {
  border-radius: 50%;
  height: 200px;
  width: 200px;
  border-bottom: 4px solid black;
}

.info-box {
  display: flex;
  justify-content: space-around;
  gap: 10%;
  margin-left: 10%;
  
}
.inner-box {
  width: 40%;
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

input {
  width: 50%;
}

select {
  width:40%
}




</style>