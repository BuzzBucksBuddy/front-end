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
import { ref, watch, computed } from 'vue'
import { useExchangeStore } from '@/stores/exchange'

const keyword = ref('')
// const titleList = ref([])
// const linkList = ref([])
const store = useExchangeStore()

const props = defineProps({
  country: String
})

// const { title_list, link_list } = defineProps(['title_list', 'link_list'])


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

const titleList = computed(() =>{
  return store.searchTitleResults
})
const linkList = computed(() =>{
  return store.searchLinkResults
})


</script>

<style scoped>
li {
  border: 1px solid rgb(123, 153, 252);
  padding: 10px;
}

</style>