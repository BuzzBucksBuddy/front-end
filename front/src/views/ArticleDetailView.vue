<template>
  <div>
    <h1>Detail</h1>
    <div v-if="article">
      <p>{{ article.id }}</p>
      <p>{{ article.article_bank_category.name }}</p>
      <p>{{ article.article_product_category.name }}</p>
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p>
      <p>{{ article.user.username }}</p>
      <p>작성일 : {{ article.created_at.slice(0, 10) }}</p>
      <p>수정일 : {{ article.updated_at.slice(0, 10) }}</p>
    </div>
    <hr>
    <CommentCreate
      :article="article"
      @go-comment="pushComment"
    />
    <div v-if="comments">
      <Comment 
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useRoute } from 'vue-router'
import Comment from '@/components/Comment.vue'
import CommentCreate from '@/components/CommentCreate.vue'

const store = useArticleStore()
const route = useRoute()
const article = ref(null)
const comments = ref([])

const pushComment = function (data) {
  comments.value.push(data)
}

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

// watch(() => article.value, (newValue, oldValue) => {
//   loadArticle()
// })

</script>

<style scoped>

</style>