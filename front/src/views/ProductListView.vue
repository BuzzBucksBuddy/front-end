<template>
  <div>
    <h1>상품 목록</h1>
    <button @click="isDeposit = !isDeposit">{{ isDeposit ? '적금 상품 보기' : '예금 상품 보기' }}</button>
    <hr>

    <h2>예금 상품</h2>
    <section v-show="isDeposit">
      <select v-model="bankSelect">
        <option disabled value="">은행을 선택하세요</option>
        <option v-for="bank in depBankList">{{ bank }}</option>
      </select>
      <select v-model="termSelect">
        <option disabled value="">기간을 선택하세요</option>
        <option v-for="term in depTermList">{{ term }}</option>
      </select>
      <DepositProductList
        v-for="product in store.dep_products"
        :key="product.id"
        :product="product"
      />
    </section>

    <h2>적금 상품</h2>
    <section v-show="!isDeposit">
      <select v-model="bankSelect">
        <option disabled value="">은행을 선택하세요</option>
        <option v-for="bank in savBankList">{{ bank }}</option>
      </select>
      <select v-model="termSelect">
        <option disabled value="">기간을 선택하세요</option>
        <option v-for="term in savTermList">{{ term }}</option>
      </select>
      <SavingProductList
        v-for="product in store.sav_products"
        :key="product.id"
        :product="product"
      />
    </section>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import DepositProductList from '@/components/DepositProductList.vue'
import SavingProductList from '@/components/SavingProductList.vue'

const store = useProductStore()
const isDeposit = ref(true)
const bankSelect = ref('')
const termSelect = ref('')
const depBankList = ref(null)
const savBankList = ref(null)
const depTermList = ref(null)
const savTermList = ref(null)

const getDepbankList = function() {
  axios({
    method: 'get',
    url: `${store.API_URL}/deposit-list/`
  })
    .then(res => {
      depBankList.value = res.data.kor_co_nm
    })
    .catch((err) => {
      console.log(err)
    })
}

const getDepTermList = function() {
  axios({
    method: 'get',
    url: `${store.API_URL}/deposit-list/`
  })
    .then(res => {
      depTermList.value = res.data.save_trm
    })
    .catch((err) => {
      console.log(err)
    })
}

const getSavbankList = function() {
  axios({
    method: 'get',
    url: `${store.API_URL}/saving-list/`
  })
    .then(res => {
      savBankList.value = res.data.kor_co_nm
    })
    .catch((err) => {
      console.log(err)
    })
}

const getSavTermList = function() {
  axios({
    method: 'get',
    url: `${store.API_URL}/saving-list/`
  })
    .then(res => {
      savTermList.value = res.data.save_trm
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  store.getDepProducts()
  getDepbankList
  getDepTermList
})

onMounted(() => {
  store.getSavProducts()
  getSavbankList
  getSavTermList
})

</script>

<style scoped>

</style>