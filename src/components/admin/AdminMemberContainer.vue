<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  getMemberList();
})

const memberList = computed(() => {
    return store.getters['admin/memberList'];
})

const currentPage = computed(() => {
    return store.getters['admin/memberOption'].page;
});

const totalPage = computed(() => {
    const totalItem = store.getters['admin/memberTotal'];
    const pageSize = store.getters['admin/memberOption'].size;
    console.log(totalItem, pageSize);
    return Math.ceil(totalItem / pageSize);
})

watch(currentPage, () => {
    store.dispatch("admin/getMemberList")
    .catch((error) => {
        console.error('멤버관리 조회 실패');
        console.error(error);
    })
})

function getMemberList() {
    store.dispatch("admin/getMemberList")
    .then(() => {
        console.log('성공');
    })
    .catch((error) => {
        console.error('멤버관리 조회 실패');
        console.error(error);
    })
}

function setPage(page) {
    if (page < 1 || page > totalPage.value) return;
    store.commit('admin/setMemberPage', page);
}
</script>

<template>
    <v-card
        v-for="member in memberList"
        width="400"
        :title="member.memberId"
        :text="`[${member.memberId}, ${member.memberName}, ${member.memberEmail}, 
                 ${member.memberPhone}, ${member.memberBirth}]`"
        :key="member.memberId"
    >
        <v-btn @click="memberDetail(member.memberId)">상세보기</v-btn>
    </v-card>
    <v-btn @click="setPage(currentPage-1)">이전</v-btn>
    {{ currentPage }} / {{ totalPage }}
    <v-btn @click="setPage(currentPage+1)">다음</v-btn>
</template>
