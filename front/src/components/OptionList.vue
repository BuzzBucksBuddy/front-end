<template>
  <div>
    <h4>기간 : {{ option.save_trm }}개월</h4>
    <p>저축 금리 유형 : {{ option.intr_rate_type_nm }}</p>
    <p>저축 금리 : {{ option.intr_rate }}</p>
    <p>최고 우대 금리 : {{ option.intr_rate2 }}</p>
    <div>
      <button>가입하기</button>
    </div>
    {{ option }}
  </div>
  <hr>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()
const props = defineProps({
  option: Object,
  type: String
})

const productId = props.option.fin_prdt_cd

//가입하기
const joinOption = function (fin_prdt_cd) {
  if (loginStore.isLogin) {
    if (route.params.type === 'dep') {
      axios({
        method: 'post',
        url: `${store.API_URL}/deposit-product/${fin_prdt_cd}/join/`,
        headers: {
          Authorization: `Token ${loginStore.token}`
        }
      })
        .then((res) => {
          console.log(res)
          getDepProduct(route.params.productId)
          joiners(route.params.productId)
          console.log(isJoined.value)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (route.params.type === 'sav') {
      axios({
        method: 'post',
        url: `${store.API_URL}/saving-product/${fin_prdt_cd}/join/`,
        headers: {
          Authorization: `Token ${loginStore.token}`
        }
      })
        .then((res) => {
          console.log(res)
          getSavProduct(route.params.productId)
          joiners(route.params.productId)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}

// 가입한 유저들 확인
const joiners = function (fin_prdt_cd) {
  if (route.params.type === 'dep') {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/accounts/dep_users/${fin_prdt_cd}/`
    })
      .then((res) => {
        console.log(res)
        userList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/accounts/sav_users/${fin_prdt_cd}/`
    })
      .then((res) => {
        console.log(res)
        userList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// 가입한 옵션인지 확인
const isJoined = computed(() => {
  if (userList.value.length == 0) {
    return false
  } else {
    if (userList.value.users.includes(loginStore.myId)) {
      return true
    } else {
      return false
    }
  }
})

// 버튼 string
const joinSelector = computed(() => {
  return isJoined.value ? '가입취소' : '가입하기'
})

</script>

<style scoped>
h4 {
  margin: 0;
}
</style>