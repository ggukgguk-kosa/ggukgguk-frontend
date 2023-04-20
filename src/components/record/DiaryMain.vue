<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const diaryList = computed(() => {
    return store.getters['diary/diaryList']
})

function setDiaryYear(year) {
    if(year == null) {
        year = new Date().getFullYear();
    } 
    store.commit('diary/setDiaryYear', year);
}

function getDiaryList() {
    store.dispatch("diary/getDiaryList", memberId.value)
    .catch((error) => {
        console.error('다이어리 리스트 조회 실패');
        console.error(error);
    })
}

const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(null);
const years = [new Date().getFullYear(), new Date().getFullYear()-1, new Date().getFullYear()-2];
const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

watch(selectedYear, () => {
    store.commit('diary/setDiaryYear', selectedYear.value);
    store.dispatch("diary/getDiaryList", memberId.value)
    .catch((error) => {
        console.error('다른 연도 다이어리 조회 실패');
        console.error(error);
    });
})

// function onMonthChange() {
//     store.commit('diary/setDiaryMonth', selectedMonth.value);
// }

onMounted(() => {
  setDiaryYear();
  getDiaryList();
})

</script>

<template>
{{ selectedYear }}
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="selectedYear"
          :items="years"
          label="Year"
          @input="onYearChange"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="selectedMonth"
          :items="months"
          label="Month"
          @input="onMonthChange"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col
        v-for="diary in diaryList"
        :key="diary.diaryId"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
          width="400"
          :title="diary.diaryMonth"
          :style="{ backgroundColor: diary.mainColor }"
        >
          <v-card-text>{{ diary.mainKeyword }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>