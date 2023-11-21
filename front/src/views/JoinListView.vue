<template>
    <div>
      <h1>가입한 상품 목록</h1>
      <div v-if="joinedItems">
        <div v-for="product in joinedItems" :key="product.id">
          <p>{{ product.kor_co_nm }} - {{ product.fin_prdt_nm }}</p>
          <button @click="goDetail(product)">상품 상세</button>
          <button @click="removeList(product)">가입 취소</button>
          <hr>
        </div>
      </div>
      <div v-else>
        <strong>가입한 상품이 없습니다.</strong>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const joinedItems = ref(null)

joinedItems.value = JSON.parse(localStorage.getItem('join'))

const goDetail = (product) => {
    router.push(`/${product.id}`)
}

const removeList = (product) => {
    const itemIdx = joinedItems.value.findIndex((item) => item.id === product.id)

    joinedItems.value.splice(itemIdx, 1)

    localStorage.setItem('join', JSON.stringify(joinedItems.value))
}
</script>

<style scoped>

</style>