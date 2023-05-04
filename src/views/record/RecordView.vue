<script setup>
// import RecordHeader from '../../components/record/RecordHeader.vue'
// import RecordMain from '../../components/record/RecordMain.vue';
// import RecordBottom from '@/components/record/RecordBottom.vue';
import { useStore } from 'vuex';

const store = useStore();

function testReq() {
  store.dispatch('admin/requestTestMsg', { test: 'Hello' })
  .then(() => {
    console.log('성공')
  })
  .catch((error) => {
    console.error(error);
  })
}


</script>

<template>
  <v-btn @click="testReq">테스트 요청</v-btn>
    
    <!-- <record-header />
    <v-main>
        <v-container>
            <record-main />
        </v-container>
    </v-main>
    <record-bottom /> -->
</template>