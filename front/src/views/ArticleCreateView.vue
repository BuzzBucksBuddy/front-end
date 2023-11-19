<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <select name="product" id="product" v-model="articleProductCategory">
        <option value="null">--카테고리를 선택해주세요--</option>
        <option v-for="product in store.productCategories" :value="product.id">{{ product.name }}</option>
      </select>
      <br>
      <select name="bank" id="bank" v-model="articleBankCategory">
        <option value="null">--은행을 선택해주세요--</option>
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
      <div>
        <p>게시물 잠그기 : <input type="checkbox" v-model="isLocked"></p>
        <p v-show="isLocked">암호 : 
          <input type="password" v-model="password">
        </p>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useArticleStore } from '@/stores/article'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const title = ref(null)
const content = ref(null)
const isLocked = ref(false)
const articleBankCategory = ref(null)
const articleProductCategory = ref(null)
const password = ref(null)

const store = useArticleStore()
const loginStore = useLoginStore()
const router = useRouter()

store.getBankCategories()
store.getProductCategories()

const createArticle = function () {
  axios({
    method: 'post',
    url: `${store.API_URL}`,
    data: {
      title: title.value,
      content: content.value,
      is_locked: isLocked.value,
      article_bank_category: articleBankCategory.value,
      article_product_category: articleProductCategory.value,
      password: password.value
    },
    headers: {
      Authorization: `Token ${loginStore.token}`
    }
  })
    .then((res) => {
      // console.log(res)
      router.push({ name: 'ArticleList' })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style>

</style>