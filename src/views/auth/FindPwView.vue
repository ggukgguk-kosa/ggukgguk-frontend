<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const memberId = ref("");
const memberEmail = ref("");
const doubleCheck = ref(false);
const emptyMember = ref(false);
// 비빌번호 찾기
function findPwByIdEmail() {
    store.dispatch("auth/handleFindPw",
        {
            memberEmail: memberEmail.value,
            memberId: memberId.value
        })
        .then((response) => {
                console.log(response)
            doubleCheck.value = response.data.data
        }).catch(() => {
            emptyMember.value = true;
            
        });
}

</script>
<template>
    <div class="img-wrap">
        <img src="/img/landing_main.png" />
    </div>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent ref="form">
            <v-text-field v-model="memberId" label="아이디 입력"></v-text-field>
            <v-text-field v-model="memberEmail" label="이메일 주소 입력"></v-text-field>
            <v-btn type="submit" @click="findPwByIdEmail" block class="mt-2 mb-6">비밀번호 찾기</v-btn>
        </v-form>
    </v-sheet>
    <v-container v-if="doubleCheck" class="text-center">
        <v-card class="mx-auto" width="400">
            <template v-slot:title>
                등록된 이메일로 인증번호를 전송하였습니다.
            </template>
            <v-card-text></v-card-text>
        </v-card>
    </v-container>
    <v-container v-if="emptyMember" class="text-center">
        <v-card class="mx-auto" width="400">
            <template v-slot:title>
                가입된 이메일 주소가 아닙니다.
            </template>
            <v-card-text></v-card-text>
        </v-card>
    </v-container>
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