<template>
  <div>
    <h1>상품 상세 정보</h1>
    <div v-if="product">
      <p>공시 제출월 : {{ product.dcls_month }}</p>
      <p>금융회사명 : {{ product.kor_co_nm }}</p>
      <p>상품명 : {{ product.fin_prdt_nm }}</p>
      <p>가입제한 : {{ product.join_deny }}</p>
      <p>가입 대상 : {{ product.join_member }}</p>
      <p>우대조건 : {{ product.spcl_cnd }}</p>
      <p>만기 후 이자율 : {{ product.mtrt_int }}</p>
      <p>기타 유의사항 : {{ product.etc_note }}</p>
      <p>가입 방법 : {{ product.join_way }}</p>
    </div>
    <hr>
    <div>
      <OptionList
        v-for="option in options"
        v-show="option.intr_rate"
        :key="option.id"
        :option="option"
        :type="route.params.type"
      />
    </div>
    <button @click="joinProduct(product.fin_prdt_cd)">{{ joinSelector }}</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { useLoginStore } from '@/stores/login'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import OptionList from '@/components/OptionList.vue'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const loginStore = useLoginStore()
const product = ref(null)

const userList = ref([])

const options = ref([])

// 가입하기
const joinProduct = function (fin_prdt_cd) {
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

// 가입한 상품인지 확인
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

const joinSelector = computed(() => {
  return isJoined.value ? '가입취소' : '가입하기'
})

const getDepProduct = function(dep_cd) {
    axios({
      method: 'get',
      url: `${store.API_URL}/deposit-product/${dep_cd}/`
    })
      .then(res => {
        product.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
}

const getSavProduct = function(sav_cd) {
  axios({
    method: 'get',
    url: `${store.API_URL}/saving-product/${sav_cd}/`
  })
    .then(res => {
      product.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const depCategorize = function(code, term) {
  axios({
    method: 'get',
    url: `${store.API_URL}/deposit-categorize/${code}/${term}/`
  })
    .then(res => {
      options.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const savCategorize = function(code, term, type) {
  axios({
    method: 'get',
    url: `${store.API_URL}/saving-categorize/${code}/${term}/${type}/`
  })
    .then(res => {
      options.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  if (route.params.type === 'dep') {
    getDepProduct(route.params.productId)
    joiners(route.params.productId)
    depCategorize(route.params.productId, 0)
  } else if (route.params.type === 'sav') {
    getSavProduct(route.params.productId)
    joiners(route.params.productId)
    savCategorize(route.params.productId, 0, '선택 안함')
  }
})

</script>

<style scoped>

</style>