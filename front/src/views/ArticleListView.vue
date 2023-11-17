<template>
  <div>
    <h1>Article List View</h1>
    {{ store.articles }}
    <RouterLink :to="{ name: 'ArticleCreate' }">[CREATE]</RouterLink>
    <hr>
    <ArticleList
      v-for="article in store.articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue'
import { useArticleStore } from '@/stores/article'
import { RouterLink } from 'vue-router'

const store = useArticleStore()
store.getArticles()
</script>

<style scoped>

</style>