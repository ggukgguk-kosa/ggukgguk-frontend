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

<!-- 컴포넌트를 포함하는 위치
Vue.js는 컴포넌트 기반의 프레임워크로, UI를 작은 단위로 나누어 재사용 가능한 컴포넌트로 구성
컴포넌트는 데이터와 뷰를 결합하는 것에 도움
컴포넌트는 재사용 가능하며, 다른 컴포넌트 내부에서 사용 가능
예를 들어, 페이지 레이아웃, 사용자 입력 폼, 메뉴 및 버튼 등을 포함할 수 있음 -->
