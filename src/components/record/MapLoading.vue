<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'

let map = null;

const selectedX = ref(126.570667);
const selectedY = ref(33.450701);

function initMap() {
  const container = document.getElementById("map");
  const options = {
    // eslint-disable-next-line
    center: new kakao.maps.LatLng(selectedY.value, selectedX.value),
    level: 3,
  };
  // eslint-disable-next-line
  map = new kakao.maps.Map(container, options);
}

const query = ref('');
const searchResults = ref([]);
const selectedPlace = ref('');

// 검색 함수
async function search() {
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query.value}`, {
      headers: {
        'Authorization': `KakaoAK 5ea819ef84ce3ccfc25b2df1e6337c8f`,
      }
    })
    console.log(response);
    searchResults.value = response.data.documents
  } catch (error) {
    console.log(error)
  }
}

// 결과 선택 함수
function selectResult(result) {
  console.log(result);
  selectedPlace.value = result.place_name;
  selectedX.value = result.x;
  selectedY.value = result.y;
  searchResults.value=[];
  initMap();
  showOnMap();
}

// 선택된 장소를 지도에 표시
function showOnMap() {
  // eslint-disable-next-line
  const latLng = new kakao.maps.LatLng(selectedY.value, selectedX.value);
  map.setCenter(latLng);
  // eslint-disable-next-line
  const marker = new kakao.maps.Marker({
    position: latLng,
  });
  marker.setMap(map);
}

onMounted(() => {
  initMap();
});

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-text-field v-model="query" label="장소 검색" @keyup.enter="search"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn @click="search">검색</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn>선택</v-btn>
      </v-col>
    </v-row>

      <v-row v-if="searchResults.length">
        <v-col cols="12">
          <v-card style="position: absolute; top: 80px; left: 0; right: 0; bottom: 0; z-index: 1; overflow-y: auto;">
            <v-list>
              <v-list-item v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
                <v-list-item-title>{{ result.place_name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div id="map" class="map" style="position: relative; z-index: 0;"></div>
        </v-col>
      </v-row>
  </v-container>
</template>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>