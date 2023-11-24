<template>
  <div>
    <form @submit.prevent="createComment">
      <!-- <input type="text" v-model="content">
      <span>숨기기:<input type="checkbox" v-model="isLocked"></span>
      <p v-show="isLocked">암호 : 
        <input type="password" v-model="password">
      </p>
      <input type="submit"> -->

      <div class="form-check form-switch form-group">
          <p><label class="form-check-label" for="flexSwitchCheckDefault">댓글: <input type="text" v-model="content" class="text-box"></label>
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isLocked">
            <p class="input-group mb-3 form-group lock-form" v-show="isLocked">
              <span class="input-group-text" id="basic-addon1">암호</span>
              <input type="password" v-model="password" id="title" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
            </p>
            <input class="add btn btn-light" type="submit" value="등록">
          </p>
      </div>
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
.text-box {
  width: 300px;
}

.lock-form {
  width: 300px;
}

.add {
  margin-left: 5px;
}
</style>