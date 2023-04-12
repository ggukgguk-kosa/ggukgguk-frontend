import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import WriteNewNoticeView from '../views/admin/WriteNewNoticeView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin/notice/new',
    name: 'noticeNew',
    component: WriteNewNoticeView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Login Guard
router.beforeEach((to) => {
  const isLogin = store.getters['auth/isLogin'];
  if (to.meta.requiresAuth && !isLogin) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
