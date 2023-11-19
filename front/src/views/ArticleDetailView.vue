<template>
  <div>
    <div v-if="article">
      <p>{{ article.id }}</p>
      <p>{{ article.article_product_category.name }}</p>
      <p>{{ article.article_bank_category.name }}</p>
      <h3>{{ article.title }}</h3>
      <p v-if="whosArticle">내 게시글</p>
      <p v-else>{{ article.user.username }}</p>
      <p>{{ article.content }}</p>
      <p>작성일 : {{ article.created_at.slice(0, 10) }}</p>
      <p>수정일 : {{ article.updated_at.slice(0, 10) }}</p>
    </div>
    <div class="center-box">
      <div @click="setLike" class="center-box" :class="{like: !isLiked, liked: isLiked}">
        <p>{{ likeCounter }}</p>
        <p>(●'◡'●)</p>
      </div>
    </div>
    <div v-if="whosArticle">
      <button @click="articleUpdate">수정</button>
      <form @submit.prevent="deleteArticle">
        <input type="submit" value="삭제">
      </form>
    </div>
    <hr>
    <h3>댓글 목록</h3>
    <p v-if="isCommentExist">{{ commentsCount }}</p>
    <CommentCreate
      :article="article"
      @go-comment="pushComment"
    />
    <div v-if="isCommentExist">
      <Comment 
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :article="article"
        @go-comment="loadComment"
      />
    </div>
    <div v-else>
      <p>댓글이 없습니다 ㅠㅠ</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useLoginStore } from '@/stores/login'
import { useRoute, useRouter } from 'vue-router'
import Comment from '@/components/Comment.vue'
import CommentCreate from '@/components/CommentCreate.vue'

const loginStore = useLoginStore()
const store = useArticleStore()
const route = useRoute()
const router = useRouter()
const article = ref(null)
const comments = ref([])

// 좋아요 개수
const likeCounter = computed(() => {
  if (article.value === null) {
    return 0
  } else {
    return article.value.like_users.length
  }
})

// 댓글 추가
const pushComment = function (data) {
  comments.value.push(data)
}

// 댓글 개수
const commentsCount = computed(() => {
  return comments.value.length
})

const isCommentExist = computed(() => {
  return comments.value.length > 0
})

// 게시글 정보 받기
const loadArticle = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}${route.params.articleId}/detail/`
  })
    .then((res) => {
      // console.log(res.data)
      article.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

// 게시글 삭제
const deleteArticle = function () {
  if (loginStore.isLogin) {
    axios({
      method: 'delete',
      url: `${store.API_URL}${route.params.articleId}/control/`,
      headers: {
        Authorization: `Token ${loginStore.token}`
      }
    })
      .then((res) => {
        // console.log(res.data)
        router.push({name: 'ArticleList'})
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

// 댓글 정보 받기
const loadComment = function () {
  axios({
    method: 'get',
    url: `${store.API_URL}${route.params.articleId}/comments_list/`
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

// 게시글 업데이트 페이지로 이동
const articleUpdate = function () {
  if (loginStore.isLogin) {
    router.push({ name: 'ArticleUpdate', params: { articleId: route.params.articleId }})
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}

// 좋아요 설정
const setLike = function () {
  if (loginStore.isLogin) {
    axios({
      method: 'post',
      url: `${store.API_URL}${route.params.articleId}/likes/`,
      headers: {
        Authorization: `Token ${loginStore.token}`
      }
    })
      .then((res) => {
        console.log(res)
        loadArticle()
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
const whosArticle = computed(() => {
  if (article.value === null) {
    return false
  } else {
    if (loginStore.myName === article.value.user.username) {
      return true
    } else {
      return false
    }
  }
})

// 좋아요 누른지 확인
const isLiked = computed(() => {
  if (article.value === null) {
    return false
  } else {
    if (article.value.like_users.includes(loginStore.myId)) {
      return true
    } else {
      return false
    }
  }
})

// 게시글, 댓글 정보 받기
onMounted(() => {
  loadArticle()
  loadComment()
})

</script>

<style scoped>
.center-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.center-box p {
  margin: 2px 0;
}
.like {
  background-color: rgb(233, 233, 233);
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 16px;
  transition: background-color 0.3s;
}
.like:hover {
  background-color: rgb(255, 211, 226);
}
.liked {
  background-color: rgb(255, 135, 175);
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 16px;
  transition: background-color 0.3s;
}
.liked p {
  color: white;
}
.liked:hover {
  background-color: rgb(220, 116, 150);
}
</style>