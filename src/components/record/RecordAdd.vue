<script setup>
    import { computed, ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import CaptureImage from './media/CaptureImage.vue';
    import CaptureVideo from './media/CaptureVideo.vue';
    import CaptureAudio from './media/CaptureAudio.vue';
    import CaptureLocation from './media/CaptureLocation.vue';
    import RecordMap from './RecordMap.vue';

    const store = useStore();
    const memberId = computed(() => {
        return store.getters['auth/memberInfo'].memberId;
    });
    const MAX_COMMENT_LENGTH = 512

    const router = useRouter();

    let isMobile = false;

    onMounted(() => {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)) {
                isMobile = true;
        }
    })

    const recordComment = ref('');
    const commentLength = computed(() => {
        return recordComment.value.length;
    });

    const captureImageVisible = ref(false);
    const recordImage = ref(null);
    const recordImageUrl = ref('');

    const captureVideoVisible = ref(false);
    const recordVideo = ref(null);
    const recordVideoUrl = ref('');

    const captureAudioVisible = ref(false);
    const recordAudio = ref(null);
    const recordAudioUrl = ref('');

    const captureLocationVisible = ref(false);
    const recordLocationX = ref(0);
    const recordLocationY = ref(0);


    function openInputGallery() {
        document.querySelector("input#input-media-from-gallery").click();
    }

    function onInputChange(e) {
        const input = e.target;
        if (input.files && input.files[0]) {
            recordImage.value = input.files[0];
        }

        recordImageUrl.value = URL.createObjectURL(recordImage.value);
    }

    function openInputImage() {
        if (isMobile)
            document.querySelector("input#input-image-from-camera").click();
        else
            captureImageVisible.value = true;
    }

    function handleImageCapture(pictureBlob) {
        recordVideo.value = null;
        recordVideoUrl.value = '';
        recordAudio.value = null;
        recordAudio.value = '';

        recordImage.value = pictureBlob;
        recordImageUrl.value = URL.createObjectURL(pictureBlob);
        captureImageVisible.value = false;
    }

    function openVideoCamera() {
        captureVideoVisible.value = true;
    }

    function handleVideoCapture(videoBlob) {
        recordImage.value = null;
        recordImageUrl.value = '';
        recordAudio.value = null;
        recordAudio.value = '';

        recordVideo.value = videoBlob;
        recordVideoUrl.value = URL.createObjectURL(videoBlob);
        captureVideoVisible.value = false;
    }

    function openAudioRecoder() {
        captureAudioVisible.value = true;
    }

    function handleAudioCapture(audioBlob) {
        recordImage.value = null;
        recordImageUrl.value = '';
        recordVideo.value = null;
        recordVideoUrl.value = '';
        console.log('asdf');
        recordAudio.value = audioBlob;
        recordAudioUrl.value = URL.createObjectURL(audioBlob);
        captureAudioVisible.value = false;
    }

    function uploadRecord() {
        if (recordComment.value.split(' ').length < 3) {
            alert('3단어 이상 입력해주세요');
            return;
        }

        if (recordComment.value.length > 512) {
            alert('512자를 초과할 수 없습니다.');
            return;
        }

        const formData = new FormData();
        formData.append('recordComment', recordComment.value);
        formData.append('memberId', memberId.value);

        const mediaFileBlob = recordImage.value ? recordImage.value
            : recordVideo.value ? recordVideo.value
            : recordAudio.value;
        formData.append('mediaFile', mediaFileBlob);
        
        formData.append('recordLocationX', recordLocationX.value);
        formData.append('recordLocationY', recordLocationY.value);

        store.dispatch('record/addRecord', formData)
        .then((response) => {
            console.log('성공');
            console.log(response);
            router.push({ name: 'recordMain' })
        })
        .catch((error) => {
            console.error('실패');
            console.error(error);
        })
    }

    function openLocationRecoder() {
        captureLocationVisible.value = true;
    }

    function handleLocationCapture(coord) {
        const { y, x } = coord;
        recordLocationY.value = y;
        recordLocationX.value = x;
        console.log(recordLocationY.value, recordLocationX.value);
        captureLocationVisible.value = false;
    }
</script>

<template>
    <h1>새로운 조각</h1>

    <div class="mt-10">
        <div class="toolbar">
            <input type="file" id="input-media-from-gallery" accept="image/*" @change="onInputChange">
            <input type="file" id="input-image-from-camera" accept="image/*" capture="environment" @change="onInputChange">
            <v-btn-group
                divided
                variant="outlined"
            >
                <v-btn icon="mdi-paperclip" @click="openInputGallery"></v-btn>
                <v-btn icon="mdi-image-outline" @click="openInputImage"></v-btn>
                <v-btn icon="mdi-video-outline" @click="openVideoCamera"></v-btn>
                <v-btn icon="mdi-microphone-outline" @click="openAudioRecoder"></v-btn>
                <v-btn icon="mdi-map-marker-outline" @click="openLocationRecoder"></v-btn>
            </v-btn-group>
        </div>

        <div class="preview-map my-8" v-if="recordLocationX !== 0 && recordLocationY !== 0">
            <record-map class="map-container"
                :record-location-x="recordLocationX"
                :record-location-y="recordLocationY"/>
        </div>

        <div class="preview my-8">
            <img v-if="recordImageUrl !== ''" :src="recordImageUrl" class="media-preview">
            <video v-if="recordVideoUrl !== ''" :src="recordVideoUrl" class="media-preview" autoplay playsinline controls />
            <audio :src="recordAudioUrl" controls v-if="recordAudioUrl != ''"></audio>
        </div>

        <div>
            <v-textarea
            v-model="recordComment"
            label="조각 내용"
            variant="outlined" />
            <div class="comment-length">{{ commentLength }} / {{ MAX_COMMENT_LENGTH }}</div>
        </div>

        <div class="toolbar">
            <v-btn icon="mdi-arrow-up-thin-circle-outline" color="primary" @click="uploadRecord"></v-btn>
        </div>
    </div>

    <capture-image v-if="captureImageVisible" @captured="handleImageCapture" />
    <capture-video v-if="captureVideoVisible" @captured="handleVideoCapture" />
    <capture-audio v-if="captureAudioVisible" @captured="handleAudioCapture" />
    <capture-location v-if="captureLocationVisible" @captured="handleLocationCapture" />
</template>

<style scoped>
h1 {
  text-align: center;  
  font-size: 24px;
}

.toolbar {
    text-align: center;
    margin-bottom: 15px;
}

.comment-length {
    font-size: 85%;
}

.preview {
    text-align: center;
}

.media-preview {
    width: 70%;
}

.map-container {
    z-index: 0;
}

input {
    display: none;
}

@media (max-width: 768px) { 
    .media-preview {
        width: 100%;
    }
} 
</style>