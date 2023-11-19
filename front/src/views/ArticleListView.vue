<template>
  <div>
    <div class="title">
      <h1>게시판 목록</h1>
      <RouterLink :to="{ name: 'ArticleCreate' }">게시글 작성</RouterLink>
    </div>
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
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
hr {
  margin: 0;
}
.title a {
  text-decoration: none;
  color: black;
}
.title a:hover {
  color: rgb(242, 185, 60);
}
</style>