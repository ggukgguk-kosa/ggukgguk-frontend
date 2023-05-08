<script setup>
import RecordHeader from '../../components/record/RecordHeader.vue'
import RecordBottom from '@/components/record/RecordBottom.vue';
import SettingContainer from '@/components/setting/SettingContainer.vue';
</script>

<template>
    <record-header />
    <v-main>
        <v-container>
            <setting-container></setting-container>
        </v-container>
    </v-main>
    <record-bottom />
</template>