<template>
  <div>
    <!-- <h2>Exchange Rate Calculator</h2> -->
    <form>
      <div>
        
          <select id="select-exchange-rate-category" v-model="category" class="form-select rate-category" aria-label="Default select example">
            <!-- <option disabled selected>환율 유형</option> -->
            <option
              v-for="exchangeRateCategory in store.exchangeRateCategoryList"
              :key="exchangeRateCategory.id"
              :value="exchangeRateCategory.title"
              
            >
              {{ exchangeRateCategory.name }}
            </option>
          </select>
      </div>
      
      <div class="country-category" >
        <select id="select-country-category" v-model="country" @change="handleCountryChange"  class="form-select" aria-label="Default select example">
          <!-- <option value="국가" disabled selected>국가</option> -->
          <option
          v-for="countryCategory in store.countryCategoryList"
          :key="countryCategory.id"
          :value="countryCategory.title"
          >
            {{ countryCategory.name }}
          </option>
        </select>
      
        <input type="text" v-model="money">
        <p>{{ exchangeUnit }}</p>
    
      </div>
      
      
      <p class="exchange-result">{{ exchangeResult }} 원</p>
    </form>
  </div>
</template>
  
<script setup>
import { useExchangeStore } from '@/stores/exchange.js'
import axios from 'axios'
import { ref, watch, nextTick, onMounted, computed } from 'vue'


const store = useExchangeStore()
const country = ref('USD')
const category = ref('deal_bas_r')
const money = ref(1)
const exchangeResult = ref(0)
// const exchangeRate = ref(null)


const isActive = ref(true)
const exchangeUnit = computed(() => store.exchangeUnit)
const exchangeRate = computed(() => store.exchangeUnit)

// const exchangeRate = computed(() => {
//   if (store.exchangeRate !== null) {
    
//   }
//   store.getCountryInfo(country.value, category.value)
//   return store.exchangeRate
// })
const baseRate = ref(0)
onMounted(() => {
  getCountryInfo(country.value, category.value)
  
  
  // console.log(country.value)
  // console.log(store.exchangeRate)
//   const baseValue = computed(()=> {
//   // console.log(store.exchangeRate)
//   return exchangeRate * 1
// exchangeResult.value = exchangeRate.value
// })

})

// const exchangeUnit = ref('달러')
const getCountryInfo =function(country, category) {
    axios({
      method: 'get',
      url: `${store.API_URL}/api/v1/exchanges/${country}/${category}/`
    })
      .then((res) => {
        console.log(res,'ddd')
        exchangeRate.value = Number(res.data.rate)
        exchangeUnit.value = res.data.unit
        
      })
      .catch((err) => {
        console.log(err)
      })
  }

// const getBase = function () {
//   country.value = null
//   category.value = null
// }


// const removeContent = function () {
//   country.value = null
//   category.value = null
//   store.exchangeUnit = null
//   exchangeResult.value = '0'
// }

watch(
  () => ({ country: country.value, category: category.value, money: money.value }),
   ({ country: newCountry, category: newCategory, money: newMoney }) => {
    if (newCountry !== 'USD' || newCategory !== 'deal_bas_r' || newMoney !== 1) {
      updateExchangeResult()
    }
  },
  { deep: true }
);

const updateExchangeResult =  () => {
  store.getCountryInfo(country.value, category.value)
  nextTick()
  if (isActive.value) {
    if (country.value === 'JPY(100)' || country.value === 'IDR(100)') {
      exchangeResult.value = (store.exchangeRate * money.value / 100).toFixed(2)
    } else {
      exchangeResult.value = (store.exchangeRate * money.value).toFixed(2)
      
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
  /* width: 90%; */
  /* width: 700px; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  /* border: 1px solid rgb(123, 153, 252); */
  padding: 10px;
  flex-wrap: nowrap;
}

.rate-category {
  background-color: var(--main-color);
  border: 2px solid var(--sub-color);
  /* width: 130px; */
  width: 25%;
  height: 40px;
  border-radius: 20px;
  margin-left: 8px;
}
.country-category {
  /* height: 0px; */
  display: flex;
  justify-content: space-around;
  /* flex-wrap: nowrap; */
  align-items: center;
  /* vertical-align: center; */
  gap: 5px;
  margin: 10px;
}

.country-category > select {
  border: 2px solid var(--sub-color);
  width: 30%;
  height: 60px;
}

input {
  border: 2px solid var(--sub-color);
  height: 60px;
  width: 50%;
  /* width: 70%; */
  text-align: right;
  border-radius: 5px;
  
}

.country-category > p {
  height: 60px;
  width: 20%;
}

.exchange-result {
  margin-left: 10px;
  border: 3px dashed var(--gray-color);
  text-align: end;
  font-size: 3rem;
}

</style>