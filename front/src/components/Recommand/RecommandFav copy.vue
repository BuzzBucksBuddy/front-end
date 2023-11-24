<template>
  <div class="write" v-if="depOpt">
    <section class="line">
      <div class="underline">
        {{ depOpt.product.fin_prdt_nm }}
      </div>
      <p>에</p>
    </section>
    <section class="line">
      <input type="text" class="money-input" v-model="moneyInput">
      <p>원 저축하면</p>
    </section>
    <section class="line">
      <p>1년에 이자</p>
      <div class="underline">
        {{ interest }}
      </div>
      <p>원 받을 수 있어요.</p>
    </section>
    <section class="line">
      <div class="underline">
        {{ fav.gift }}
      </div>
      <p>{{ fav.end }}</p>
      <div class="underline">
        {{ count }}
      </div>
      <p>개!</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const props = defineProps({
  prod: Object,
  fav: Object,
  price: Number
})

const moneyInput = ref(10000000)
const interest = ref(0)
const count = ref(0)

const watcher = watch(() => (moneyInput.value), (newValue) => {
  interest.value = Math.floor((depOpt.value.intr_rate2 / 100) * moneyInput.value)
  count.value = parseInt(interest.value / props.fav.price)
})

// const returnMoney = computed(() => {
//   interest.value = (depOpt.value.intr_rate2 / 100) * moneyInput.value
// })

// const counter = computed(() => {
//   return parseInt(interest.value / props.fav.price)
// })

const depOpt = ref(null)
const API_URL = 'http://127.0.0.1:8000/api/v1/products'
const getDepOpt = function () {
  axios({
    method: 'get',
    url: `${API_URL}/one-dep-opt/${props.prod.id}/`
  })
    .then((res) => {
      console.log(res.data)
      depOpt.value = res.data
      interest.value = Math.floor((depOpt.value.intr_rate2 / 100) * moneyInput.value)
      console.log('!!!!!!!!!!!!!')
      console.log(interest.value)
      console.log(props.fav)
      console.log(props.fav.price)
      count.value = parseInt(interest.value / props.price)
    })
    .catch((err) => {
      console.log(err.data)
    })
}

getDepOpt()
</script>

<style scoped>
.write {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.underline {
  border-bottom: 8px solid var(--main-color);
  font-size: 28px;
  font-weight: 700;
  margin: 0 4px;
  padding: 0 20px;
  text-align: center;
}
.line {
  display: flex;
  flex-direction: flex-start;
  align-items: baseline;
  margin: 16px 12px;
}
.money-input {
  outline: 0;
  border: 0;
  border-bottom: 8px solid var(--main-color);
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  width: 210px;
}
p {
  font-size: 28px;
  font-weight: 400;
}
</style>