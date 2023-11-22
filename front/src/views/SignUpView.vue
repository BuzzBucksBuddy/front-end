<template>
  <div>
    <h1>새로운 계정 만들기</h1>
    <p>{{ store.errData }}</p>
    <form @submit.prevent="signUp">
      <!--사용정보-->
      <div class="preview">

      </div>
      <div class="input-box">
        <label class="required" for="username">*아이디 </label>
        <input type="text" id="username" v-model.trim="username">
      </div>
      <div class="input-box">
        <p :class="['pwdMsg', {'hide': !isCheck}]">{{ pwdMsg}}</p>
        <label class="required" for="password1">*비밀번호 </label>
        <input type="password" id="password1" v-model.trim="password1">
        <label class="required" for="password2">*비밀번호 확인 </label>
        <input type="password" id="password2" v-model.trim="password2">
      </div>
      
      <!--개인정보-->
      <div class="input-box">
        <label class="required" for="nickname">*닉네임 </label>
        <input type="text" id="nickname" v-model.trim="nickname">
      </div>
      <div class="input-box">
        <label for="profile-img">프로필 이미지 </label>
        <input type="file" id="profile-img" ref="profileImgInput" @change="handleProfileImageChange">
      </div>
      <!-- <input type="text" id="profile-img" v-model.trim="profileImg"> -->
      <div class="input-box">
        <label class="required" for="age">*나이 </label>
        <input type="text" id="age" v-model.trim="age">
      </div>
      <div class="input-box">
        <label for="email">이메일 </label>
        <input type="text" id="email" v-model.trim="email">      
      </div>

      <!--개인화 요소-->
      <div class="input-box">
        <label for="money">자산 </label>
        <input type="text" id="money" v-model.trim="money">
      </div>
      <div class="input-box">
        <label for="salary">연봉 </label>
        <input type="text" id="salary" v-model.trim="salary">
      </div>

      <div>
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

      <input class="submit-btn" type="submit" value="가입하기">
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSignupStore } from '@/stores/signup'

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
  
    errMsg.value = store.signUp(payload, formData)
  }
}

</script>

<style scoped>
.hide {
  display: none;
}
.pwdMsg {
  color: rgb(230, 20, 20);
  font-size: 12px;
}
.required {
  font-weight: bold;
}
.error {

}
.input-box {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}
.input-box input {
  margin-top: 4px;
}
.input-box input[type="text"],
.input-box input[type="password"] {
  border: 2px solid rgb(138, 138, 138);
  height: 36px;
  border-radius: 6px;
}
.submit-btn {
  width: 300px;
  height: 48px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s;
  background-color: rgb(255, 237, 203);
}
.submit-btn:hover {
  background-color: rgb(255, 215, 130);
}
</style>