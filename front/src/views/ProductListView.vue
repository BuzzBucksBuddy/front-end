<template>
  <div>
    <h1>상품 목록</h1>
    <button @click="isDeposit = !isDeposit">{{ isDeposit ? '적금 상품 보기' : '예금 상품 보기' }}</button>
    <hr>

    <section v-show="isDeposit">
      <h2>예금 상품</h2>
        <select name="depBank" id="depBank" v-model="selectDepBank">
          <option disabled value="">은행을 선택하세요</option>
          <option v-for="depBank in articleStore.bankCategories" :key="depBank" :value="depBank.id">{{ depBank.name }}</option>
        </select>
        <select name="depTerm" id="depTerm" v-model="selectDepTerm">
          <option disabled value="">기간을 선택하세요</option>
          <option>6개월</option>
          <option>12개월</option>
          <option>24개월</option>
          <option>36개월</option>
        </select>
      <DepositProductList
        v-for="product in productStore.dep_products"
        :key="product.id"
        :product="product"
      />
    </section>

    <section v-show="!isDeposit">
      <h2>적금 상품</h2>
      <select name="savBank" id="savBank" v-model="selectSavBank">
          <option disabled value="">은행을 선택하세요</option>
          <option v-for="savBank in articleStore.bankCategories" :key="savBank" :value="savBank.id">{{ savBank.name }}</option>
        </select>
        <select name="savTerm" id="savTerm" v-model="selectSavTerm">
          <option disabled value="">기간을 선택하세요</option>
          <option>6개월</option>
          <option>12개월</option>
          <option>24개월</option>
          <option>36개월</option>
        </select>
      <SavingProductList
        v-for="product in productStore.sav_products"
        :key="product.id"
        :product="product"
      />
    </section>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useArticleStore } from '@/stores/article'
import DepositProductList from '@/components/DepositProductList.vue'
import SavingProductList from '@/components/SavingProductList.vue'
import axios from 'axios'

const productStore = useProductStore()
const articleStore = useArticleStore()
const isDeposit = ref(true)
const selectDepBank = ref(0)
const selectDepTerm = ref(0)
const selectSavBank = ref(0)
const selectSavTerm = ref(0)

onMounted(() => {
  productStore.getDepProducts()
  productStore.getSavProducts()
  articleStore.setBankCategories
  articleStore.getBankCategories
})

</script>

<style scoped>

</style>