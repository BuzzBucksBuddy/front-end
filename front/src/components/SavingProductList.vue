<template>
  <div>
    <p>공시 제출월 : {{ product.dcls_month }}</p>
    <p>금융회사명 : {{ product.kor_co_nm }}</p>
    <p @click="goDetail">상품명 : {{ product.fin_prdt_nm }}</p>
    <h5>정액적립식</h5>
    <p v-for="option in options">
      <p v-if="option.rsrv_type_nm === '정액적립식'">
        {{ option.save_trm }}개월 : {{ option.intr_rate }}
      </p>
    </p>
    <h5>자유적립식</h5>
    <p v-for="option in options">
      <p v-if="option.rsrv_type_nm === '자유적립식'">
        {{ option.save_trm }}개월 : {{ option.intr_rate }}
      </p>
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

const options = ref(null)

const props = defineProps({
  product: Object
})

const goDetail = function () {
  router.push({ name: 'ProductDetail', params: { type: 'sav', productId: props.product.fin_prdt_cd } })
}

const getSavOptions = function(code) {
  axios({
    method: 'get',
    url: `${store.API_URL}/saving-options/${code}/`
  })
    .then(res => {
      options.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  getSavOptions(props.product.fin_prdt_cd)
})
</script>

<style scoped>

</style>