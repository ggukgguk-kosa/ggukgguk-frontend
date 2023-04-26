<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();

const router = useRouter();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const keyword = ref(null);

function setStartDateStr(){
  store.commit('record/setStartDateStr', null);
}

function setKeyword(keyword){
  store.commit('record/setKeyword', keyword);
}
 
function handleSearch(){
  setStartDateStr();
  setKeyword(keyword.value);
  store.dispatch('record/getRecordList', memberId.value);
  keyword.value=null;
  setKeyword(null);
}

const route = useRoute();

// 날짜 클릭하면 해당 날짜기준 조각 조회
function handleDateClick({date}) {
  setKeyword(null);
  const clickedDate = new Date(date)
  const dateStr = formatDate(clickedDate);
  store.commit('record/setStartDateStr', dateStr);
  route.name === "recordMain" ? getRecordList() : router.push('/record');
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

function getRecordList() {
  store.dispatch("record/getRecordList", memberId.value)
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}

</script>

<template>
<v-app-bar class="text-center align-content-center w-full">
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
      >
        <v-icon size=40>mdi-calendar</v-icon>
      </v-btn>
    </template>
    <VCalendar 
    @dayclick="handleDateClick"
    />
  </v-menu>
      <input
        v-model="keyword"
        class="v-input v-text-field__input v-text-field__input--enclosed v-text-field__input--placeholder v-text-field__input--solo w-full"
        type="text"
        placeholder="Enter search keyword"
        @keydown.enter="handleSearch"
        style="max-width: none;"
      />
  <v-btn icon
  @click="handleSearch">
    <v-icon>mdi-magnify</v-icon>
  </v-btn>
  <v-btn icon>
    <v-icon>mdi-dots-vertical</v-icon>
  </v-btn>
</v-app-bar>

</template>