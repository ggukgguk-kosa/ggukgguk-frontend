<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
// const route = useRoute();

const form = ref("");
const memberId = ref("");
const memberPw = ref("");

// const to = computed(() => {
//   return route.params.redirect;
// })

const idRules = [
  (value) => {
    if (value) return true;
    return "아이디를 입력해주세요";
  },
];

const pwRules = [
  (value) => {
    if (value) return true;
    return "비밀번호를 입력해주세요";
  },
];

async function login() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  store
    .dispatch("auth/login", {
      memberId: memberId.value,
      memberPw: memberPw.value,
    })
    .then(() => {
      // alert('로그인 성공');
      // router.push({path: to.value})
      router.push({ name: "recordMain" });
    })
    .catch((error) => {
      if (error.code === "ERR_BAD_REQUEST") {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.");
      }
      console.log("로그인 실패");
      console.error(error);
    });
}

onMounted(() => {
  store.commit("auth/updateAccessToken", { accessToken: "" });
});

// 구글로그인 로그인
const GoogleLoginBtn = () => {
  const url =
    "https://accounts.google.com/o/oauth2/auth?client_id=" +
    process.env.VUE_APP_GOOGLE_LOGIN_KEY +
    "&redirect_uri=" +
    "http://localhost:8080/api/auth/social/google" +
    "&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  window.location.href = url;
};
const googleCode = ref(null);

router.afterEach((to) => {
  const code = to.query.code;
  if (code && !googleCode.value) {
    googleCode.value = code;
    handleGoogleAuth(googleCode.value);
  }
});
const handleGoogleAuth = async (code) => {
  try {
    console.log("Google code:", code); 
    await store.dispatch("auth/handleGoogleAuth", code);
  } catch (error) {
    console.error("구글인증 하지 못하였습니다.", error);
  }
};
</script>

<template>
  <div class="img-wrap">
    <img src="/img/landing_main.png" />
  </div>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent ref="form">
      <v-text-field
        v-model="memberId"
        :rules="idRules"
        label="아이디"
      ></v-text-field>
      <v-text-field
        v-model="memberPw"
        :rules="pwRules"
        label="비밀번호"
      ></v-text-field>
      <v-btn type="submit" @click="login" block class="mt-2">로그인</v-btn>
      <hr />
      <v-btn type="button" @click="GoogleLoginBtn" block class="mt-2"
        >구글로그인</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<style scoped>
.img-wrap {
  margin-top: 10%;
  text-align: center;
}

img {
  width: 300px;
}
</style>