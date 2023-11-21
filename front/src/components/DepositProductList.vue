<template>
  <div>
    <p>공시 제출월 : {{ product.dcls_month }}</p>
    <p>금융회사명 : {{ product.kor_co_nm }}</p>
    <p @click="goDetail">상품명 : {{ product.fin_prdt_nm }}</p>
    <p v-for="depOption in store.dep_category">
      {{ depOption.save_trm }}개월 : {{ depOption.intr_rate }}
    </p>
    <hr>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import axios from 'axios'

const store = useProductStore()
const router = useRouter()

const props = defineProps({
  product: Object
})

const goDetail = function () {
  router.push({ name: 'ProductDetail', params: { type: 'dep', productId: props.product.fin_prdt_cd } })
}

onMounted(() => {
  store.depCategorize(props.product.fin_prdt_cd, props.product.save_trm)
  console.log(store.dep_category)
})
</script>

<style scoped>

</style>