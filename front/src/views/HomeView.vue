<template>
  <div>
    <!--메인 페이지 이미지-->
    <div id="title" class="card bg-white text-dark">
      <img id="main" src="@/assets/image/logo.jpg" class="card-img" alt="main">
      <div class="card-img-overlay">
        <p class="card-text">BBB와 함께하는 활기찬 저축 활동</p>
        <h4 class="card-title">Buzz</h4>
        <h4 class="card-title">Bucks</h4>
        <h4 class="card-title">Buddy</h4>
      </div>
    </div>

    <!--캐러셀-->
    <div id="carousel">
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
    </div>
  </div>
</template>

<script setup>
<<<<<<< front/src/views/HomeView.vue
import axios from 'axios'
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/product.js'

const API_URL = 'http://127.0.0.1:8000'
const productStore = useProductStore()


onMounted(()=> {
  productStore.getProductsData()
  exchangeSave()
})

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
  

</script>

<style scoped>
#title {
  margin-top: 20px;
}

#main {
  margin: auto;
  padding: 130px;
  display: block;
  width: 600px;
  height: 500px;
}

#carousel {
  margin: auto;
  padding-top: 30px;
  width: 450px;
  height: 300px;
}
</style>