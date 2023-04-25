<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';

const store = useStore();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const keyword = ref(null);

function setStartDateStr(){
  store.commit('record/setStartDateStr', null);
}

function setKeyword(){
  store.commit('record/setKeyword', keyword.value);
}

function handleSearch(){
  setStartDateStr();
  setKeyword();
  store.dispatch('record/getRecordList', memberId.value);
}

// 캘린더 조회, 선택
const showDatePicker = ref(false);
const selectedDate = ref(new Date());


// function formatDate(date) {
//   console.log(date);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
// }

// const startDate = ref(new Date());

// function setStartDateStr(startDateStr) {
//     store.commit('record/setStartDateStr', startDateStr);
// }

// function getRecordList() {
//   store.dispatch("record/getRecordList", memberId.value)
//   .catch((error) => {
//         console.error('조각 리스트 조회 실패');
//         console.error(error);
//   })
// }

// const router = useRouter();


</script>

<template>
  <v-menu v-model="showDatePicker" offset-y>
    <template #activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
    </template>
    <VCalendar v-model="selectedDate" />
  </v-menu>

  <v-text-field
    v-model="keyword"
    label="Search"
    placeholder="Enter search keyword"
    clearable
    solo-inverted
    @keydown.enter="handleSearch"
  />
</template>