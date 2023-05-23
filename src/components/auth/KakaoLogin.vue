
<template>
  <section class="test">
    <v-btn @click="loginWithKakao" block class="mt-2">Kakao</v-btn>
  </section>
</template>

<script>
export default{
  name: "KakaoLogin",
  methods: {
    loginWithKakao() {
      const params = {
        redirectUri: process.env.VUE_APP_KAKAO_REDIRECT_URL,
      };
      window.Kakao.Auth.authorize(params);
    },
  },
};
</script>