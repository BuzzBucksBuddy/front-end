<template>
  <div v-show="select">
    <p>공시 제출월 : {{ product.dcls_month }}</p>
    <p>금융회사명 : {{ product.kor_co_nm }}</p>
    <p @click="goDetail">상품명 : {{ product.fin_prdt_nm }}</p>

    <p v-for="savOption in sav_category">
      <p v-if="savOption.rsrv_type_nm === '정액적립식'">
        <p>정액적립식 - {{ savOption.save_trm }}개월 : {{ savOption.intr_rate }}</p>
      </p>
      <p v-if="savOption.rsrv_type_nm === '자유적립식'">
        <p>자유적립식 - {{ savOption.save_trm }}개월 : {{ savOption.intr_rate }}</p>
      </p>
    </p>
      
    <hr>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import axios from 'axios'

const store = useProductStore()
const router = useRouter()

const props = defineProps({
  product: Object,
  selectSavTerm: Number,
  selectSavType: String
})

const sav_category = ref([])

const select = computed(() => {
  return sav_category.value.length > 0 ? true : false
})

const goDetail = function () {
  router.push({ name: 'ProductDetail', params: { type: 'sav', productId: props.product.fin_prdt_cd } })
}

const savCategorize = function(code, term, type) {
  axios({
    method: 'get',
    url: `${store.API_URL}/saving-categorize/${code}/${term}/${type}/`
  })
    .then(res => {
      sav_category.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const savOptionWatch = watch(() => [props.selectSavTerm, props.selectSavType], ([newTerm, newType]) => {
  savCategorize(props.product.fin_prdt_cd, newTerm, newType)
})

onMounted(() => {
  savCategorize(props.product.fin_prdt_cd, props.selectSavTerm, props.selectSavType)
})
</script>

<style scoped>

</style>