<script setup>
import AdminMainLayout from './AdminMainLayout.vue'
import AdminGraphContainer from '@/components/admin/AdminGraphContainer.vue';
</script>

<template>
    <admin-main-layout>
        <div class="page-title">
            <h1 class="mb-8">관리자 메인</h1>
        </div>

        <admin-graph-container />
    </admin-main-layout>
</template>

<style scoped>
.page-title {
    width: 100%;
    text-align: right
}
</style>