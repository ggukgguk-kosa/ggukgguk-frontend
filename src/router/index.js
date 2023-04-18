import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import WriteNewNoticeView from '../views/admin/WriteNewNoticeView.vue'
import NoticeListView from '../views/admin/NoticeListView.vue';
import TestMainView from '../views/test/TestMainView.vue';

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
    path: '/admin/notice',
    name: 'noticeList',
    component: NoticeListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/notice/new',
    name: 'noticeNew',
    component: WriteNewNoticeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    name: 'testMain',
    component: TestMainView,
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
