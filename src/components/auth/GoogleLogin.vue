<template>
  <section class="test">
    <v-btn id="google-signin-button" @click="loginWithGoogle" block class="mt-2">Google</v-btn>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: "720876072203-b5m5ific9hf9htl31thto7dcad65e9ju.apps.googleusercontent.com", // Replace with your Google Client ID
    callback: onSignIn,
  });

  window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
    theme: "outline",
    size: "large",
  });
});

async function onSignIn(response) {
  console.log(response)
  const token = response.credential;
  console.log(token);
  router.push({ name: "RedirectGoogle", query: { token } });
}

onUnmounted(() => {
  // Clean up the Google Identity Services library
  window.google.accounts.id.disableAutoSelect();
});
</script>
