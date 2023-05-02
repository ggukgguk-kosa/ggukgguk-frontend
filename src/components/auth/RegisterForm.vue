<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";

const store = useStore();
// const router = useRouter();

// 변수 초기화
const memberId = ref("");
const memberPw = ref("");
const memberName = ref("");
const memberNickname = ref("");
const memberEmail = ref("");
const memberPhone = ref("");
const memberBirth = ref("");
const memberAuthority = "NORMAL";
const duplicated = ref(false);

// 각 요소별로 입력 조건 명시
const IdRules = [
  (value) => {
    return (
      (!!value || "아이디를 입력해주세요.") &&
      ((value && value.length <= 16) || "16자 이내로 입력하세요.")&&
      (!duplicated.value || "아이디가 중복되었습니다. 다시 작성해주세요")  
    );
  }
];
const EmailRules = [
  (value) => {
    return !!value || "이메일을 입력해주세요.";
  },
];


// watch(memberId, (newVal,oldVal) => {
// })

// 회원 가입 메서드 수행
function register() {
  console.log("form.vue 회원 아이디 : " + memberId.value);
  store
    .dispatch("auth/register", {
      memberId: memberId.value,
      memberPw: memberPw.value,
      memberName: memberName.value,
      memberNickname: memberNickname.value,
      memberEmail: memberEmail.value,
      memberPhone: memberPhone.value,
      memberBirth: memberBirth.value,
      memberAuthority: memberAuthority,
    })
    .then((response) => {
      alert("회원 가입에 성공했습니다.등록한 아이디로 다시 로그인 해주세요.");
      console.log("성공");
      console.log(response);
      //router.push({ name: "login" }); // 성공시 로그인 url로 이동.
    })
    .catch((error) => {
      console.error("실패");
      console.error(error);
    });
}

// 아이디 중복 검사.
function checkDuplicateId() {
  store.dispatch("auth/duplicateId", memberId.value).then((response) => {
    console.log("검색 성공");
    console.log(response);
    if (response.data.status == "success") {
      alert("이미 가입된 아이디가 있습니다. 다시 작성해주세요");
      duplicated.value = true;
      memberId.value = "";
    } else {
      alert("가입이 가능합니다.");
      duplicated.value = false;
    }
  });
}
</script>
<template>
  <h1>회원 가입 창</h1>
  <form>
    <v-row>
      <v-col cols="10">
        <v-text-field
          v-model="memberId"
          :counter="16"
          :rules="IdRules"
          :success="!!memberId"
          label="id"
        ></v-text-field>
        <!-- <v-container class="duplicate-indicator">
          {{
            dupblicated
              ? `${memberId} ID is not available.` 
              : ""
          }}
        </v-container> -->
      </v-col>
      <v-col cols="2">
        <v-btn class="check-duplicate" @click="checkDuplicateId">
          중복확인
        </v-btn>
      </v-col>
    </v-row>
    <v-text-field
      v-model="memberPw"
      :counter="128"
      label="비밀번호 입력"
    ></v-text-field>

    <v-text-field
      v-model="memberName"
      :counter="16"
      label="이름"
    ></v-text-field>

    <v-text-field v-model="memberNickname" label="닉네임"></v-text-field>

    <v-text-field
      v-model="memberEmail"
      label="이메일"
      :rules="EmailRules"
    ></v-text-field>

    <v-text-field v-model="memberPhone" label="휴대번호 입력"></v-text-field>

    <v-text-field v-model="memberBirth" label="생년월일"></v-text-field>

    <v-checkbox value="1" label="이용약관" type="checkbox"></v-checkbox>

    <v-checkbox value="1" label="개인정보처리" type="checkbox"></v-checkbox>

    <v-btn class="me-4" @click="register">등록</v-btn>
    <!-- <v-btn @click="handleReset"> 지우기 </v-btn> -->
  </form>
</template>
<style scoped>
</style>