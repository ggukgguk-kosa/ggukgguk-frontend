<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter} from "vue-router";

// 인스턴스 초기화
const store = useStore();
const router = useRouter();

const memberId = ref('');
const memberPw = ref('');
const memberCheckPw = ref('');
const memberName = ref('');
const memberEmail = ref('');
const memberBirth = ref('');
const memberNickname = ref('');
const memberPhone = ref('');
// const valid = ref(false);
const form = ref(null);

onMounted(() => {
    getMemberDetailInfo();
    memberId.value = store.getters['auth/memberInfo'].memberId;
    memberPw.value = store.getters['auth/memberInfo'].memberPw;
    memberName.value = store.getters['auth/memberInfo'].memberName;
    memberEmail.value = store.getters['auth/memberInfo'].memberEmail;
    memberBirth.value = store.getters['auth/memberInfo'].memberBirth;
    memberNickname.value = store.getters['auth/memberInfo'].memberNickname;
    memberPhone.value = store.getters['auth/memberInfo'].memberPhone;
});

// 입력한 비밀번호와 새 비밀번호가 일치 여부
const passwordMatchRule = (value) => {
    if (value !== memberPw.value) {
        return '비밀번호가 일치하지 않습니다.';
    }
    return true;
};

// 회원 정보 수정
const modify = () => {
    // const formIsValid = form.value.validate();
    // if (!formIsValid) {
    //     alert('The entered password does not match. Please check and try again.');
    //     return;
    // }
    store.dispatch('member/modfiyMemberInfo', {
        memberId: memberId.value,
        memberPw: memberPw.value,
        memberName: memberName.value,
        memberNickname: memberNickname.value,
        memberEmail: memberEmail.value,
        memberPhone: memberPhone.value,
        memberBirth: memberBirth.value,
    }).then(() => {
        alert("회원정보 수정이 되었습니다. ");
        // alert('로그인 성공');
        // router.push({path: to.value})
        router.push({ name: "recordMain" });
    }).catch((error) => {
        console.error("회원 정보 수정 실패");
        console.error(error);
    });

};

// 회원 고유한 ID 값으로 회원 정보 조회
async function getMemberDetailInfo() {
    await store.dispatch('member/informationMemberDetail', memberId.value)
        .catch((error) => {
            console.error("회원 세부정보 조회 실패");
            console.error(error);
        })
}

</script>
<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{ memberName }} 님 회원정보 입니다.</span>
        </v-card-title>
        <v-card-text>
            <v-form :ref="form">
                <v-text-field v-model="memberId" label="ID"></v-text-field>
                <v-text-field type="password" v-model="memberPw" label="새로운 비밀번호 입력"></v-text-field>
                <v-text-field type="password" v-model="memberCheckPw" :rules="[passwordMatchRule]"
                    label="새로운 비밀번호 한번 더 입력"></v-text-field>
                <v-text-field v-model="memberEmail" label="Email"></v-text-field>
                <v-text-field v-model="memberBirth" label="Birth"></v-text-field>
                <v-text-field v-model="memberNickname" label="NickName"></v-text-field>
                <v-text-field v-model="memberPhone" label="phone"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancel">취소</v-btn>
            <v-btn color="blue darken-1" text @click="modify">수정</v-btn>
        </v-card-actions>
    </v-card>
</template>
