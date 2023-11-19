<template>
  <div>
    <h1>게시글 수정</h1>
    <form @submit.prevent="updateArticle">
      <select name="product" id="product" v-model="articleProductCategory">
        <option v-for="product in store.productCategories" :value="product.id">{{ product.name }}</option>
      </select>
      <br>
      <select name="bank" id="bank" v-model="articleBankCategory">
        <option v-for="bank in store.bankCategories" :value="bank.id">{{ bank.name }}</option>
      </select>
      <div>
        <label for="title">제목:</label>
        <input type="text" v-model.trim="title" id="title">
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea v-model.trim="content" id="content"></textarea>
      </div>
      <p>게시물 잠그기 : <input type="checkbox" v-model="isLocked"></p>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useLoginStore } from '@/stores/login'
import { useRouter, useRoute } from 'vue-router'

const title = ref('')
const content = ref('')
const isLocked = ref(false)
const articleBankCategory = ref(null)
const articleProductCategory = ref(null)

const article = ref(null)

const store = useArticleStore()
const loginStore = useLoginStore()
const router = useRouter()
const route = useRoute()

store.getBankCategories()
store.setBankCategories()
store.getProductCategories()

const loadArticle = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}${route.params.articleId}/detail/`
  })
    .then((res) => {
      // console.log(res.data)
      article.value = res.data
      console.log('!!!!!!!')
      console.log(article.value)

      title.value = article.value.title
      content.value = article.value.content
      isLocked.value = article.value.is_locked
      articleBankCategory.value = article.value.article_bank_category.id
      articleProductCategory.value = article.value.article_bank_category.id
    })
    .catch((err) => {
      console.log(err)
    })
}

const updateArticle = function () {
  axios({
    method: 'put',
    url: `${store.API_URL}${route.params.articleId}/control/`,
    data: {
      title: title.value,
      content: content.value,
      is_locked: isLocked.value,
      article_bank_category: articleBankCategory.value,
      article_product_category: articleProductCategory.value,
    },
    headers: {
      Authorization: `Token ${loginStore.token}`
    }
  })
    .then((res) => {
      // console.log(res)
      router.push({ name: 'ArticleDetail', params: { articleId: route.params.articleId } })
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  loadArticle()
})

</script>

<style>

</style>