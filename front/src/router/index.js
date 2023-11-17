import { createRouter, createWebHistory } from 'vue-router'
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
  ]
})

export default router
