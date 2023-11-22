<template>
  <div>
    <h2>Exchange Rate News</h2>
    {{ keyword }}

    <div v-if="titleList">
      <h3>Search Results</h3>
      <ul>
        <li v-for="(title, index) in titleList" :key="index">
          <h4>{{ title }}</h4>
          <a :href="`https://news.google.com/${linkList[index]}`" target="_blank">Read more</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useExchangeStore } from '@/stores/exchange'

const props = defineProps({
  country: String
})

const keyword = ref('')
watch(() => props.country, (newCountry) => {
  // Update the Country and perform the news search
  keyword.value = newCountry
  console.log(keyword.value)
  searchNews()
})

const searchNews = function () {
  console.log('eeee')
  // store.setKeyword(keyword.value)
  store.searchNews(keyword.value)
}

const store = useExchangeStore()
const titleList = computed(() =>{
  return store.searchTitleResults
})

const linkList = computed(() =>{
  return store.searchLinkResults
})

const removeNews = function () {
  store.searchTitleResults = []
  keyword.value = ''
}

// 로드될때, 이전 데이터 지우기
onMounted (() => {
  removeNews()
})


// const { title_list, link_list } = defineProps(['title_list', 'link_list'])








</script>

<style scoped>
li {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>