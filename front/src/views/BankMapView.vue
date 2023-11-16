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
      <option value="은행" selected="selected">모든 은행</option>
      <option v-for="bank in store.bankList" :key="bank" :value="bank">{{ bank }}</option>
    </select>
    <section class="map-container">
      <BankMap :select-gu="selectGu" :select-bank="selectBank"/>
    </section>
    <BankProductList />
  </div>
</template>

<script setup>
import BankMap from '@/components/BankMap.vue'
import BankProductList from '@/components/BankProductList.vue'
import { useMapStore } from '@/stores/map'
import { ref, computed, watch } from 'vue'

const selectDo = ref(null)
const selectGu = ref(null)
const selectBank = ref('은행')
// const GuList = ref(null)

const guLoader = watch(() => selectDo.value, (newValue, old) => {
  if (newValue !== null) {
    console.log(newValue)
    store.guLoader(newValue)
    // GuList.value = store.guList
    // console.log('gu', GuList.value)
  }
})

// const guLoader = computed(() => {
//   if (selectDo.value !== null) {
//     console.log(selectDo.value)
//     store.guLoader(selectDo.value)
//     return store.guList
//   }
// })

// const guLoader = function () {
//   if (selectDo.value !== null) {
//     console.log(selectDo.value)
//     store.guLoader(selectDo.value)
//     return store.guList
//   }
// }


const store = useMapStore()
store.doLoader()


</script>

<style scoped>
.map-container {
  width: 100%;
  height: 70%;
  margin-top: 20px;
}
</style>