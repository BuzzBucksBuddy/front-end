<template>
  <div>
    <h1>Product List View</h1>
    <button @click="isDeposit = !isDeposit">{{ isDeposit ? '적금' : '예금' }}</button>
    <section v-show="isDeposit">
      <DepositProductList
        v-for="product in store.dep_products"
        :key="product.id"
        :product="product"
      />
    </section>
    <section v-show="!isDeposit">
      <SavingProductList
        v-for="product in store.sav_products"
        :key="product.id"
        :product="product"
      />
    </section>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import DepositProductList from '@/components/DepositProductList.vue'
import SavingProductList from '@/components/SavingProductList.vue'

const store = useProductStore()

const isDeposit = ref(true)

onMounted(() => {
  store.getDepProducts()
})

onMounted(() => {
    store.getSavProducts()
  })

</script>

<style scoped>

</style>