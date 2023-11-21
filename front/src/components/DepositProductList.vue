<template>
  <div v-show="select">
    <p>공시 제출월 : {{ product.dcls_month }}</p>
    <p>금융회사명 : {{ product.kor_co_nm }}</p>
    <p class="name" @click="goDetail">상품명 : {{ product.fin_prdt_nm }}</p>
    <p v-for="depOption in dep_category" v-show="depOption.intr_rate">
      {{ depOption.save_trm }}개월 : {{ depOption.intr_rate }}
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
  selectDepTerm: Number
})

const dep_category = ref([])

const select = computed(() => {

  return dep_category.value.length > 0 ? true : false
})

const goDetail = function () {
  router.push({ name: 'ProductDetail', params: { type: 'dep', productId: props.product.fin_prdt_cd } })
}

const depCategorize = function(code, term) {
  axios({
    method: 'get',
    url: `${store.API_URL}/deposit-categorize/${code}/${term}/`
  })
    .then(res => {
      dep_category.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const depOptionWatch = watch(() => (props.selectDepTerm), (newValue) => {
  depCategorize(props.product.fin_prdt_cd ,newValue)
})

onMounted(() => {
  depCategorize(props.product.fin_prdt_cd, props.selectDepTerm)
})
</script>

<style scoped>
.name {
  cursor: pointer;
}
</style>