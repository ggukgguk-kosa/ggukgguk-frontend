<script setup>


// 1. 맨 처음 카카오 회원아이디 + 비밀버호 입력하면 카카오 인가 코드를 받아오도록 함.
const kakaoLoginBtn = () => {
  const url =
    'https://kauth.kakao.com/oauth/authorize?client_id=' +
    process.env.VUE_APP_KAKAO_LOGIN_KEY +
    '&redirect_uri=' +
    process.env.VUE_APP_KAKAO_REDIRECT_URL +
    '&response_type=code&';
  window.location.href = url;
};
</script>

<template>
  <section class="test">
    <v-btn @click="kakaoLoginBtn" block class="mt-2">카카오</v-btn>
  </section>
</template>