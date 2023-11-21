<template>
  <div>
    <h2>Exchange Rate Calculator</h2>
    <form>
      <select id="select-exchange-rate-category" v-model="category">
        <option
          v-for="exchangeRateCategory in store.exchangeRateCategoryList"
          :key="exchangeRateCategory.id"
          :value="exchangeRateCategory.title"
        >
          {{ exchangeRateCategory.name }}
        </option>
      </select>
      <div>
        <select id="select-country-category" v-model="country" @change="handleCountryChange">
        <option
          v-for="countryCategory in store.countryCategoryList"
          :key="countryCategory.id"
          :value="countryCategory.title"
        >
          {{ countryCategory.name }}
        </option>
      </select>
      <input type="text" v-model="money">
      <span>{{ exchangeUnit }}</span>
      </div>
      <p>{{ exchangeResult }} 원</p>
    </form>
  </div>
</template>
  

<script setup>
import { useExchangeStore } from '@/stores/exchange.js'
import { ref, computed, watch, reactive, nextTick, onUnmounted } from 'vue'

const store = useExchangeStore()
const country = ref(null)
const category = ref(null)
const money = ref(1)
const exchangeResult = ref(0)

const exchangeRate = computed(() => store.exchangeRate)
const exchangeUnit = computed(() => store.exchangeUnit)

// 이 컴포넌트 언마운트될 때, isActive -> false
const isActive = ref(true)
onUnmounted(() => {
  isActive.value = false
})

// watch - deep (어떤 방향으로도 반응함) + nextTick: 
watch(
  () => ({ country: country.value, category: category.value, money: money.value }),
  async ({ country: newCountry, category: newCategory, money: newMoney }) => {
    if ((newCountry !== null && newCategory !== null) || (newMoney !== 1 && (newCountry !== null && newCategory !== null))) {
      await store.getCountryInfo(newCountry, newCategory)
      await nextTick()
      if (isActive.value) {
        if (newCountry === 'JPY(100)' || newCountry === 'IDR(100)') {
          exchangeResult.value = exchangeRate.value * newMoney / 100
        } else {
          exchangeResult.value = exchangeRate.value * newMoney
        }
      }
    }
  },
  { deep: true }
)


// country값 상위 View로 emit
const emit = defineEmits('countryChanged')

const handleCountryChange = () => {
  if (country.value) {
    emit('countryChanged', country.value)
  }
}




// watch(
//   () => [country.value, category.value, money.value],
//   async ([newCountry, newCategory, newMoney]) => {
//     if (newCountry !== null && newCategory !== null) {
//       await store.getCountryInfo(newCountry, newCategory)
//       if (newCountry === 'JPY(100)' || newCountry === 'IDR(100)')  {
//         exchangeResult.value = exchangeRate
//       } else {
//         exchangeResult.value = exchangeRate.value * newMoney
//         console.log('4444')
//       }
//     // console.log(calculate)
//     // exchangeResult.value = calculate
//     }  
//   }
// )




</script>

<style scoped>
form {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>