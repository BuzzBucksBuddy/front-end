<template>
  <div class="container">
    <form class="main-container" @submit.prevent="signUp">

      <section class="input-section required">

        <h2>계정 만들기</h2>
        <p>{{ store.errData }}</p>
        
        <div class="input-box">
          <!-- <label class="required" for="username">*아이디 </label> -->
          <div class="input-text">
            <input type="text" id="username" v-model.trim="username" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-user"></i>
              <p> 아이디</p>
            </div>
          </div>
        </div>

        <div class="input-box">
          <p :class="['pwdMsg', {'hide': !isCheck}]">{{ pwdMsg}}</p>
          <!-- <label class="required" for="password1">*비밀번호 </label> -->
          <div class="input-text">
            <input type="password" id="password1" v-model.trim="password1" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-key"></i>
              <p> 비밀번호</p>
            </div>
          </div>
          <!-- <label class="required" for="password2">*비밀번호 확인 </label> -->
          <div class="input-text">
            <input type="password" id="password2" v-model.trim="password2" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-key"></i>
              <p> 비밀번호 확인</p>
            </div>

          </div>
        </div>

        <div class="input-box">
          <!-- <label class="required" for="nickname">*닉네임 </label> -->
          <div class="input-text">
            <input type="text" id="nickname" v-model.trim="nickname" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-signature"></i>
              <p> 닉네임</p>
            </div>
          </div>
        </div>

        <div class="input-box">
          <!-- <label class="required" for="age">*나이 </label> -->
          <div class="input-text">
            <input type="text" id="age" v-model.trim="age" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-cake-candles"></i>
              <p> 나이</p>
            </div>
          </div>
        </div>

      </section>

      <section class="profile-section">
        <div class="profile-box">
          <div class="profile-selector">
            <label for="profile-img">프로필 이미지 </label>
            <input type="file" id="profile-img" ref="profileImgInput" @change="handleProfileImageChange">
          </div>
          <div class="preview">
          </div>
        </div>
      </section>

      <section class="input-section">
        <div class="input-box">
          <!-- <label for="email">이메일 </label> -->
          <div class="input-text">
            <input type="text" id="email" v-model.trim="email" placeholder="">      
            <div class="input-placeholder">
              <i class="fa-solid fa-cake-candles"></i>
              <p> 이메일</p>
            </div>
          </div>
        </div>

        <div class="input-box">
          <!-- <label for="money">자산 </label> -->
          <div class="input-text">
            <input type="text" id="money" v-model.trim="money" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-house-chimney"></i>
              <p> 자산</p>
            </div>
          </div>
        </div>

        <div class="input-box">
          <!-- <label for="salary">연봉 </label> -->
          <div class="input-text">
            <input type="text" id="salary" v-model.trim="salary" placeholder="">
            <div class="input-placeholder">
              <i class="fa-solid fa-money-check-dollar"></i>
              <p> 연봉</p>
            </div>
          </div>
        </div>
      </section>

      <section class="input-section">
        <div class="input-else">
          <label for="mbti">MBTI </label>
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
        </div>
      </section>

      <input class="submit-btn" type="submit" value="가입하기">
    </form>
    <div id="favorite-back" v-if="modalDisplay">
      <Favorite
        id="favorite"
        @do-update="goProfile"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSignupStore } from '@/stores/signup'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'
import Favorite from '@/components/Favorite.vue'

const router = useRouter()
const loginStore = useLoginStore()
const store = useSignupStore()
const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)
const nickname = ref(null)
const profileImg = ref(null)
const profileImgInput = ref(null)
const age = ref(null)
const email = ref('')
const money = ref(null)
const salary = ref(null)
const mbti = ref(null)

const isCheck = ref(false)
const errMsg = ref(null)
const pwdMsg = ref(null)

const modalDisplay = ref(false)

const goProfile = function () {
  router.push({ name: 'Home'})
}

