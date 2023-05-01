<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();

const router = useRouter();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const dialog=ref(false);

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
  dialog.value = false;
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

function goToRecord(){
  router.push('/record');
}

function goToDiary(){
  router.push('/diary');
}

function goToCalendar(){
  router.push('/calendar');
}

</script>

<template>
<v-app-bar class="text-center align-content-center w-full">
 <v-dialog v-model="dialog" max-width="290" @click:outside="dialog = false">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
    </template>
        <VCalendar 
          @dayclick="handleDateClick"
        />
  </v-dialog>
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
<v-menu offset-y>
  <template v-slot:activator="{ props }">
    <v-btn icon v-bind="props">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </template>
  <v-list>
    <v-list-item>
      <v-list-item-title
        @click="goToRecord">
        조각
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title
        @click="goToDiary">
        다이어리
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title
        @click="goToCalendar">
        캘린더
      </v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</v-app-bar>

</template>