<template>
  <div>
    <div v-if="!lockSwitcher || whosComment">
      <div v-if="!isUpdate">
        <h4>{{ comment.content }}</h4>
        <p v-if="whosComment">내 댓글</p>
        <p v-else>{{ comment.user.username }}</p>
        <p>{{ comment.created_at.slice(0, 10) }}</p>
        <span @click="setLike" :class="{like: !isLiked, liked: isLiked}"><i class="fa-solid fa-heart"></i>{{ likeCounter }}</span><br>
        <div v-if="whosComment">
          <button @click="isUpdate = !isUpdate">수정</button>
          <form @submit.prevent="deleteComment">
            <input type="submit" value="삭제">
          </form>
        </div>
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
    <div v-else>
      <button @click="showInput">자물쇠</button>
      <p v-show="!inputSwitcher">숨은 댓글입니다.</p>
      <form v-show="inputSwitcher" @submit.prevent="checkPassword">
        <input type="password" v-model="inputPwd">
        <input type="submit">
      </form>
    </div>
    <hr>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const likeCounter = computed(() => {
    return props.comment.like_users.length
})

const lockSwitcher = ref(false)
lockSwitcher.value = props.comment.is_locked

const inputSwitcher = ref(false)

const content = ref('')
content.value = props.comment.content

const isLocked = ref('')
isLocked.value = props.comment.is_locked

const inputPwd = ref(null)

const isUpdate = ref(false)

const deleteComment = function () {
  if (loginStore.isLogin) {
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
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}


const updateComment = function () {
  if (loginStore.isLogin) {
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
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}

const showInput = function () {
  inputSwitcher.value = !inputSwitcher.value
}

const checkPassword = function () {
  if (inputPwd.value === props.comment.password) {
    lockSwitcher.value = !lockSwitcher.value
  }
}

const setLike = function () {
  if (loginStore.isLogin) {
    axios({
      method: 'post',
      url: `${store.API_URL}${props.article.id}/comments/${props.comment.id}/likes/`,
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
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}

// 게시글 소유자 확인
const whosComment = computed(() => {
  if (loginStore.myName === props.comment.user.username) {
    return true
  } else {
    return false
  }
})

// 좋아요 누른지 확인
const isLiked = computed(() => {
  if (props.comment.like_users.includes(loginStore.myId)) {
    return true
  } else {
    return false
  }
})
</script>

<style scoped>
.like {
  color: rgb(196, 196, 196);
  cursor: pointer;
}
.like:hover {
  color: rgb(255, 171, 220);
}
.liked {
  color: rgb(255, 135, 175);
  cursor: pointer;
}
</style>