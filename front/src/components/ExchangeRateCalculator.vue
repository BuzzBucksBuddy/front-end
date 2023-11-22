<template>
  <div>
    <h2>Exchange Rate Calculator</h2>
    <form>
      <select id="select-exchange-rate-category" v-model="category">
        <!-- <option value="환율 유형" disabled selected>환율 유형</option> -->
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
          <option value="국가" disabled selected>국가</option>
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
import { ref, watch, nextTick, onMounted, computed } from 'vue'

const store = useExchangeStore()
const country = ref('미국')
const category = ref('매매기준율')
const money = ref(1)
const exchangeResult = ref(0)

const exchangeRate = computed(() => store.exchangeRate)
const exchangeUnit = computed(() => store.exchangeUnit)

const isActive = ref(true)

onMounted(() => {
  // getBase()
  removeContent()
  updateExchangeResult()
})


const getBase = function () {
  country.value = null
  category.value = null
}


const removeContent = function () {
  country.value = null
  category.value = null
  store.exchangeUnit = null
  exchangeResult.value = '0'
}

watch(
  () => ({ country: country.value, category: category.value, money: money.value }),
  async ({ country: newCountry, category: newCategory, money: newMoney }) => {
    if (newCountry !== null || newCategory !== null || newMoney !== 1) {
      updateExchangeResult();
    }
  },
  { deep: true }
);

const updateExchangeResult =  () => {
  store.getCountryInfo(country.value, category.value)
  nextTick()
  if (isActive.value) {
    if (country.value === 'JPY(100)' || country.value === 'IDR(100)') {
      exchangeResult.value = (exchangeRate.value * money.value / 100).toFixed(2)
    } else {
      exchangeResult.value = (exchangeRate.value * money.value).toFixed(2)
      
    }
  }
}

const emit = defineEmits('countryChanged')
const handleCountryChange = () => {
  if (country.value) {
    emit('countryChanged', country.value)
  }
}


</script>



<!-- <script setup>
import { useExchangeStore } from '@/stores/exchange.js'
import { ref, computed, watch, reactive, nextTick, onUnmounted, onMounted } from 'vue'

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
    if (newCountry !== null || newCategory !== null || newMoney !== 1) {
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
// watch(
//   () => ({ country: country.value, category: category.value, money: money.value }),
//   async ({ country: newCountry, category: newCategory, money: newMoney }) => {
//     if ((newCountry !== null && newCategory !== null) || (newMoney !== 1 && (newCountry !== null && newCategory !== null))) {
//       await store.getCountryInfo(newCountry, newCategory)
//       await nextTick()
//       if (isActive.value) {
//         if (newCountry === 'JPY(100)' || newCountry === 'IDR(100)') {
//           exchangeResult.value = exchangeRate.value * newMoney / 100
//         } else {
//           exchangeResult.value = exchangeRate.value * newMoney
//         }
//       }
//     }
//   },
//   { deep: true }
// )


// country값 상위 View로 emit
const emit = defineEmits('countryChanged')

const handleCountryChange = () => {
  if (country.value) {
    emit('countryChanged', country.value)
  }
}



</script> -->

<style scoped>
form {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>