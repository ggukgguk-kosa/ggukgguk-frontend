<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  getContentList();
})

const contentList = computed(() => {
    return store.getters['admin/contentList'];
})

const currentPage = computed(() => {
    return store.getters['admin/contentOption'].page;
});

const totalPage = computed(() => {
    const totalItem = store.getters['admin/contentTotal'];
    const pageSize = store.getters['admin/contentOption'].size;
    console.log(totalItem, pageSize);
    return Math.ceil(totalItem / pageSize);
})

watch(currentPage, () => {
    store.dispatch("admin/getContentList")
    .catch((error) => {
        console.error('컨텐츠 리스트 조회 실패');
        console.error(error);
    })
})

function getContentList() {
    store.dispatch("admin/getContentList")
    .then(() => {
        console.log('성공');
    })
    .catch((error) => {
        console.error('컨텐츠 리스트 조회 실패');
        console.error(error);
    })
}

function setPage(page) {
    if (page < 1 || page > totalPage.value) return;
    store.commit('admin/setContentPage', page);
}

function contentDetail(recordId){

}
</script>

<template>
    <v-card
        v-for="content in contentList"
        width="400"
        :title="content.contentTitle"
        :text="`[${content.recordId}, ${content.memberId}, ${content.recordCreatedAt}, 
                 ${content.mediaFileBlocked}, ${content.mediaFileChecked}]` + content.contentContent"
        :key="content.recordId"
    >
        <v-btn @click="contentDetail(content.recordId)">상세보기</v-btn>
    </v-card>
    <v-btn @click="setPage(currentPage-1)">이전</v-btn>
    {{ currentPage }} / {{ totalPage }}
    <v-btn @click="setPage(currentPage+1)">다음</v-btn>
</template>
