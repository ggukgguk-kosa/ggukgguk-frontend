<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const memberId = ref("");
const memberEmail = ref("");

// 아이디 찾기
function findIdByEmail() {
    store.dispatch("auth/handleFindId", memberEmail.value)
        .then((response) => {
            console.log(response)
            memberId.value = response.data.data.memberId;
        });
}
</script>
<template>
    <div class="img-wrap">
        <img src="/img/landing_main.png" />
    </div>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent ref="form">
            <v-text-field v-model="memberEmail" label="이메일 주소 입력"></v-text-field>
            <v-btn type="submit" @click="findIdByEmail" block class="mt-2 mb-6">아이디 찾기</v-btn>
        </v-form>
    </v-sheet>
    <v-container v-if="memberId" class="text-center">
        <v-card class="mx-auto" width="400">
            <template v-slot:title>
                검색 결과
            </template>
            <v-card-text> {{ memberId }}</v-card-text>
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