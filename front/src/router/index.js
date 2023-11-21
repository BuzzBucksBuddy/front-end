import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import ProductListView from '@/views/ProductListView.vue'
import LogInView from '@/views/LogInView.vue'
import ExchangeRateView from '@/views/ExchangeRateView.vue'
import BankMapView from '@/views/BankMapView.vue'
import ArticleUpdateView from '@/views/ArticleUpdateView.vue'
import ArticleListView from '@/views/ArticleListView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ArticleCreateView from '@/views/ArticleCreateView.vue'
import FavoriteSelectView from '@/views/FavoriteSelectView.vue'
import JoinListView from '@/views/JoinListView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductListView
    },
    {
      path: '/product/:type/:productId',
      name: 'ProductDetail',
      component: ProductDetailView
    },
    {
      path: '/join',
      name: 'JoinList',
      component: JoinListView
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogInView
    },
    {
      path: '/exchange',
      name: 'ExchangeRate',
      component: ExchangeRateView
    },
    {
      path: '/map',
      name: 'BankMap',
      component: BankMapView
    },
    {
      path: '/articles',
      name: 'ArticleList',
      component: ArticleListView
    },
    {
      path: '/article/:articleId/update',
      name: 'ArticleUpdate',
      component: ArticleUpdateView
    },
    {
      path: '/article/:articleId',
      name: 'ArticleDetail',
      component: ArticleDetailView
    },
    {
      path: '/article/create',
      name: 'ArticleCreate',
      component: ArticleCreateView
    },
    {
      path: '/favorite-select',
      name: 'FavoriteSelect',
      component: FavoriteSelectView
    },
  ]
})


router.beforeEach((to, from) => {
  const store = useLoginStore()
  // if (to.name === 'ArticleView' && !store.isLogin) {
  //   window.alert('로그인이 필요합니다.')
  //   return {name: 'LogIn'}
  // }
  if ((to.name === 'SignUp' || to.name === 'LogIn') && (store.isLogin)) {
    window.alert('이미 로그인 했습니다.')
    return {name: 'Home'}
  }
})

router.beforeEach((to, from) => {
  const store = useLoginStore()
  if (store.isLogin === false
    && (
      to.name === 'ArticleCreate' ||
      to.name === 'ArticleUpdate'
      )) {
    window.alert('로그인이 필요합니다.')
    return { name: 'LogIn' }
  }
})


export default router
