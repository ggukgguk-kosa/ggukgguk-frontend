<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

const GoogleLoginBtn = () => {
  const url =
    "https://accounts.google.com/o/oauth2/auth?client_id=" +
    process.env.VUE_APP_GOOGLE_LOGIN_KEY +
    "&redirect_uri=https://localhost:8443/api/auth/social/google" +
    "&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  window.location.href = url;
};

const handleGoogleAuth = async (code) => {
  try {
    console.log("Google code:",code);
    await store.dispatch("auth/handleGoogleAuth", code).then((response) => {
      console.log("검색 성공");
      console.log(response);
    });
  } catch (error) {
    console.error("Google authentication failed.", error);
  }
};

const currentURL = ref(window.location.href);
const googleCode = ref(null);
console.log(currentURL);
console.log("Script is running");

watchEffect(async () => {
  const searchParams = new URL(currentURL.value).searchParams;
  if (searchParams.has("code")) {
    googleCode.value = searchParams.get("code");
    await handleGoogleAuth(googleCode.value);
  }
});
</script>

<template>
  <v-btn type="button" @click="GoogleLoginBtn" block class="mt-2"
    >구글로그인</v-btn
  >
</template>