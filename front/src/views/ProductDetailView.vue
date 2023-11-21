<template>
  <div>
    <h1>상품 상세 정보</h1>
    <div v-if="product">
      <p>공시 제출월 : {{ product.dcls_month }}</p>
      <p>금융회사명 : {{ product.kor_co_nm }}</p>
      <p>상품명 : {{ product.fin_prdt_nm }}</p>
      <p>가입제한 : {{ product.join_deny }}</p>
      <p>가입 방법 : {{ product.join_way }}</p>
      <p>우대조건 : {{ product.spcl_cnd }}</p>
    </div>
    <button @click="joinProduct(product)">가입하기</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const product = ref(null)

const joinProduct = function (product) {
  const existingJoin = JSON.parse(localStorage.getItem('join')) || []

  // 중복된 상품이 있는지 확인
  const isDuplicate = existingJoin.length > 0 && existingJoin.find((item) => item.id === product.id)

  // 중복이 아니라면 추가
  if(!isDuplicate) {
    alert('가입 성공!')
    existingJoin.push(product)
  } else {
    alert('이미 가입한 상품입니다. 가입 상품 목록 페이지로 이동합니다.')
  }

  // 수정된 데이터를 localStorage 에 저장
  localStorage.setItem('join', JSON.stringify(existingJoin))

  router.push({ name: 'JoinList' })
}

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

onMounted(() => {
  if (route.params.type === 'dep') {
    getDepProduct(route.params.productId)
  } else if (route.params.type === 'sav') {
    getSavProduct(route.params.productId)
  }
})

</script>

<style scoped>

</style>