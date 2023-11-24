<template>
  <div class="container">
    <!-- <div id="title" class="card bg-white text-dark">
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
      </div>
    </div> -->
    <img src="@/assets/svg/main_2.svg" alt="">

    <!--캐러셀-->
    <div id="carousel">
      <div id="carouselExampleDark" class="carousel carousel-dark slide w-100" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button v-for="(product, index) in randomDepProducts" :key="product.index" type="button" data-bs-target="#carouselExampleDark" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide '+ index"></button>
        </div>
        <div class="carousel-inner">
          <div v-for="(product, index) in randomDepProducts" :key="product.index" class="carousel-item" :class="{ 'active': index === 0 }" data-bs-interval="10000">
            <div class="product-card d-block w-100" height="300px" width="400px">
              <h5>{{ product.kor_co_nm }}</h5>
              <h3>{{ product.fin_prdt_nm }}</h3>
              <h4 v-if="product.spcl_cnd.includes('우대')"><i class="fa-solid fa-circle-up" style="color: #ce225e;">우대이율 있음</i></h4>
            </div>
          </div>
        </div>
        <div id="carouselExampleDark" class="carousel carousel-dark slide w-100" data-bs-ride="carousel"></div>
        <div class="carousel-indicators">
          <button v-for="(product, index) in randomDepProducts" :key="product.index" type="button" data-bs-target="#carouselExampleDark" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide ' + index"></button>
        </div>
        <div class="carousel-inner">
          <div v-for="product in randomSavProducts" :key="product.index" class="carousel-item" :class="{ 'active': index === 0 }" data-bs-interval="10000">
            <div class="product-card d-block w-100" height="300px" width="400px">
              <h5>{{ product.kor_co_nm }}</h5>
              <h3>{{ product.fin_prdt_nm }}</h3>
              <h4 v-if="product.spcl_cnd.includes('우대')"><i class="fa-solid fa-circle-up" style="color: #ce225e;"> 우대이율 있음</i></h4>
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
    <!-- <div id="carousel">
      <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
            <img src="@/assets/image/img01.jpg" class="d-block w-100" alt="..." height="300px" width="400px">
            <div class="carousel-caption d-none d-md-block">
                <h5>상품 1</h5>
                <p>상품 설명을 적어 보아요~</p>
            </div>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
            <img src="@/assets/image/img02.jpg" class="d-block w-100" alt="..." height="300px" width="400px">
            <div class="carousel-caption d-none d-md-block">
                <h5>상품 2</h5>
                <p>상품 설명을 적어 보아요~</p>
            </div>
            </div>
            <div class="carousel-item">
            <img src="@/assets/image/white.jpg" class="d-block w-100" alt="..." height="300px" width="400px">
            <div class="carousel-caption d-none d-md-block">
                <h5>상품 3</h5>
                <p>상품 설명을 적어 보아요~</p>
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
    </div> -->
    
    <!--내 MBTI별 상품가입순 -->
    <div class="mbti-container">
      <h2>{{ mbti }}들은 이걸 가입했어요</h2>

      
    </div>
  
  
  
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/product.js'

const API_URL = 'http://127.0.0.1:8000'
const productStore = useProductStore()


// onMounted(()=> {
//   getProductsData()
//   // exchangeSave()
//   carouselDepProducts()
//   carouselSavProducts()
//   // 반응형
//   setInterval(() => {
//     generateConfetti()
//   }, 5000)

// })


// onMounted(() => {
//   getProductsData()
//   exchangeSave()
//     .then(() => carouselDepProducts())
//     .then(() => carouselSavProducts())
//     .setInterval(() => { generateConfetti()}, 5000)
//     .catch((error) => {
//       console.error(error);
//     })
// })

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
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 50%;
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
  height: 200px;
  text-align: center;
  border: 5px solid var(--gray-color);
  background-color: var(--gray-color);
}

.mbti-container {
  background-color: var(--gray-color);
  border-radius: 30px;
}

</style>