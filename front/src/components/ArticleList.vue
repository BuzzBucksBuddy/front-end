<template>
  <div @click="goDetail">
    <span>{{ article.article_product_category.name }}</span>
    <span>{{ article.article_bank_category.name }}</span>
    <h3>{{ article.title }}</h3>
    <p>{{ article.user.username }}</p>
    <p>{{ article.created_at.slice(0, 10) }}</p>
    <p>{{ article.updated_at.slice(0, 10) }}</p>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  article: Object
})

const goDetail = function () {
  router.push({ name: 'ArticleDetail', params: { articleId: props.article.id } })
}
</script>

<style scoped>

</style>