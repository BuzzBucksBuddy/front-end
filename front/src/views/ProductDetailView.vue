<template>
  <div class="card detail-card">
    <div class="card-body">
      <h3>상세 정보</h3>
      <div v-if="product">
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 공시 제출월: {{ product.dcls_month }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 금융회사명: {{ product.kor_co_nm }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 상품명: {{ product.fin_prdt_nm }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 가입제한: {{ product.join_deny }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 가입 대상: {{ product.join_member }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 우대조건: {{ product.spcl_cnd }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 만기 후 이자율: {{ product.mtrt_int }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 기타 유의사항: {{ product.etc_note }}</p>
        <p><i class="fa-solid fa-check fa-sm" style="color: #303030;"></i> 가입 방법: {{ product.join_way }}</p>
      </div>
    </div>
  </div>
  <hr>
  <div class="card-deck">
    <OptionList
      v-for="option in options"
      v-show="option.intr_rate"
      :key="option.id"
      :option="option"
      :type="route.params.type"
      @update-plz="updatePlz"
    />
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
const store = useProductStore()
const product = ref(null)

const options = ref([])

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
    depCategorize(route.params.productId, 0)
  } else if (route.params.type === 'sav') {
    getSavProduct(route.params.productId)
    savCategorize(route.params.productId, 0, '선택 안함')
  }
})

const updatePlz = function () {
  if (route.params.type === 'dep') {
    getDepProduct(route.params.productId)
    depCategorize(route.params.productId, 0)
  } else if (route.params.type === 'sav') {
    getSavProduct(route.params.productId)
    savCategorize(route.params.productId, 0, '선택 안함')
  }
}

</script>

<style scoped>
.detail-card {
  margin-top: 50px;
}

.option-cards {
  display: flex;
}

.card-body {
  padding: 30px;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>