<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  getNoticeList();
})

const noticeList = computed(() => {
    return store.getters['admin/noticeList'];
})

const currentPage = computed(() => {
    return store.getters['admin/noticeOption'].page;
});

const totalPage = computed(() => {
    const totalItem = store.getters['admin/noticeTotal'];
    const pageSize = store.getters['admin/noticeOption'].size
    return Math.ceil(totalItem / pageSize);
})

watch(currentPage, () => {
    store.dispatch("admin/getNoticeList")
    .catch((error) => {
        console.error('공지사항 리스트 조회 실패');
        console.error(error);
    })
})

function getNoticeList() {
    store.dispatch("admin/getNoticeList")
    .catch((error) => {
        console.error('공지사항 리스트 조회 실패');
        console.error(error);
    })
}

function setPage(page) {
    if (page < 1 || page > totalPage.value) return;
    store.commit('admin/setNoticePage', page);
}
</script>

<template>
    <v-card
        v-for="notice in noticeList"
        width="400"
        :title="notice.noticeTitle"
        :text="`[${notice.noticeId}]` + notice.noticeContent"
        :key="notice.noticeId"
    ></v-card>
    <v-btn @click="setPage(currentPage-1)">이전</v-btn>
    {{ currentPage }} / {{ totalPage }}
    <v-btn @click="setPage(currentPage+1)">다음</v-btn>
</template>