<template>
  <div>
    <div class="title">
      <h1>게시판 목록</h1>
      <RouterLink :to="{ name: 'ArticleCreate' }">게시글 작성</RouterLink>
    </div>
    <div class="searcher">
      <div>
        <select name="product" id="product" v-model="selectProduct">
          <option :value="0">모든 글</option>
          <option v-for="product in store.productCategories" :key="product" :value="product.id">{{ product.name }}</option>
        </select>
        <select name="bank" id="bank" v-model="selectBank">
          <option :value="0">모든 은행</option>
          <option v-for="bank in store.bankCategories" :key="bank" :value="bank.id">{{ bank.name }}</option>
        </select>
      </div>
      <form @submit.prevent="searchArticle">
        <select name="field" id="field" v-model="selectField">
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="both">제목&내용</option>
        </select>
        <input type="text" v-model="searchInput">
        <input type="submit" value="검색">
      </form>
    </div>
    <hr>
    <section v-if="isExist">
      <ArticleList v-for="(article, idx) in list" :key="`article.id`" :article="article"/>
    </section>
    <section v-else>
      <p>게시글이 존재하지 않습니다</p>
    </section>
    <ul class="pagination" v-show="isExist">
      <li class="page-item" :class="{'disabled' : isBtnFirst}"><a class="page-link" href="#" @click.prevent="pageArrow('first')">First</a></li>
      <li class="page-item" :class="{'disabled' : isBtnPrev}"><a class="page-link" href="#" @click.prevent="pageArrow('prev')">Previous</a></li>
      <template v-for="(item, index) in pageList" :key="`list-${index}`">
        <li class="page-num" :class="{'active' : item == currentPage}"><a class="page-link" href="#" @click.prevent="page(item)">{{item+1}}</a></li>
      </template>
      <li class="page-item" :class="{'disabled' : isBtnNext}"><a class="page-link" href="#" @click.prevent="pageArrow('next')">Next</a></li>
      <li class="page-item" :class="{'disabled' : isBtnLast}"><a class="page-link" href="#" @click.prevent="pageArrow('last')">Last</a></li>
    </ul>
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue'
import { useArticleStore } from '@/stores/article'
import { RouterLink } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const store = useArticleStore()

const selectBank = ref(0)
const selectProduct = ref(0)

const selectField = ref('title')
const searchInput = ref('')

const getArticles = watch(() => [selectProduct.value, selectBank.value], ([newProduct, newBank]) => {
  getFilteredArticles(newProduct, newBank)
})

const isExist = computed(() =>{
  return list.value.length > 0
})

onMounted(() => {
  store.getBankCategories()
  store.getProductCategories()
  store.setBankCategories()
})

// ---------------------------------------------

const list = ref([])
const cache = ref([])

const listCunt = ref('5') // 한 페이지에 보여주는 게시물 개수

let currentPage = ref(0)
let pageNum = 10 // 페이징 개수
const pageList = ref([])
let totalPage = ref(0) // 페이지 숫자

let isBtnFirst = ref(true)
let isBtnPrev = ref(true)
let isBtnNext = ref(true)
let isBtnLast = ref(true)

const currentPageListStart = () => {
  return Math.floor(currentPage.value / pageNum) * pageNum
}

// 페이징
const paging = () => {
  // 보여지는 페이지 리셋
  pageList.value = []

  // 몇 페이지까지 있는지 확인
  if (cache.value.length % listCunt) {
    totalPage.value = (cache.value.length / listCunt.value) -1
  } else {
    totalPage.value = Math.ceil(cache.value.length / listCunt.value) -1
  }

  // 현재 페이지 기준으로 페이징 숫자 넣기
  let pageListStart = currentPageListStart()
  for(let i = 0; i < pageNum; i++) {
    if (totalPage.value >= pageListStart) {
      pageList.value.push(pageListStart)
      pageListStart++
    }
  }
}

// 게시글 axios
const API_URL = 'http://127.0.0.1:8000/api/v1/articles/'

// 게시글 카테고리 filtering 출력
const getFilteredArticles = function (pd, bk) {
  console.log(currentPage.value)
  axios({
    method: 'get',
    url: `${API_URL}list/${pd}/${bk}/`
  })
    .then((res) => {
      console.log(res.data)
      cache.value = res.data
      list.value = []

      let listIdx = (listCunt.value * (currentPage.value)) // 보여질 게시물 인덱스
      for (let i = 0; i < listCunt.value; i++) {
        if (cache.value.length > listIdx) {
          list.value.push(cache.value[listIdx])
          listIdx++
        }
      }
      paging()
      pageBtnCheck()
    })
    .catch((err) => {
      console.log(err)
    })
}

// 게시글 검색
const searchArticles = function (field, input) {
  axios({
    method: 'get',
    url: `${API_URL}list/search/${field}/${input}/`
  })
    .then((res) => {
      console.log(res.data)
      cache.value = res.data
      list.value = []

      let listIdx = (listCunt.value * (currentPage.value)) // 보여질 게시물 인덱스
      for (let i = 0; i < listCunt.value; i++) {
        if (cache.value.length > listIdx) {
          list.value.push(cache.value[listIdx])
          listIdx++
        }
      }
      paging()
      pageBtnCheck()
    })
    .catch((err) => {
      console.log(err)
    })
}

const searchArticle = function () {
  if (searchInput.value === '') {
    window.alert('검색어를 입력해주세요.')
  } else {
    searchArticles(selectField.value, searchInput.value)
  }
}

getFilteredArticles(selectProduct.value, selectBank.value)
// getList()

// 페이지 번호 클릭 시
const page = (e) => {
  currentPage.value = e
  getFilteredArticles(selectProduct.value, selectBank.value)
}

//리스트 갯수 수정시
watch(listCunt,(after, before)  =>{
  currentPage.value = 0
  getFilteredArticles(selectProduct.value, selectBank.value)
})

const pageBtnCheck = () => {
  isBtnFirst.value = currentPage.value == 0 ? true : false
  isBtnPrev.value = currentPage.value == 0 ? true : false

  isBtnNext.value = currentPage.value == totalPage.value ? true : false
  isBtnLast.value = currentPage.value == totalPage.value ? true : false
}

watch(currentPage, (after, before) => {
  pageBtnCheck()
})

// 페이지 처음/끝/이전/다음 버튼 클릭 시
const pageArrow = (e) => {
  let movePage = parseInt(currentPage.value)
  if(e == 'first'){ //처음으로
    movePage = 0
  } else if(e == 'last'){    //마지막
    movePage = totalPage.value
  } else if(e == 'prev'){    //이전  
    movePage = currentPageListStart() - 1    
    movePage < 0 ? movePage = 0 : ''
  } else{//다음
    movePage = currentPageListStart() + 10
    movePage >= totalPage.value ? movePage = totalPage.value : ''
  }
  page(movePage)
}

</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
hr {
  margin: 0;
}
.title a {
  text-decoration: none;
  color: black;
}
.title a:hover {
  color: rgb(242, 185, 60);
}
.searcher {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.pagination {
  display: flex;
  text-decoration: none;
  padding: 0;
  gap: 10px;
}
.pagination li {
  list-style: none;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s;
}
.pagination li:hover {
  background-color: rgb(255, 235, 191);
}
.pagination a {
  text-decoration: none;
  color: black;
}
</style>