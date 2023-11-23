<template>
  <div class="card product-card" v-show="select">
    <div class="card-body">
      <!--상품명-->
      <h5 class="name card-title" @click="goDetail">{{ product.fin_prdt_nm }}</h5>
      <!--금융회사명-->
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ product.kor_co_nm }}</h6>

      <!--옵션-->
      <div class="option-cards">
        <div v-for="savOption in sav_category">
          <p v-if="savOption.rsrv_type_nm === '정액적립식'">
            <div class="card text-bg-light text-center" style="width: 6.5rem; height: 6.5rem;">
              <div class="card-body card-option-body">
                <h3 class="card-title card-option-title">{{ savOption.intr_rate }}</h3>
                <p class="card-subtitle">
                  <span class="badge rounded-pill text-bg-secondary">{{ savOption.save_trm }}개월</span>
                  <span class="badge rounded-pill text-bg-primary">정액적립식</span>
                </p>
              </div>
            </div>
          </p>
          <p v-if="savOption.rsrv_type_nm === '자유적립식'">
            <div class="card text-bg-light text-center" style="width: 6.5rem; height: 6.5rem;">
              <div class="card-body card-option-body">
                <h3 class="card-title card-option-title">{{ savOption.intr_rate }}</h3>
                <p class="card-subtitle">
                  <span class="badge rounded-pill text-bg-secondary">{{ savOption.save_trm }}개월</span>
                  <span class="badge rounded-pill text-bg-success">자유적립식</span>
                </p>
              </div>
            </div>
          </p>
        </div>
      </div>
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
  selectSavTerm: Number,
  selectSavType: String
})

const sav_category = ref([])

const select = computed(() => {
  return sav_category.value.length && sav_category.value.intr_rate !== null > 0 ? true : false
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
.card-option-title {
  margin: 0px;
}

.card-option-body {
  padding-top: 10px;
}

.product-card {
  margin: 10px 0px;
}

.option-cards {
  display: flex;
  gap: 5px;
}

.name {
  cursor: pointer;
}

h2 {
  margin: 1px;
}
</style>