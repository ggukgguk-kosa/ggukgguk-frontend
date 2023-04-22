<script setup>
import ImageTake from '@/components/test/ImageTake.vue';
import AudioRecord from '@/components/test/AudioRecord.vue';
import ImageTakeUsingInput from '@/components/test/ImageTakeUsingInput.vue';

</script>

<template>
    <h1>꾹꾹 기술검증</h1>
    <h2>카메라 사용 테스트</h2>
    <image-take />
    
    <h2>마이크 사용 테스트</h2>
    <audio-record />

    <h2>디바이스 자체 Input 태그를 통한 미디어 캡쳐 및 업로드</h2>
    <image-take-using-input />
</template>