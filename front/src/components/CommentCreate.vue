<template>
  <div>
    <form @submit.prevent="createComment">
      <input type="text" v-model="content">
      <span>숨기기:<input type="checkbox" v-model="isLocked"></span>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useArticleStore } from '@/stores/article'
import { useLoginStore } from '@/stores/login'

const props = defineProps({
  article: Object
})

const emit = defineEmits(['goComment'])

const store = useArticleStore()
const loginStore = useLoginStore()

const content = ref('')
const isLocked = ref(false)

const createComment = function () {
  axios({
    method: 'post',
    url: `${store.API_URL}${props.article.id}/comments/`,
    data: {
      content: content.value,
      is_locked: isLocked.value,
    },
    headers: {
      Authorization: `Token ${loginStore.token}`
    }
  })
    .then((res) => {
      console.log(res)
      emit('goComment', res.data)
      content.value = ''
      // router.push({ name: 'ArticleList' })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped>

</style>