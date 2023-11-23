<template>
  <div>
    <section class="selections">
      <select name="dos" id="do" v-model="selectDo">
        <option :value="null" selected disabled>선택해 주세요</option>
        <option v-for="dos in store.doList" :key="dos.code" :value="dos.code">{{ dos.name }}</option>
      </select>
      <select name="gus" id="gu" v-model="selectGu">
        <option :value="null" selected disabled>선택해 주세요</option>
        <option v-for="gus in store.guList" :key="gus.code" :value="gus.name">{{ gus.name }}</option>
      </select>
      <select name="bank" id="bank" v-model="selectBank">
        <option value="은행" selected="selected">모든 은행</option>
        <option v-for="bank in articleStore.bankCategories" :key="bank" :value="bank.name">{{ bank.name }}</option>
      </select>
      <h2>{{ selectBank }} 어디에 있을까요?</h2>
    </section>
    <section class="container">
      <div class="map-container">
        <BankMap :select-gu="selectGu" :select-bank="selectBank"/>
      </div>
      <div class="bank-container">
        <div class="selector">
          <h3 :class="['prod-toggle', { selected: switcher}]" @click="switcher=true">예금</h3>
          <h3 :class="['prod-toggle', { selected: !switcher}]" @click="switcher=false">적금</h3>
        </div>
        <section class="bank-items" v-show="switcher">
          <div v-if="depLen">
            <BankDepositProductList
              v-for="product in store.depList"
              :key="product.id"
              :products="product"
            />
          </div>
          <div v-else>해당 은행의 예금 상품이 없습니다</div>
        </section>
        <section class="bank-items" v-show="!switcher">
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
const selectBank = ref('은행')
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
  }
})

const store = useMapStore()
const articleStore = useArticleStore()

onMounted(() => {
  store.doLoader()
  articleStore.setBankCategories()
  articleStore.getBankCategories()
  store.getAllDepositProducts()
  store.getAllSavingProducts()
})

bankList.value = articleStore.bankCategories

const bankWatcher = watch(() => selectBank.value, (newValue, old) => {
  if (newValue === '은행') {
    store.getAllDepositProducts()
    store.getAllSavingProducts()
  } else {
    store.getDepositProducts(newValue)
    store.getSavingProducts(newValue)
  }
})

</script>

<style scoped>
.container {
  display: flex;
  height: 700px;
  gap: 20px;
  margin-top: 12px;
}
.map-container {
  width: 50%;
  height: 700px;
  border: 3px solid black;
}
.bank-container {
  height: 700px;
  width: 50%;
  padding: 0;
}
.bank-items {
  height: 644px;
  overflow-y: scroll;
  padding: 0 10px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
}
.selected {
  color: var(--sub-color);
  background-color: var(--main-color);
  border: 2px solid var(--sub-color);
}
.selector {
  display: flex;
  align-items: baseline;
}
.selector h3 {
  margin-left: 10px;
  transition: all 0.3s;
  cursor: pointer;
}
.selector h3:hover {
  color: var(--sub-color);
  color: white;
}
h2 {
  text-align: center;
  margin-top: 12px;
  margin-bottom: 0;
  margin-left: 12px;
  font-size: 32px;
  font-weight: 700;
}
select {
  outline: 0;
  height: 48px;
  width: 200px;
  border: 2px solid black;
  border-radius: 24px;
  background-color: var(--main-color);
  margin-right: 12px;
}

.selections {
  margin: 24px 0;
}
select {
  padding-left: 12px;
  font-weight: 700;
  margin: 8px 4px;
  cursor: pointer;
}
.prod-toggle {
  width: 120px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.prod-toggle:hover {
  background-color: var(--sub-color);
}
</style>