<template>
  <div class="bank-card">
    <h4>{{ products.fin_prdt_nm }}</h4>
  </div>
</template>

<script setup>
const props = defineProps({
  products: Object
})
</script>

<style scoped>
.bank-card {
  height: 60px;
  border: 1px solid var(--gray-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  transition: background-color 0.5s;
  margin: 8px 0;
}
h4 {
  margin: 0;
  font-size: 16px;
}
.bank-card:hover {
  background-color: var(--main-color);
  cursor: pointer;
}
</style>