<template>
  <div class="favorite-container">
    <h2>관심사를 선택해주세요</h2>
    <section id="favorite-section">
      <div v-for="favorite in favoriteCategory">
        <div @click="favoriteSelect(favorite.id)" class="favorite-box" :class="{select: !isSelected, selected: isSelected}">
          <span>{{ favorite.content }}</span>
        </div>
      </div>
    </section>
    <button class="submit-btn" @click="submitFavorite">확인</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()
const route = useRoute()
const router = useRouter()
// const myfavorite = ref([])

onMounted(() => {
  store.getFavoriteCategory()
})


const favoriteCategory = computed(() => {
  return store.favoriteCategory
})


// 관심사 저장
const favoriteSelect = function (favoriteId) {
  store.favoriteSelect(favoriteId)
}

const submitFavorite = function () {
  router.push({ name: 'Profile'})
}
</script>

<style>
.selected {
  background-color: orange;
}
.favorite-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.favorite-box {
  cursor: pointer;
  width: 280px;
  height: 48px;
  background-color: rgb(236, 236, 236);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s;
}
.favorite-box:hover {
  background-color: orange;
}
#favorite-section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 8px;
  overflow-y: scroll;
}
.submit-btn {
  margin-top: 12px;
  width: 280px;
  height: 48px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.5s;
  background-color: rgb(255, 226, 165);
  font-size: 18px;
  font-weight: 700;
}
.submit-btn:hover {
  background-color: rgb(255, 210, 114);
}
</style>