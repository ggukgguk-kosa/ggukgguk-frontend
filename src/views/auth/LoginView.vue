<script setup>
import LoginForm from '../../components/auth/LoginForm.vue';
import KakaoLogin from '../../components/auth/KakaoLogin.vue';
import GoogleLogin from '../../components/auth/GoogleLogin.vue';
</script>

<template>
    <login-form />
    <google-login/>
    <kakao-login/>
</template>