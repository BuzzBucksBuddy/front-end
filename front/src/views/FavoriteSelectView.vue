<template>
  <div>
    <div v-for="favorite in favoriteCategory">
      <div @click="favoriteSelect(favorite.id)" class="favorite-box" :class="{select: !isSelected, selected: isSelected}">
        <span>{{ favorite.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()
const route = useRoute()
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


const favorite = ref(null)
// 관심사 누른지 확인
const isSelected = computed(() => {
  if (favorite.value === null) {
    return false
  } else {
    if (favorite.value.user_set.includes(store.myId)) {
      return true
    } else {
      return false
    }
  }
})


</script>

<style scoped>
.favorite-box {
  margin: 5px;
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.select {
  background-color: rgb(243, 243, 243);
  transition: background-color 0.3s;
}

.selected {
  background-color: rgb(161, 161, 161);
  transition: background-color 0.3s;
}

</style>