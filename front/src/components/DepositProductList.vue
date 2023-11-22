<template>
  <div class="card" v-show="select">
    <div class="card-body">
      <!--상품명-->
      <h5 class="name card-title" @click="goDetail">{{ product.fin_prdt_nm }}</h5>
      <!--금융회사명-->
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ product.kor_co_nm }}</h6>

      <!--옵션-->
      <p v-for="depOption in dep_category" v-show="depOption.intr_rate">
        <div class="card text-center" style="width: 6rem; height: 6rem;">
          <div class="card-body">
            <h3 class="card-title">{{ depOption.intr_rate }}</h3>
            <p class="badge text-bg-secondary">{{ depOption.save_trm }}개월</p>
          </div>
        </div>
      </p>
    </div>
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