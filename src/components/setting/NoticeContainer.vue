<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const noticeList = computed(() => {
    return store.getters['admin/noticeList'];
});

const noticeOption = computed(() => {
    return store.getters['admin/noticeOption'];
});

const totalPage = computed(() => {
    const totalItem = store.getters['admin/noticeTotal'];
    const pageSize = store.getters['admin/noticeOption'].size;

    const computed = Math.ceil(totalItem / pageSize);
    if (!computed) {
        return 1;
    }
    return computed;
});

onMounted(() => {
    getNoticeList();
});

function getNoticeList() {
    store.dispatch("admin/getNoticeList")
        .then(() => {
            console.log('성공');
        })
        .catch((error) => {
            console.error('공지사항 리스트 조회 실패');
            console.error(error);
        })
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour}:${minute}`;
}

</script>

<template>
    <v-container>
        <h1>공지사항</h1>

        <v-expansion-panels>
            <v-expansion-panel
                v-for="notice in noticeList"
                :key="notice.noticeId"
                :title="`${notice.noticeTitle}`"
                :text="formatDate(new Date(notice.noticeCreatedAt)) + '<br>' + notice.noticeContent"
            ></v-expansion-panel>
        </v-expansion-panels>

        <v-pagination v-model="noticeOption.page" :total-visible="5" :length="totalPage"></v-pagination>
    </v-container>
</template>