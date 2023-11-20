<template>
  <div>
    <form @submit.prevent="createComment">
      <input type="text" v-model="content">
      <span>숨기기:<input type="checkbox" v-model="isLocked"></span>
      <p v-show="isLocked">암호 : 
        <input type="password" v-model="password">
      </p>
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
const password = ref(null)

const createComment = function () {
  if (loginStore.isLogin) {
    axios({
      method: 'post',
      url: `${store.API_URL}${props.article.id}/comments/`,
      data: {
        content: content.value,
        is_locked: isLocked.value,
        password: password.value
      },
      headers: {
        Authorization: `Token ${loginStore.token}`
      }
    })
      .then((res) => {
        console.log(res)
        emit('goComment', res.data)
        content.value = ''
        password.value = ''
        // router.push({ name: 'ArticleList' })
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}
</script>

<style scoped>

</style>