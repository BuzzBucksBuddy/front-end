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
      <span>{{ store.exchangeUnit }}</span>
      </div>
      <p>{{ exchangeResult }} 원</p>
    </form>
  </div>
</template>
  

<script setup>
import { useExchangeStore } from '@/stores/exchange.js'
import { ref, computed, watch } from 'vue'

const store = useExchangeStore()
const country = ref(null)
const category = ref(null)
const money = ref(1)

const exchangeResult = ref(0)
const calculate = function(country, money) {
  if (country = ('JPY(100)' || 'IDR(100)')) {
      exchangeResult.value = store.exchangeRate * money / 100
    } else {
      exchangeResult.value = store.exchangeRate * money
    }
}

watch(
  () => [country.value],(newCountry) => {
    store.getCountryInfo(newCountry)
  }
)


watch(
  () => [category.value],(newCategory) => {
    if ((newCountry && newCategory ) !== null) {
    store.getCountryInfo(newCountry, newCategory)
    if (newCountry = ('JPY(100)' || 'IDR(100)')) {
      exchangeResult.value = store.exchangeRate * newMoney / 100
    } else {
      exchangeResult.value = store.exchangeRate * newMoney
    }
    }  
  }
)


watch(
  () => [money.value],(newMoney) => {
    if ((newCountry && newCategory ) !== null) {
    store.getCountryInfo(newCountry, newCategory)
    if (newCountry = ('JPY(100)' || 'IDR(100)')) {
      exchangeResult.value = store.exchangeRate * newMoney / 100
    } else {
      exchangeResult.value = store.exchangeRate * newMoney
    }
    }  
  }
)

// watch(
//   () => [country.value, category.value, money.value],
//   ([newCountry, newCategory, newMoney]) => {
//     if ((newCountry && newCategory ) !== null) {
//     store.getCountryInfo(newCountry, newCategory)
//     if (newCountry = ('JPY(100)' || 'IDR(100)')) {
//       exchangeResult.value = store.exchangeRate * newMoney / 100
//     } else {
//       exchangeResult.value = store.exchangeRate * newMoney
//     }
//     }  
//   }
// )


const emit = defineEmits('countryChanged')

const handleCountryChange = () => {
  if (country.value) {
    emit('countryChanged', country.value)
  }
}



</script>

<style scoped>
form {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>