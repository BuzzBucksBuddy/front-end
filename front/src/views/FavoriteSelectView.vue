<template>
  <div>
    <label for="favorite">favorite: </label>
    <div v-for="favorite in favoriteCategory">
      <input type="checkbox" :id="favorite.id" :value="favorite.id" v-model="myfavorite"> <label :for="favorite.id">{{ favorite.favorite }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSignupStore } from '@/stores/signup'

const store = useSignupStore()
const myfavorite = ref([])

onMounted(() => {
  store.getFavoriteCategory()
})



const favoriteCategory = computed(() => {
  console.log(store.favoriteCategory)
  return store.favoriteCategory
})



// if (myfavorite.value.length > 0) {
  //   console.log(myfavorite.value)
  //   formData.append('favorite', myfavorite.value)
  // }



</script>

<style scoped>

</style>