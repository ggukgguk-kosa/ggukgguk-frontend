<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const loginInfo = computed(() => {
  return store.getters['auth/memberInfo'];
});

const isLogin = computed(() => {
  return store.getters['auth/isLogin'];
});

function onLogout() {
  store.dispatch('auth/logout');
}
</script>

<template>
  메인 페이지

  {{ loginInfo }}

  <router-link :to="{name: 'login'}" v-if="!isLogin">로그인</router-link>
  <v-btn @click="onLogout" v-if="isLogin">로그아웃</v-btn>
</template>