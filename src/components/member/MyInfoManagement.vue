<script setup>
import { computed ,onMounted} from 'vue';
import { useStore } from 'vuex';

 // 인스턴스 초기화
const store = useStore();

onMounted(() => {
    getMemberDetailInfo();
});

// 로그인한 회원 ID 값 가져오기
const memberId = computed(() => {
    return store.getters['auth/memberInfo'].memberId;
})
// 현재 로그인한 회원 정보 가져오기 
const memberDetailInfo = computed(() => {
    return store.getters['member/memberDetailInfo']
})

// 회원 고유한 ID 값으로 회원 정보 조회
async function getMemberDetailInfo(){
   await store.dispatch('member/informationMemberDetail',memberId.value)
    .catch((error) => {
        console.error("회원 세부정보 조회 실패");
        console.error(error);
    })
}

</script>

<template>
  {{memberDetailInfo}} 뭘까?<br>
</template>