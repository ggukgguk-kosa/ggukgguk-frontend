<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const form = ref('');
const memberId = ref('');
const memberPw = ref('');

const idRules = [
    value => {
        if (value) return true;
        return '아이디를 입력해주세요'
    }
]

const pwRules = [
    value => {
        if (value) return true;
        return '비밀번호를 입력해주세요'
    }
]

async function login() {
  const { valid } = await form.value.validate()
  if (!valid) return;

  store.dispatch('auth/login', {
    memberId: memberId.value,
    memberPw: memberPw.value 
  })
  .then(() => {
    alert('로그인 성공');
  })
  .catch((error) => {
    console.log('로그인 실패');
    console.error(error);
  })
}
</script>

<template>
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
    </v-form>
  </v-sheet>
</template>