<script setup>
import { onMounted, defineProps, ref } from 'vue';

let map = '';
const mapContainer = ref(null);

const props = defineProps({
  recordLocationX: Number,
  recordLocationY: Number
})

function initMap() {
  // let container = document.getElementById("map");
  let container = mapContainer.value;
  let options = {
    // eslint-disable-next-line
    center: new kakao.maps.LatLng(props.recordLocationY, props.recordLocationX),
    level: 3,
    draggable: false // 지도를 움직이지 못하게 함
  };
  // eslint-disable-next-line
  map = new kakao.maps.Map(container, options);
}


// 선택된 장소를 지도에 표시
function showOnMap() {
  // eslint-disable-next-line
  const latLng = new kakao.maps.LatLng(props.recordLocationY, props.recordLocationX);
  map.setCenter(latLng);
  // eslint-disable-next-line
  const marker = new kakao.maps.Marker({
    position: latLng,
  });
  marker.setMap(map);
}

onMounted(() => {
  initMap();
  showOnMap();
});

</script>

<template>
  <div ref="mapContainer" class="map"></div>
</template>

<style>

</style>