const handleProfileImageChange = function () {
  const file = profileImgInput.value.files[0]
  if (file) {
    // 필요한 경우 여기서 이미지 미리보기 또는 기타 작업을 처리 가능
    profileImg.value = file
  }
}

const passwordCheck = function (pw1, pw2) {
  // if (pw1 === pw2) {
  //   return true
  // } else {
  //   pwdMsg.value = '비밀번호가 일치하지 않습니다.'
  //   isCheck.value = true
  //   return false
  // }
  if (pw1.length >= 8) {
    return true
  } else {
    pwdMsg.value = '8자 이상의 비밀번호가 필요합니다.'
    isCheck.value = true
  }
}

const signUp = function () {
  if (passwordCheck(password1.value, password2.value)) {
    const payload = {
      username: username.value,
      password: password1.value,
    }
    const formData = new FormData()
    formData.append('username', username.value)
    formData.append('password1', password1.value)
    formData.append('password2', password2.value)
    formData.append('nickname', nickname.value)
    formData.append('age', age.value)
    formData.append('email', email.value)
    if (money.value !== null) {
      formData.append('money', money.value)
    }
    if (salary.value !== null) {
      formData.append('salary', salary.value)
    }
    
    formData.append('mbti', mbti.value)
  
    if (profileImg.value) {
      formData.append('profile_thumbnail', profileImg.value)
    }
  
    modalDisplay.value = true
    store.signUp(payload, formData)
    loginStore.getFavoriteCategory()
    loginStore.getProfile()
  }
}

</script>

<style scoped>
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
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.hide {
  display: none;
}
.pwdMsg {
  color: rgb(230, 20, 20);
  font-size: 12px;
}
.preview {
  width: 100px;
  height: 100px;
  border: 1px solid var(--gray-color);
  border-radius: 8px;

}
h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
}
.container {
  display: flex;
  justify-content: center;
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
}
.input-section {
  border: 1px solid var(--gray-color);
  border-radius: 16px;
  padding: 8px 16px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.profile-section {
  border: 1px solid var(--gray-color);
  border-radius: 16px;
  padding: 16px;
  margin-top: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.profile-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 420px;
}
.profile-selector {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start
}
.profile-box label {
  margin-bottom: 16px;
}
.required {
  border: none;
  margin-top: 0;
}
.input-box {
  display: flex;
  flex-direction: column;
  margin-top: 8px 0;
}
.input-box input[type="text"],
.input-box input[type="password"] {
  border: 0 solid orange;
  height: 48px;
  border-radius: 24px;
  background-color: var(--gray-color);
  padding-left: 24px;
  outline: 0;
  transition: all 0.5s;
}
.input-box input[type="text"]:hover,
.input-box input[type="password"]:hover {
  background-color: var(--main-color);
  
}
.input-box input[type="text"]:focus,
.input-box input[type="password"]:focus {
  background-color: var(--main-color);
  box-shadow: 1px 1px 3px #d7d7d7;
}
input[type="text"]:focus ~ .input-placeholder,
input[type="password"]:focus ~ .input-placeholder {
  top: -10px;
}
input:not(:placeholder-shown, :focus) + .input-placeholder {
  /* display: none; */
  top: -10px;
}
.input-text {
  margin: 8px 0;
  position: relative;
}
.input-text input {
  width: 420px;
}
.input-placeholder {
  display: flex;
  align-items: baseline;
  position: absolute;
  top: 14px;
  left: 24px;
  color: rgb(87, 87, 87);
  transition: all 0.5s;
}
.input-placeholder p {
  margin-left: 8px;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 700;
}
.input-else {
  width: 420px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
}
.submit-btn {
  margin-top: 12px;
  width: 420px;
  height: 48px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.5s;
  background-color: var(--main-color);
  font-size: 18px;
  font-weight: 700;
}
.submit-btn:hover {
  background-color: var(--sub-color);
  color: white;
}
#mbti {
  width: 300px;
}
</style>