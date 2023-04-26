<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const loginInfo = computed(() => {
  return store.getters['auth/memberInfo'];
});

const isLogin = computed(() => {
  return store.getters['auth/isLogin'];
});

function onLogout() {
  store.dispatch('auth/logout');
}

onMounted(() => {
  if (isLogin.value) router.push({name: 'recordMain'});
})
</script>

<template>
  <div class="container">
    <div class="landing-wrap">
      <img src="/img/landing_main.png">
    </div>
    <div class="landing-wrap">
        <img src="/img/landing_text.png">
    </div>

    <div class="landing-wrap">
      <v-btn id="to-register-btn" rounded="xl" size="x-large" color="primary">회원가입</v-btn> <br><br>
      <router-link id="to-login-link" :to="{name: 'login'}">이미 회원이신가요?</router-link>
    </div>
      
    <div class="debug">
      {{ loginInfo }}
      <br>
      <router-link :to="{name: 'login'}" v-if="!isLogin">로그인</router-link> <br>
      <button @click="onLogout" v-if="isLogin">로그아웃</button> <br>
      <router-link :to="{name: 'testMain'}" v-if="isLogin">테스트 메인</router-link>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 100;
  }

  .landing-wrap {
    text-align: center;
    margin-top: 80px;
    width: 100%;
  }

  img {
    width: 80%;
  }

  #to-register-btn {
    width: 350px;
  }

  #to-login-link {
    color: black;
    text-decoration-line: none;
  }

  .debug {
    font-size: 8px;
    margin-top: 60px;
  }

  @media (min-width: 768px) { 
    img {
      width: 30%;
    }
   } 
</style>