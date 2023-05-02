<template>
  <div>loading....</div>
</template>

<script setup>
import { onMounted } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";

// const router = useRouter();
const store = useStore();

onMounted(async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  if (token) {
    await store.dispatch("auth/handleGoogleAuth",token);
    // router.push("/");
  } else {
    // router.push("/login");
  }
});
</script>