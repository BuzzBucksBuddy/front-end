import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import LoginView from '@/views/LoginView.vue'
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
      name: 'home',
      component: HomeView
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/productList',
      name: 'productList',
      component: ProductListView
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: ProductDetailView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/exchangeRate',
      name: 'exchangeRate',
      component: ExchangeRateView
    },
    {
      path: '/bankMap',
      name: 'bankMap',
      component: BankMapView
    },
    {
      path: '/articleUpdate',
      name: 'articleUpdate',
      component: ArticleUpdateView
    },
    {
      path: '/articleList',
      name: 'articleList',
      component: ArticleListView
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: ArticleDetailView
    },
    {
      path: '/articleCreate',
      name: 'articleCreate',
      component: ArticleCreateView
    },
  ]
})

export default router
