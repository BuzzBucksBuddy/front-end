<template>
  <div>
    <h1>Article List View</h1>
    <RouterLink :to="{ name: 'ArticleCreate' }">[게시글 만들기]</RouterLink>
    <hr>
    <section v-if="isExist">
      <ArticleList
        v-for="article in store.articles"
        :key="article.id"
        :article="article"
      />
    </section>
    <section v-else>
      <p>게시글이 존재하지 않습니다</p>
    </section>
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue'
import { useArticleStore } from '@/stores/article'
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'

const store = useArticleStore()
store.getArticles()

const isExist = computed(() =>{
  return store.isExist(store.articles)
})
</script>

<style scoped>

</style>