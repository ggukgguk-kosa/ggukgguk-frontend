<script setup>
import RecordHeader from '../../components/record/RecordHeader.vue';
import NotificationList from '../../components/notification/NotificationList.vue';
import RecordBottom from '@/components/record/RecordBottom.vue';

</script>

<template>
    <record-header />
    <v-main>
        <v-container>
            <notification-list/>
        </v-container>
    </v-main>
    <record-bottom />
</template>