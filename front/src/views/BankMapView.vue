<template>
  <div>
    <h1>Bank Map View</h1>
    <select name="dos" id="do" v-model="selectDo">
      <option :value="null" selected disabled>--선택하세요--</option>
      <option v-for="dos in store.doList" :key="dos.code" :value="dos.code">{{ dos.name }}</option>
    </select>
    <select name="gus" id="gu" v-model="selectGu">
      <option :value="null" selected disabled>--선택하세요--</option>
      <option v-for="gus in store.guList" :key="gus.code" :value="gus.name">{{ gus.name }}</option>
    </select>
    <select name="bank" id="bank" v-model="selectBank">
      <option value="모든 은행" selected="selected">모든 은행</option>
      <option v-for="bank in articleStore.bankCategories" :key="bank" :value="bank.name">{{ bank.name }}</option>
    </select>
    <section class="map-container">
      <BankMap :select-gu="selectGu" :select-bank="selectBank"/>
    </section>
    <h2>{{ selectBank }}</h2>
    <h3 :class="{ selected: switcher}" @click="switcher=true">
      예금
    </h3>
    <h3 :class="{ selected: !switcher}" @click="switcher=false">적금</h3>
    <section v-show="switcher">
      <div v-if="depLen">
        <BankDepositProductList
          v-for="product in store.depList"
          :key="product.id"
          :products="product"
        />
      </div>
      <div v-else>해당 은행의 예금 상품이 없습니다</div>
    </section>
    <section v-show="!switcher">
      <div v-if="savLen">
        <BankSavingProductList
          v-for="product in store.savList"
          :key="product.id"
          :products="product"
        />
      </div>
      <div v-else>해당 은행의 적금 상품이 없습니다</div>
    </section>
  </div>
</template>

<script setup>
import BankMap from '@/components/BankMap.vue'
import BankDepositProductList from '@/components/BankDepositProductList.vue'
import BankSavingProductList from '@/components/BankSavingProductList.vue'
import { useMapStore } from '@/stores/map'
import { useArticleStore } from '@/stores/article'
import { ref, computed, watch, onMounted } from 'vue'

const selectDo = ref(null)
const selectGu = ref(null)
const selectBank = ref('모든 은행')
const bankList = ref(null)

const switcher = ref(true)

const depLen = computed(() => {
  return store.depList.length > 0
})

const savLen = computed(() => {
  return store.savList.length > 0
})

const guLoader = watch(() => selectDo.value, (newValue, old) => {
  if (newValue !== null) {
    store.guLoader(newValue)
    // GuList.value = store.guList
    // console.log('gu', GuList.value)
  }
})

const store = useMapStore()
const articleStore = useArticleStore()

onMounted(() => {
  store.doLoader()
  articleStore.setBankCategories()
  articleStore.getBankCategories()
  bankList.value = articleStore.bankCategories
  store.getAllDepositProducts()
  store.getAllSavingProducts()
})

const bankWatcher = watch(() => selectBank.value, (newValue, old) => {
  if (newValue === '모든 은행') {
    store.getAllDepositProducts()
    store.getAllSavingProducts()
  } else {
    store.getDepositProducts(newValue)
    store.getSavingProducts(newValue)
  }
})

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 70%;
  margin-top: 20px;
}
.selected {
  color: orange;
}
</style>