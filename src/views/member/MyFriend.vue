<script setup>
import GoBackHeader from '@/components/common/GoBackHeader.vue';
import FriendList from '../../components/member/FriendList.vue';
import RecordBottom from '@/components/record/RecordBottom.vue';
</script>
<template>
    <go-back-header />
    <v-main>
        <v-container>
            <!-- 나의 정보 수정 페이지 -->
            <friend-list />
        </v-container>
    </v-main>
    <record-bottom />
</template>