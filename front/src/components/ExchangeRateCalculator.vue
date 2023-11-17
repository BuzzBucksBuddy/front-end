<template>
  <div>
    <h3>Exchange Rate Calculator</h3>
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
        <select id="select-country-category" v-model="country">
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
      <button>조회</button>
      </div>
    </form>
    <p>{{ exchangeResult }} 원</p>
  </div>
</template>
  

<script setup>
import { useExchangeStore } from '@/stores/exchange.js'
import { ref, computed, watch } from 'vue'

const store = useExchangeStore()
const country = ref(null)
const category = ref(null)
const money = ref(0)

const exchangeResult = ref(0)
watch(
  () => [country.value, category.value, money.value],
  ([newCountry, newCategory, newMoney]) => {
    if (newCountry || newCategory || newMoney === (null || 0)) {
    store.getCountryInfo(newCountry, newCategory)
    exchangeResult.value = store.exchangeRate * newMoney
    }  
  }
)



</script>

<style scoped>
form {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>