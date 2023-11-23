<template>
  <div class="news-box">
    <!-- <h2>Exchange Rate News</h2> -->
    <!-- {{ keyword }} -->
    <button @click="searchNews">뉴스 알아보기</button>
    <!-- <h3>Search Results</h3> -->
    <div class="row row-cols-1 row-cols-md-3 g-2 mb-3">
        <div v-for="(title, index) in titleList" :key="index" class="col my-2">
          <div  class="card-body h-100 position-relative">
            <h6 class="card-title">{{ title }}</h6>
            <br>
            <div class="position-absolute bottom-0 end-0 m-2">
              <a :href="`https://news.google.com/${linkList[index]}`" target="_blank" class="text-decoration-none text-body-secondary">Read more</a>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useExchangeStore } from '@/stores/exchange'

const props = defineProps({
  country: String
})

const keyword = ref(null)


watch(() => props.country, (newCountry) => {
  // Update the Country and perform the news search
  keyword.value = newCountry
  console.log(keyword.value)
  searchNews()
})



const searchNews = function () {
  if (props.country) {
    store.searchNews(props.country)
  } else {
    store.searchNews('USD')
  }
  }
  

const store = useExchangeStore()
const titleList = computed(() =>{
  return limitTitle(store.searchTitleResults)
})

const linkList = computed(() =>{
  return store.searchLinkResults
})

const removeNews = function () {
  store.searchTitleResults.value = []
  // keyword.value = null
}

//문자 길이 제한
 const limitTitle = (title, limit = 15) => {
  const newTitle = [];
  if(title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur)
      }
      return acc + cur.length
    }, 0);
    return `${newTitle.join(' ')} ...`
  }
  return title
}



// 로드될때, 이전 데이터 지우기
onMounted (() => {
  removeNews()
})


// const { title_list, link_list } = defineProps(['title_list', 'link_list'])








</script>

<style scoped>

.card-body {
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  background-color: var(--gray-color);
  padding: 10px;
  margin: 10px;
}

.news-box {
  margin-top: 30px;
}


</style>