<template>
  <div>
    <div v-if="!article.is_locked || whosArticle" @click="goDetail">
      <span class="category">{{ article.article_product_category.name }}</span>
      <span class="category">{{ article.article_bank_category.name }}</span>
      <h4>{{ article.title }}</h4>
      <p v-if="whosArticle">내 게시글</p>
      <p v-else>{{ article.user.username }}</p>
      <p><i class="fa-solid fa-heart"></i> {{ likeCounter }}</p>
      <p>{{ article.created_at.slice(0, 10) }}</p>
    </div>
    <div v-else>
      <i id="locker" @click="showInput" class="fa-solid fa-lock"></i><br>
      <span>{{ article.article_product_category.name }}</span>
      <span>{{ article.article_bank_category.name }}</span>
      <h4>{{ article.title }}</h4>
    </div>
    <form v-show="unlock" @submit.prevent="checkPassword">
      <input type="password" v-model="inputPwd">
      <input type="submit">
    </form>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()
const router = useRouter()
const unlock = ref(false)
const inputPwd = ref(null)

const props = defineProps({
  article: Object
})

const goDetail = function () {
  router.push({ name: 'ArticleDetail', params: { articleId: props.article.id } })
}

const showInput = function () {
  unlock.value = !unlock.value
}

const checkPassword = function () {
  if (inputPwd.value === props.article.password) {
    router.push({ name: 'ArticleDetail', params: { articleId: props.article.id } })
  }
}

// 게시글 소유자 확인
const whosArticle = computed(() => {
  if (loginStore.myName === props.article.user.username) {
    return true
  } else {
    return false
  }
})

// 좋아요 개수
const likeCounter = computed(() => {
    return props.article.like_users.length
})

</script>

<style scoped>
.category {
  margin-right: 4px;
}
#locker {
  cursor: pointer;
}
</style>