import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import WriteNewNoticeView from '../views/admin/WriteNewNoticeView.vue'
import NoticeListView from '../views/admin/NoticeListView.vue';
import TestMainView from '../views/test/TestMainView.vue';
import RecordView from '../views/record/RecordView.vue'
import DiaryView from '../views/record/DiaryView.vue';
import CalendarView  from '../views/record/CalendarView.vue';
import RecordAddView from '../views/record/RecordAddView.vue';
import MapTest from '../views/record/MapTest.vue';

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
  },
  {
    path: '/record',
    name: 'recordMain',
    component: RecordView,
    meta: { requiresAuth: true }
  },
  {
    path: '/record/new',
    name: 'recordAdd',
    component: RecordAddView,
    meta: { requiresAuth: true }
  },
  {
    path: '/diary',
    name: 'diaryMain',
    component: DiaryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'CalendarMain',
    component: CalendarView,
    meta: { requiresAuth: true }
  },
  {
    path: '/map',
    name: 'MapTest',
    component: MapTest,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
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
  return true;
})

export default router
