<script setup>
import GoBackHeader from '@/components/common/GoBackHeader.vue';
import EditMemberInfo from '../../components/member/EditMemberInfo.vue';
import RecordBottom from '@/components/record/RecordBottom.vue';
</script>

<template>
    <go-back-header />  
    <v-container fluid ma-0 pa-0 fill-height> </v-container>
    <!-- 나의 정보 수정 페이지 -->
    <edit-member-info/>
    <record-bottom />
</template>