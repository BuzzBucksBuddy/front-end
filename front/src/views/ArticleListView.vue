<template>
  <div>
    <div class="title">
      <h1>게시판 목록</h1>
      <RouterLink :to="{ name: 'ArticleCreate' }">게시글 작성</RouterLink>
    </div>
    <div class="searcher">
      <select name="product" id="product" v-model="selectProduct">
        <option :value="0">모든 글</option>
        <option v-for="product in store.productCategories" :key="product" :value="product.id">{{ product.name }}</option>
      </select>
      <select name="bank" id="bank" v-model="selectBank">
        <option :value="0">모든 은행</option>
        <option v-for="bank in store.bankCategories" :key="bank" :value="bank.id">{{ bank.name }}</option>
      </select>
      <form>
        <input type="text" v-model="searchInput">
        <input type="submit" value="검색">
      </form>
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
import { ref, computed, watch, onMounted } from 'vue'

const selectBank = ref(0)
const selectProduct = ref(0)

const searchInput = ref(null)

const store = useArticleStore()

const getArticles = watch(() => [selectProduct.value, selectBank.value], ([newProduct, newBank]) => {
  store.getFilteredArticles(newProduct, newBank)
})

const isExist = computed(() =>{
  return store.isExist(store.articles)
})

onMounted(() => {
  store.getBankCategories()
  store.getProductCategories()
  store.setBankCategories()
  console.log(selectProduct.value, selectBank.value)
  store.getFilteredArticles(selectProduct.value, selectBank.value)
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