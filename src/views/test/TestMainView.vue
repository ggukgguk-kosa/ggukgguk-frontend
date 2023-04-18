<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

onMounted(() => {
    getMedia();
})

const error = ref('');
const videoEl = ref(null);
let videoStream = null;

const constraints = reactive({
  audio: false,
  video: {
    facingMode: 'environment'
  }
});

watch(constraints, () => {
    if (videoStream !== null) {
        videoStream.getTracks().forEach((track) => {
            track.stop();
            getMedia();
        });
    }
})

function handleSuccess(stream) {
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  videoEl.value.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  error.value = msg;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function getMedia() {
  videoStream = null;

  try {
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(videoStream);
  } catch (err) {
    handleError(err);
  }
}

function toggleFacingMode() {
    const facingMode = constraints.video.facingMode;
    if (facingMode === 'environment') constraints.video.facingMode = 'user';
    else if (facingMode === 'user') constraints.video.facingMode = 'environment';
}

</script>

<template>
    <h1>꾹꾹 기술검증</h1>
    <v-btn @click="toggleFacingMode">전면 후면 토글</v-btn><br>
    <video ref="videoEl" autoplay playsinline></video>
    <div>{{ error }}</div>
</template>