<template>
  <div class="favorite-container">
    <h2>관심사를 선택해주세요</h2>
    <section id="favorite-section">
      <div
        v-for="favorite in favoriteCategory"
        :key="favorite.id"
        @click="favoriteSelect(favorite.id)"
        class="favorite-box"
        :class="{'selected': isIn(favorite.id)}"
      >
        <p>{{ favorite.content }}</p>
      </div>
    </section>
    <button class="submit-btn" @click="submitFavorite">확인</button>
    <!-- <div>{{ store.myProfile }}</div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()
const route = useRoute()
const router = useRouter()

const isIn = computed(() => {
  return (id) => myfavorite.value.includes(id)
})

const emit = defineEmits('doUpdate')
const selectedId = ref(null)
const myfavorite = ref([])

if (store.isLogin === true) {
  store.myProfile.favorite.forEach((item) => {
    myfavorite.value.push(item.id)
  })
}

const selectPush = function (id) {
  const idx = myfavorite.value.indexOf(id)
  console.log(idx)
  if (idx === -1) {
    myfavorite.value.push(id)
  } else {
    myfavorite.value.splice(idx, 1)
  }
}

const selectId = (id) => {
  selectId.value = id
}

const favoriteCategory = computed(() => {
  return store.favoriteCategory
})


// 관심사 저장
const favoriteSelect = function (favoriteId) {
  store.favoriteSelect(favoriteId)
  selectPush(favoriteId)
}

const submitFavorite = function () {
  emit('doUpdate')
}
</script>

<style>
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
  background-color: var(--gray-color);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s;
  font-weight: 600;
}
.selected {
  background-color: var(--main-color);
}
.favorite-box:hover {
  background-color: var();
}
#favorite-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 8px;
  overflow-y: scroll;
}
#favorite-section::-webkit-scrollbar {
  display: none;
}
.submit-btn {
  margin-top: 12px;
  width: 280px;
  height: 48px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.5s;
  background-color: var(--main-color);
  font-size: 18px;
  font-weight: 700;
}
.submit-btn:hover {
  background-color: var(--sub-color);
  color: white;
}
h2 {
  font-size: 24px;
}
</style>