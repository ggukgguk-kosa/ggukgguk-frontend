<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

function formatDate(date) {
  console.log(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

const recordList = computed(() => {
    return store.getters['record/recordList']
})

const startDate = ref(new Date());
// recordList 배열에서 가장 최근 recordCreatedAt 값을 추출
const latestRecordCreatedAt = computed(() => {
  return recordList.value.reduce((latest, record) => {
    const createdAt = new Date(record.recordCreatedAt);
    return createdAt > latest ? createdAt : latest;
  }, new Date(0));
})
// recordList 배열에서 가장 과거 recordCreatedAt 값을 추출
const earliestRecordCreatedAt = computed(() => {
    return recordList.value.reduce((earliest, record) => {
      const createdAt = new Date(record.recordCreatedAt);
      return createdAt < earliest ? createdAt : earliest;
    }, new Date());
})

let isLoading = ref(false);


function setStartDateStr(startDateStr) {
    store.commit('record/setStartDateStr', startDateStr);
}

function handleScroll() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // 스크롤이 맨 아래에 도달했는지 확인
  if (Math.ceil(scrollY + windowHeight) >= documentHeight && !isLoading.value) {
    isLoading.value = true;
    console.log(earliestRecordCreatedAt.value);
    startDate.value.setDate(earliestRecordCreatedAt.value.getDate() - 1); // startDate를 5일 전으로 수정
    const startDateStr = formatDate(startDate.value);
    setStartDateStr(startDateStr);
    console.log(startDateStr);
    getRecordsMore();
  }

  // 스크롤이 맨 위에 도달했는지 확인
  if (scrollY === 0 && !isLoading.value) {
    isLoading.value = true;
    startDate.value.setDate(latestRecordCreatedAt.value.getDate() + 5); // startDate를 5일 후로 수정
    const startDateStr = formatDate(startDate.value);
    setStartDateStr(startDateStr);
    console.log(startDateStr);
    getRecordsMore();
  }
}

window.addEventListener('scroll', handleScroll);

function setDiaryYear(year) {
    if(year == null) {
        year = new Date().getFullYear();
    } 
    store.commit('diary/setDiaryYear', year);
}

function setDiaryMonth(month){
    store.commit('diary/setDiaryMonth', month);
}

function getRecordList() {
  store.dispatch("record/getRecordList", memberId.value)
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}

function getRecordsMore() {
  isLoading.value = true;
  store.dispatch("record/getRecordsMore", memberId.value)
  .then(() => {
        isLoading.value = false;
  })
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}


async function getDiaryList() {
    await store.dispatch("diary/getDiaryList", memberId.value)
    .catch((error) => {
        console.error('다이어리 리스트 조회 실패');
        console.error(error);
    })
}

const router = useRouter();

const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(null);

watch(selectedYear, () => {
    setDiaryYear(selectedYear.value);
    setDiaryMonth(null);
    getDiaryList();
})

watch(selectedMonth, async () => {
    setDiaryMonth(selectedMonth.value);
    await getDiaryList();
    router.push('/calendar');
})


onMounted(() => {
  getRecordList();
})

</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="record in recordList"
        :key="record.recordId"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
          width="400"
        >
          <v-card-text>{{ record.recordCreatedAt }}</v-card-text>
          <v-card-text>{{ record.recordComment }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>