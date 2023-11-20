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
    <button @click="getProduct">가입하기</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const store = useProductStore()
const product = ref(null)


const getProduct = function () {
  console.log('=^._.^= 가입하기')
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