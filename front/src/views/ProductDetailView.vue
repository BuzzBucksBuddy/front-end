<template>
  <div>
    <h1>Product Detail View</h1>
    <p v-for="option in store.optionsValue">
      <p>공시 제출월 : {{ option }}</p>
      <p>금융회사명 : {{ option }}</p>
      <p>상품명 : {{ option }}</p>
      <p>가입제한 : {{ option }}</p>
      <p>가입 방법 : {{ option }}</p>
      <p>우대조건 : {{ option }}</p>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useProductStore()

onMounted(() => {
  if (route.params.type === 'dep') {
    store.getDepOptions(route.params.productId)
  } else if (route.params.type === 'sav') {
    store.getSavOptions(route.params.productId)
  }
})
</script>

<style scoped>

</style>