<template>
  <div>
    <form @submit.prevent="favoriteSelect">
      <label for="favorite">favorite: </label>
      <div v-for="favorite in favoriteCategory">
        <input type="checkbox" :id="favorite.id" :value="favorite.id" v-model="myfavorite"> <label :for="favorite.id">{{ favorite.favorite }}</label>
      </div>
      <button>👍이런 거 좋아함</button>
    </form>
    {{ myfavorite }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()
const myfavorite = ref([])

onMounted(() => {
  store.getFavoriteCategory()
})


const favoriteCategory = computed(() => {
  return store.favoriteCategory
})


// 관심사 저장
const favoriteSelect = function () {
  const payload = {
    favorite: myfavorite.value.map(id => ({ id }))
  }
  console.log(payload)
  store.favoriteSelect(payload)
}

// if (myfavorite.value.length > 0) {
  //   console.log(myfavorite.value)
  //   formData.append('favorite', myfavorite.value)
  // }



</script>

<style scoped>

</style>