<template>
  <div>
    <div class="title"></div>
    <h2>게시글 작성</h2>
    <hr>
    <form @submit.prevent="createArticle">
      <select class="create-form" name="product" id="product" v-model="articleProductCategory">
        <option value="null">카테고리를 선택하세요.</option>
        <option v-for="product in store.productCategories" :value="product.id">{{ product.name }}</option>
      </select>
      <select class="create-form" name="bank" id="bank" v-model="articleBankCategory">
        <option value="null">은행을 선택하세요.</option>
        <option v-for="bank in store.bankCategories" :value="bank.id">{{ bank.name }}</option>
      </select>
      <div class="input-group mb-3 form-group">
        <span class="input-group-text" id="basic-addon1">제목</span>
        <input type="text" v-model.trim="title" id="title" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group form-group">
        <span class="input-group-text">내용</span>
        <textarea v-model.trim="content" id="content" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <div class="form-check form-switch form-group">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isLocked">
        <label class="form-check-label" for="flexSwitchCheckDefault">게시물 잠금</label>
          <p class="input-group mb-3 form-group lock-form" v-show="isLocked">
            <span class="input-group-text" id="basic-addon1">암호</span>
            <input type="password" v-model="password" id="title" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
          </p>
      </div>
      <input type="submit" class="form-group" value="등록">
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
h2 {
  margin-top: 50px;
  margin-bottom: 20px;
}

.create-form {
  margin: 10px;
  padding: 5px;
  background-color: var(--main-color);
  border: 2px solid var(--sub-color);
  width: 25%;
  height: 40px;
  border-radius: 20px;
}

.form-group {
  margin: 10px;
  width: 500px;
}

textarea {
  resize: none;
}

.lock-form {
  width: 450px;
}
</style>