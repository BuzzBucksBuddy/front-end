<template>
  <div>
    <!-- 나의 가입 상품 정보 -->
    <div>
      <!-- {{ myProfile.financial_options_dep }} -->
      <!-- {{ myProfile.financial_options_sav }} -->
      <div class="profile">
        <!-- <p>My Financial Product(=Options기준)</p> -->
        <div class="my-products">
          <h5>나의 예금 상품</h5>
          <hr>
          <div class="mb-3">
            <div v-for="depProduct in myDepProductName" :key="depProduct.id" class="my-product">
              <p>{{ depProduct }}</p>
              <div class="btns">
                <button class="btn-go-detail" @click="goDetailBtn(depProduct)">상품정보</button>
              </div>
            </div>
            <!-- <hr> -->
          </div>
          <br>
          <br>
          <h5>나의 적금 상품</h5>
          <hr>
          <div class="mb-3">
            <div v-for="savProduct in mySavProductName" :key="savProduct.id" class="my-product">
              <p>{{ savProduct }}</p>
              <div class="btns">
                <button class="btn-go-detail" @click="goDetailBtn(savProduct)">상품정보</button>
              </div>
            </div>
          </div>
          <!-- <hr> -->
        </div>
        
        <div class="my-products-chart">
          <MyProductsChart/>
        </div>
      </div>    
    </div>
    
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { useProductStore } from '@/stores/product'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createPinia } from 'pinia'
import MyProductsChart from '@/components/MyProductsChart.vue'
import axios from 'axios'

const LoginStore = useLoginStore()
const ProductStore = useProductStore()
const router = useRouter()


onMounted(() => {
  // LoginStore.getProfile()
  LoginStore.getMyPdtName()
})

// 내 가입 상품
const myDepProductName = computed(()=>{
    return LoginStore.myDepProductName
  })
  const mySavProductName = computed(()=>{
    return LoginStore.mySavProductName
  })


  // 상품 디테일 페이지로 가기
  const goDetail = ref([])
  const goDetailBtn = function (productName) {
    axios({
      method : 'get',
      url: `${ProductStore.API_URL}/goDetail/${productName}/`,
    })
      .then((res) => {
        console.log(res.data,'여기@')
        goDetail.value = res.data     
        router.push({name:'ProductDetail', params:{type: goDetail.value.type, productId: goDetail.value.productId}}) 
      })
      .catch((err) => {
        console.log(err)
      })
    }


  // 상품 가입 취소
  const isJoined = ref(true)
  const product = ref(null)
  const cancleBtn = function (productName) {
    axios({
      method: 'post',
      url: `${ProductStore.API_URL}/goDetail/${productName}/`,
    })
    .then((res) => {
        console.log(res.data)
        product.value = res.data
        router.push({name:'ProductDetail', params:{type: goDetail.value.type, productId: goDetail.value.productId}}) 
      })
      .catch((err) => {
        console.log(err)
      })
    }

</script>

<style scoped>
.profile {
  width: 90%;
  height: 80%;
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  padding: 50px;
  padding-top: 70px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 3px #333;
}

.my-products {
  margin-bottom: 100px;
}
.my-product {
  margin-left: 5px; 
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-right: 3px;  
}

.my-products-chart {
  height: 70%;
}

.btns {
  width: 150px;
  display: flex;
  flex-direction: row;
}
.btn-go-detail{
  background-color: rgb(154, 219, 137);
  border: none;
  border-radius: 40px;
  width: 90px;
  height: auto;
}
.btn-cancel {
  background-color: var(--sub-color);
  color:aliceblue;
  border: none;
  border-radius: 40px;
  width: 90px;
  height: auto;
}
</style>