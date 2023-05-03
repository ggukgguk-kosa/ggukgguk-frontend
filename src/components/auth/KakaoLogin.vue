
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
        redirectUri: "https://localhost:9090/login/kakao-redirect",
      };
      window.Kakao.Auth.authorize(params);
    },
  },
};
</script>