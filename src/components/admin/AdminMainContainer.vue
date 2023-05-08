<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoading = ref(false);

onMounted(()=>{
    requestAnalysisData();
})

const analysisData = computed(() => {
    return store.getters['admin/analysisData'];
})

function requestAnalysisData(){
    isLoading.value = true;

    store.dispatch('admin/getAnalysisData')
    .then(() => {
        console.log('성공');
        isLoading.value = false;
    })
    .catch((error)=>{
        console.error("관리자 페이지 불러오기 실패");
        console.error(error);
        isLoading.value = false;
    })
}
</script>
<template>
    <v-overlay
        v-model="isLoading"
        scroll-strategy="block"
        persistent
    >
        <v-progress-circular
        color="primary"
        indeterminate
        size="64"
        ></v-progress-circular>
    </v-overlay>

    <h1>TEST</h1>
    {{ analysisData }}
    <div>{{ analysisData.totalMember }}</div>
    <div>{{ analysisData.todayMember }}</div>
    <div>{{ analysisData.totalContent }}</div>
    <div>{{ analysisData.todayContent }}</div>
</template>

<style scoped>
.v-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>