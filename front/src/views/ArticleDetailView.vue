<template>
  <div>
    <h1>Detail</h1>
    <div v-if="article">
      <p>{{ article.id }}</p>
      <p>{{ article.article_product_category.name }}</p>
      <p>{{ article.article_bank_category.name }}</p>
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p>
      <p>{{ article.user.username }}</p>
      <p>작성일 : {{ article.created_at.slice(0, 10) }}</p>
      <p>수정일 : {{ article.updated_at.slice(0, 10) }}</p>
    </div>
    <div>
      <button @click="articleUpdate">수정</button>
      <form @submit.prevent="deleteArticle">
        <input type="submit" value="삭제">
      </form>
    </div>
    <hr>
    <h3>댓글 목록</h3>
    <p>{{ commentsCount }}</p>
    <CommentCreate
      :article="article"
      @go-comment="pushComment"
    />
    <div v-if="comments">
      <Comment 
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :article="article"
        @go-comment="loadComment"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useRoute, useRouter } from 'vue-router'
import Comment from '@/components/Comment.vue'
import CommentCreate from '@/components/CommentCreate.vue'

const store = useArticleStore()
const route = useRoute()
const router = useRouter()
const article = ref(null)
const comments = ref([])

const pushComment = function (data) {
  comments.value.push(data)
}

const commentsCount = computed(() => {
  return comments.value.length
})

const loadArticle = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}${route.params.articleId}/`
  })
    .then((res) => {
      // console.log(res.data)
      article.value = res.data
      console.log(article.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

const deleteArticle = function () {
  axios({
    method: 'delete',
    url: `${store.API_URL}${route.params.articleId}/`
  })
    .then((res) => {
      // console.log(res.data)
      router.push({name: 'ArticleList'})
    })
    .catch((err) => {
      console.log(err)
    })
}

const loadComment = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}${route.params.articleId}/comments/`
  })
    .then((res) => {
      // console.log(res.data)
      comments.value = res.data
      console.log(article.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  loadArticle()
  loadComment()
})

const articleUpdate = function () {
  router.push({ name: 'ArticleUpdate', params: { articleId: route.params.articleId }})
}

</script>

<style scoped>

</style>