<template>
  <div>
    <!--버튼 가운데 정렬 하고 싶어요 ㅠㅠ-->
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input @click="isDeposit = true" type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
      <label class="btn btn-warning" for="btnradio1">예금 상품</label>
      <input @click="isDeposit = false" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
      <label class="btn btn-warning" for="btnradio2">적금 상품</label>
    </div>

    <!--예금 상품-->
    <section v-show="isDeposit">
        <!--은행 선택 드롭다운...-->
        <div class="btn-group">
          <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            은행 선택
          </button>
          <ul class="dropdown-menu">
            <select name="depBank" id="depBank" v-model="selectDepBank">
              <li class="dropdown-item" :value="'선택 안함'">모든 은행</li>
              <li class="dropdown-item" v-for="depBank in articleStore.bankCategories" :key="depBank" :value="depBank.name">{{ depBank.name }}</li>
            </select>
          </ul>
        </div>

        <!--기간 선택-->
        <select name="depTerm" id="depTerm" v-model="selectDepTerm">
          <option :value="0" disabled>기간을 선택하세요</option>
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
      />
      <p v-if="productStore.dep_products.length === 0">
        <h3>해당하는 상품이 없습니다.</h3>
      </p>
    </section>

    <!--적금 상품-->
    <section v-show="!isDeposit">
      <select name="savBank" id="savBank" v-model="selectSavBank">
          <option :value="'선택 안함'" disabled>은행을 선택하세요</option>
          <option v-for="savBank in articleStore.bankCategories" :key="savBank" :value="savBank.name">{{ savBank.name }}</option>
        </select>
        <select name="savTerm" id="savTerm" v-model="selectSavTerm">
          <option :value="0" disabled>기간을 선택하세요</option>
          <option :value="6">6개월</option>
          <option :value="12">12개월</option>
          <option :value="24">24개월</option>
          <option :value="36">36개월</option>
        </select>
        <select name="savType" id="savType" v-model="selectSavType">
          <option :value="'선택 안함'" disabled>유형을 선택하세요</option>
          <option :value="'정액적립식'">정액적립식</option>
          <option :value="'자유적립식'">자유적립식</option>
        </select>
      <SavingProductList
        v-for="product in productStore.sav_products"
        :key="product.id"
        :product="product"
        :selectSavTerm="selectSavTerm"
        :selectSavType="selectSavType"
      />
    </section>

    <button class="scroll" @click="scrollUp">상단으로 이동하기</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProductStore } from '@/stores/product.js'
import { useArticleStore } from '@/stores/article.js'
import DepositProductList from '@/components/DepositProductList.vue'
import SavingProductList from '@/components/SavingProductList.vue'
import axios from 'axios'

const productStore = useProductStore()
const articleStore = useArticleStore()
const isDeposit = ref(true)

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

const getProductsData = function() {
    axios({
      method: 'get',
      url: `${productStore.API_URL}/products-data/`
    })
      .then(res => {
        console.log('success!')
      })
      .catch((err) => {
        console.log(err)
      })
  }

const scrollUp = function() {
  if (window.scrollY != 0) {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY - 100)
      scrollUp()
    }, 10)
  }
}

onMounted(() => {
  getProductsData()
  productStore.getDepProducts(selectDepBank.value)
  productStore.getSavProducts(selectSavBank.value)
  articleStore.setBankCategories()
  articleStore.getBankCategories()
})
</script>

<style scoped>
button {
  cursor: pointer;
}

.scroll {
  float: right;
}
</style>