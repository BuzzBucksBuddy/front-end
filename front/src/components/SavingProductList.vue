<template>
    <div @click="goDetail">
      <h1>적금 상품</h1>
      <p>공시 제출월 : {{ product.dcls_month }}</p>
      <p>금융회사명 : {{ product.kor_co_nm }}</p>
      <p>상품명 : {{ product.fin_prdt_nm }}</p>
      <p>{{ product }}</p>
      <ProductDetailView
        :sav_product="product"
      />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useProductStore } from '@/stores/product'
  import { useRouter, useRoute } from 'vue-router'
  import ProductDetailView from '@/views/ProductDetailView.vue'
  
  const store = useProductStore()
  const router = useRouter()
  const route = useRoute()
  
  const props = defineProps({
    product: Object
  })
  
  const goDetail = function () {
    router.push({ name: 'ProductDetail', params: { type: 'sav', productId: props.product.fin_prdt_cd } })
  }
  

  </script>
  
  <style scoped>
  
  </style>