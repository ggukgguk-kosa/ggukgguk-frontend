<script setup>
import { ref,onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();

async function getKakaoToken(code) {
  console.log("loginWithKakao");
  const kakaoHeader = {
    Authorization: process.env.VUE_APP_KAKAO_ADMIN_KEY,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.VUE_APP_KAKAO_LOGIN_KEY,
      redirect_uri: "https://localhost:9090/login/kakao-redirect",
      code: code,
    };
    const queryString = Object.keys(data)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      { headers: kakaoHeader }
    );
    return result;
  } catch (e) {
    return e;
  }
}

const AccessToken = ref("");
const refreshToken = ref("");
onMounted(async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");

  if (code) {
    try {
      const tokenResult = await getKakaoToken(code);
      console.log("Kakao Token", tokenResult);
      AccessToken.value = tokenResult.data.access_token;
      refreshToken.value = tokenResult.data.refresh_token;
      store.dispatch("auth/handleKakaoAuth",AccessToken.value,refreshToken.value)
      .then((response) =>{
        console.log("카카오 로그인 성공");
        console.log(response);
      });
    } catch (error) {
      console.error("Failed to get Kakao token", error);
    }
  }
});

</script>

<template>
<h1>테스트 중입니다.</h1>
</template>