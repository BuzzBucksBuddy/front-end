<template>
  <div>
    <!--메인 페이지 이미지-->
    <div id="title" class="card bg-white text-dark">
      <img id="main" src="@/assets/image/logo.jpg" class="card-img" alt="main">
      <div class="card-img-overlay">
        <p class="card-text">BBB와 함께하는 활기찬 저축 활동</p>
        <div>
          <div class="card-title d-flex"><h1>B</h1><h4 class="align-bottom">uzz</h4></div>
          <div class="card-title d-flex"><h1>B</h1><h4>ucks</h4></div>
          <div class="card-title d-flex"><h1>B</h1><h4>uddy</h4></div>
        </div>
        <div class="dev-length">
          <p>오늘의 예금 {{ DepProductsCount }}개</p> 
          <p>오늘의 적금 {{ SavProductsCount }}개</p> 
        </div>

        <!-- <div id="app">
          <button class="btn-like btn-confetti" @click="onClick">
            <span>🎉</span>
            <span>BBB</span>
          </button>
        </div>
       -->
      </div>
    </div>

    <!--캐러셀-->
    <section class="contents">
      <div id="carousel">
        <div id="carouselExampleDark" class="carousel carousel-dark slide w-100" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <!-- <button v-for="(product, index) in randomDepProducts" :key="product.index" type="button" data-bs-target="#carouselExampleDark" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide '+ index"></button> -->
          </div>
          <div class="carousel-inner">
            <div v-for="(product, index) in randomDepProducts" :key="product.index" class="carousel-item" :class="{ 'active': index === 0 }" data-bs-interval="10000">
              <div class="product-card d-block w-100" height="300px" width="400px">
                <h5>{{ product.kor_co_nm }}</h5>
                <h3>{{ product.fin_prdt_nm }}</h3>
                <h5 v-if="product.spcl_cnd.includes('우대')"><i class="fa-solid fa-circle-up" style="color: #ce225e;"> 우대이율 있음</i></h5>
                <h5 v-else><br></h5>
                <h6 v-if="product.join_way.includes('인터넷' || '스마트폰')"><i class="fa-solid fa-mobile-screen" style="color: #484ef9;"> 비대면 가입 가능</i></h6>
                <h6 v-else><br></h6>
              </div>
            </div>
          </div>
          <div id="carouselExampleDark" class="carousel carousel-dark slide w-100" data-bs-ride="carousel"></div>
          <div class="carousel-indicators">
            <!-- <button v-for="(product, index) in randomDepProducts" :key="product.index" type="button" data-bs-target="#carouselExampleDark" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide ' + index"></button> -->
          </div>
          <div class="carousel-inner">
            <div v-for="product in randomSavProducts" :key="product.index" class="carousel-item" :class="{ 'active': index === 0 }" data-bs-interval="10000">
              <div class="product-card d-block w-100" height="300px" width="400px">
                <h5>{{ product.kor_co_nm }}</h5>
                <h3>{{ product.fin_prdt_nm }}</h3>
                <h5 v-if="product.spcl_cnd.includes('우대')"><i class="fa-solid fa-circle-up" style="color: #ce225e;"> 우대이율 있음</i></h5>
                <h5 v-else><br></h5>
                <h6 v-if="product.join_way.includes('인터넷' || '스마트폰')"><i class="fa-solid fa-mobile-screen" style="color: #484ef9;"> 비대면 가입 가능</i></h6>
                <h6 v-else><br></h6>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="mbti-container">
        <RecommandMbti />
      </div>
    </section>
  
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/product.js'
import RecommandMbti from '@/components/Recommand/RecommandMbti.vue'

const API_URL = 'http://127.0.0.1:8000'
const productStore = useProductStore()

onMounted(async () => {
  await getProductsData();
  await exchangeSave();
  await carouselDepProducts();
  await carouselSavProducts();
});

// 상품/옵션 데이터 저장하기
const DepProductsCount = ref(0)
const SavProductsCount = ref(0)
const getProductsData = function() {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/products/products-data/`
    })
      .then((res) => {
        console.log(res.data,'success!')
        DepProductsCount.value = res.data.deposit_products_count
        SavProductsCount.value = res.data.saving_products_count
      })
      .catch((err) => {
        console.log(err)
      })
  }

// 환율 정보 저장
const exchangeSave = function() {
  axios({
    method: 'get',
    url: `${API_URL}/api/v1/exchanges/save-exchange-rates/`
  })
   .then ((res) => {
    console.log(res)
   })
   .catch((err) => {
    console.log(err)
  })
}

// 예금 랜덤 캐러셀
const randomDepProducts = ref([])
const carouselDepProducts = function() {
  axios({
    method: 'get',
    url: `${API_URL}/api/v1/products/random-product/dep`
  })
   .then ((res) => {
    console.log(res)
    randomDepProducts.value = res.data
   })
   .catch((err) => {
    console.log(err)
  })
}
  

// 적금 랜덤 캐러셀
const randomSavProducts = ref([])
const carouselSavProducts = function() {
  axios({
    method: 'get',
    url: `${API_URL}/api/v1/products/random-product/sav`
  })
   .then ((res) => {
    console.log(res)
    randomSavProducts.value = res.data
   })
   .catch((err) => {
    console.log(err)
  })
}


// const MBTI

// // 터지기 반응형
// const onClick = () => {
//   generateConfetti()
// }

// const generateConfetti = () => {
//   confetti({
//     particleCount: 100,
//     spread: 50,
//   })
// }

// const onClick = () => {
//   confetti({
//     particleCount: 150,
//     spread: 60,
//   })
// }


</script>

<style scoped>
.contents {
  display: flex;
  justify-content: space-between;
}
#title {
  margin-top: 20px;
}

#main {
  margin: auto;
  padding: 130px;
  display: block;
  width: 600px;
  height: 400px;
}

#carousel {
  margin: auto;
  padding-top: 30px;
  width: 450px;
  height: 300px;
}


/* 반응형 */
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 999;
}

body {
  background-color: #f5f8ff;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.btn-like {
  cursor: pointer;
  font: inherit;
  margin: 0;
  padding: 0;
}

.btn-confetti {
  background-color: #404663;
  color: #fff;
  border: 0;
  font-size: 2rem;
  font-weight: 400;
  padding: 0.5em 1.25em;
  border-radius: 0.5em;
  z-index: 999;
  position: relative;
  display: flex;
  gap: 0.5em;
  box-shadow:
    0px 1.7px 2.2px rgba(0, 0, 0, 0.02),
    0px 4px 5.3px rgba(0, 0, 0, 0.028),
    0px 7.5px 10px rgba(0, 0, 0, 0.035),
    0px 13.4px 17.9px rgba(0, 0, 0, 0.042),
    0px 25.1px 33.4px rgba(0, 0, 0, 0.05),
    0px 60px 80px rgba(0, 0, 0, 0.07);
}

/* .btn-confetti:active {
  transform: scale(1.01);
} */

.btn-confetti:hover {
  transform: scale(1.01);
}

.product-card {
  padding-top: 30px;
  height: 200px;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  text-align: center;
  /* align-items: center; */
  border: 5px solid var(--gray-color);
  background-color: var(--gray-color);
}

.mbti-container {
  border: 4px solid var(--gray-color);
  border-radius: 30px;
  padding: 0 16px;
  width: 600px;
}

</style>