<script setup>
import RecordHeader from '../../components/record/RecordHeader.vue';
import FindFriend from '../../components/member/FindFriend.vue';
import RecordBottom from '@/components/record/RecordBottom.vue';
</script>
<template>
    <record-header/>
    <v-container fluid ma-0 pa-0 fill-height> </v-container>
    <v-container fluid ma-0 pa-0 fill-height> </v-container>
    <!-- 나의 정보 수정 페이지 -->
    <find-friend/>
    <record-bottom />
</template>