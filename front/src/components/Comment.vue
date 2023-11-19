<template>
  <div>
    <div v-if="!isUpdate">
      <h4>{{ comment.content }}</h4>
      <p>{{ comment.user.username }}</p>
      <p>{{ comment.created_at.slice(0, 10) }}</p>
      <button @click="isUpdate = !isUpdate">수정</button>
      <form @submit.prevent="deleteComment">
        <input type="submit" value="삭제">
      </form>
    </div>
    <div v-else>
      <form @submit.prevent="updateComment">
        <input type="text" v-model="content">
        <span>숨기기:<input type="checkbox" v-model="isLocked"></span>
        <input type="submit">
      </form>
      <button @click="isUpdate = !isUpdate">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useArticleStore } from '@/stores/article'
import { useLoginStore } from '@/stores/login'

const emit = defineEmits(['goComment'])

const store = useArticleStore()
const loginStore = useLoginStore()
const props = defineProps({
  comment: Object,
  article: Object
})

const content = ref('')
content.value = props.comment.content

const isLocked = ref('')
isLocked.value = props.comment.is_locked

const isUpdate = ref(false)

const deleteComment = function () {
  axios({
    method: 'delete',
    url: `${store.API_URL}${props.article.id}/comments/${props.comment.id}/`,
    headers: {
      Authorization: `Token ${loginStore.token}`
    }
  })
    .then((res) => {
      console.log(res)
      emit('goComment')
    })
    .catch((err) => {
      console.log(err)
    })
}


const updateComment = function () {
  axios({
    method: 'put',
    url: `${store.API_URL}${props.article.id}/comments/${props.comment.id}/`,
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
      emit('goComment')
      isUpdate.value = !isUpdate.value
    })
    .catch((err) => {
      console.log(err)
    })
}

</script>

<style scoped>

</style>