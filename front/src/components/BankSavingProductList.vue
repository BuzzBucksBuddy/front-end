<template>
  <div @click="goDetail" class="bank-card">
    <h4>{{ products.fin_prdt_nm }}</h4>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  products: Object
})

const goDetail = function () {
  router.push({ name: 'ProductDetail', params: { type: 'sav', productId: props.products.fin_prdt_cd }})
}
</script>

<style scoped>
.bank-card {
  height: 60px;
  border: 4px solid var(--gray-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  transition: background-color 0.5s;
  margin: 8px 0;
}
h4 {
  margin: 0;
  font-size: 16px;
}
.bank-card:hover {
  background-color: var(--main-color);
  cursor: pointer;
}
</style>