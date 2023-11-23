<template>
    <div
      v-if="savOpt"
      @click="goDetail(savOpt.product.fin_prdt_cd)"
      class="box"
    >
      <div v-if="idx === 0" class="tag">
        <i class="fa-solid fa-crown"></i>
      </div>
      <h5>{{ savOpt.product.fin_prdt_nm }}</h5>
      <p>{{ savOpt.intr_rate2 }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  const props = defineProps({
    prodId: Number,
    idx: Number
  })
  
  const savOpt = ref(null)
  const API_URL = 'http://127.0.0.1:8000/api/v1/products'
  const getSavOpt = function () {
    axios({
      method: 'get',
      url: `${API_URL}/one-sav-opt/${props.prodId}/`
    })
      .then((res) => {
        savOpt.value = res.data
      })
      .catch((err) => {
        console.log(err.data)
      })
  }
  
  getSavOpt()
  
  const goDetail = function (id) {
    router.push({ name: 'ProductDetail', params: { type: 'sav', productId: id }})
  }
  
  </script>
  
  <style scoped>
  .box {
    position: relative;
    border: 4px solid var(--gray-color);
    border-radius: 16px;
    padding: 10px 24px;
    cursor: pointer;
    transition: all 0.5s;
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .box:hover {
    background-color: var(--main-color);
    border: 4px solid var(--sub-color);
  }
  .tag {
    z-index: 1;
    position: absolute;
    width: 32px;
    height: 32px;
    background-color: var(--sub-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    color: var(--main-color);
    top: -10px;
    left: -10px;
  }
  h5 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  .box > p {
    font-size: 18px;
    font-weight: 800;
    margin-left: 12px;
  }
  </style>