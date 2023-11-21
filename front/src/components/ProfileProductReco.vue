<template>
  <div>
    <h1>Profile Product Recommandation</h1>
    <button @click="usersFavorite">user favorite 보내기</button>
    <div>
      <h4>관심사 같은 사람들 추천</h4>
      <h5>예금 랭킹</h5>
      <div v-for="depProduct in store.depLankfromFavorite">
        <p>{{ depProduct.id }}</p>
      </div>
      <h5>적금 랭킹</h5>
      <div v-for="savProduct in store.savLankfromFavorite">
        <p>{{ savProduct.id }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useLoginStore()
const route = useRoute()


const myProfile = computed(()=>{
  return store.myProfile
})

const usersFavorite = function () {
  let favoriteId = null
  const myfavoritesArr = myProfile.value.favorite
  if ( myfavoritesArr ) {
    let myfavorites = []
    myProfile.value.favorite.forEach(element => {
      myfavorites.push(element.id)
      const randomFavoriteId = Math.floor(Math.random() * myfavorites.length)
      // console.log(myfavorites[favoriteId])
      favoriteId = myfavorites[randomFavoriteId]
      // console.log(myProfile.value.favorite[1].favorite)
    })
  }
  // console.log(favoriteId)
  store.usersFavorite(favoriteId)
}



</script>

<style scoped>

</style>