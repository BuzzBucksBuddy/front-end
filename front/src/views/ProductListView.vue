<template>
  <div>
    <!--버튼-->
    <div class="selector">
      <h4 :class="['prod-toggle', { selected: isDeposit}]" @click="isDeposit=true">예금</h4>
      <h4 :class="['prod-toggle', { selected: !isDeposit}]" @click="isDeposit=false">적금</h4>
    </div>

    <!--예금 상품-->
    <section v-show="isDeposit">
      <!--은행 선택-->
        <select name="depBank" id="depBank" v-model="selectDepBank">
          <option class="dropdown-item" :value="'선택 안함'">모든 은행</option>
          <option class="dropdown-item" v-for="depBank in articleStore.bankCategories" :key="depBank" :value="depBank.name">{{ depBank.name }}</option>
        </select>
      <!--기간 선택-->
      <select name="depTerm" id="depTerm" v-model="selectDepTerm">
        <option :value="0">모든 기간</option>
        <option :value="6">6개월</option>
        <option :value="12">12개월</option>
        <option :value="24">24개월</option>
        <option :value="36">36개월</option>
      </select>

      <DepositProductList
        v-for="product in productStore.dep_products"
        :key="product.id"
        :product="product"
        :selectDepTerm="selectDepTerm"
        class="product-card"
      />
    </section>

    <!--적금 상품-->
    <section v-show="!isDeposit">
      <!--은행 선택-->
      <select name="savBank" id="savBank" v-model="selectSavBank">
        <option :value="'선택 안함'">모든 은행</option>
        <option v-for="savBank in articleStore.bankCategories" :key="savBank" :value="savBank.name">{{ savBank.name }}</option>
      </select>
      <!--기간 선택-->
      <select name="savTerm" id="savTerm" v-model="selectSavTerm">
        <option :value="0">모든 기간</option>
        <option :value="6">6개월</option>
        <option :value="12">12개월</option>
        <option :value="24">24개월</option>
        <option :value="36">36개월</option>
      </select>
      <!--유형 선택-->
      <select name="savType" id="savType" v-model="selectSavType">
        <option :value="'선택 안함'">모든 유형</option>
        <option :value="'정액적립식'">정액적립식</option>
        <option :value="'자유적립식'">자유적립식</option>
      </select>

      <div class="product-cards">
        <SavingProductList
          v-for="product in productStore.sav_products"
          :key="product.id"
          :product="product"
          :selectSavTerm="selectSavTerm"
          :selectSavType="selectSavType"
        />
      </div>
    </section>

    <!--페이지 최상단으로 이동-->
    <button type="button" class="btn btn-light scroll" @click="scrollUp">
      <p><i class="fa-solid fa-angles-up fa-bounce fa-lg" style="color: #ffe600;"></i></p>
      <p><i class="fa-solid fa-piggy-bank fa-bounce fa-xl" style="color: #ffe600;"></i></p>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProductStore } from '@/stores/product.js'
import { useArticleStore } from '@/stores/article.js'
import DepositProductList from '@/components/DepositProductList.vue'
import SavingProductList from '@/components/SavingProductList.vue'

const productStore = useProductStore()
const articleStore = useArticleStore()
const isDeposit = ref(true)
const switcher = ref(true)

const selectDepBank = ref('선택 안함')
const selectDepTerm = ref(0)

const selectSavBank = ref('선택 안함')
const selectSavTerm = ref(0)
const selectSavType = ref('선택 안함')

const depBankWatch = watch(() => (selectDepBank.value), (newValue) => {
  productStore.getDepProducts(newValue)
})

const savBankWatch = watch(() => (selectSavBank.value), (newValue) => {
  productStore.getSavProducts(newValue)
})

const scrollUp = function() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
  // productStore.getProductsData()
  productStore.getDepProducts(selectDepBank.value)
  productStore.getSavProducts(selectSavBank.value)
  articleStore.setBankCategories()
  articleStore.getBankCategories()
})
</script>

<style scoped>
select {
  margin-right: 5px;
  padding: 5px;
  background-color: var(--main-color);
  border: 4px solid var(--sub-color);
  width: 25%;
  height: 40px;
  border-radius: 20px;
}

button {
  cursor: pointer;
}

.scroll {
  float: right;
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: black;
  padding: 10px;
}

.selected {
  color: var(--sub-color);
  background-color: var(--main-color);
}

.selector {
  display: flex;
  margin: 50px 370px;
  align-items: baseline;
}
.selector h4 {
  margin-left: 10px;
  transition: all 0.3s;
  cursor: pointer;
}
.selector h4:hover {
  color: var(--sub-color);
  color: white;
}

.prod-toggle {
  width: 120px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}
.prod-toggle:hover {
  background-color: var(--sub-color);
}
</style>