<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


const store = useStore();

const router = useRouter();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const friendId = computed(() => {
            return store.getters['record/recordOption'].friendId;
})

const diaryYear = computed(() => {
            return store.getters['diary/diaryOption'].diaryYear;
})

const diaryMonth = computed(() => {
            return store.getters['diary/diaryOption'].diaryMonth;
})

const diaryList = computed(() => {
            return store.getters['diary/diaryList'];
})

function setDiaryYear(year) {
    if(year == null) {
        year = new Date().getFullYear();
    } 
    store.commit('diary/setDiaryYear', year);
}

function setDiaryMonth(month){
    store.commit('diary/setDiaryMonth', month);
}

async function getDiaryList() {
    if(friendId.value !== null && friendId.value !== undefined){
          await store.dispatch("diary/getDiaryList", friendId.value)
          .catch((error) => {
          console.error('다이어리 리스트 조회 실패');
          console.error(error);
    })
    } else {
      await store.dispatch("diary/getDiaryList", memberId.value)
      .catch((error) => {
          console.error('다이어리 리스트 조회 실패');
          console.error(error);
      })
    }
    console.log(diaryList.value.diaryRecordList);
}

function setRecordCount(){
    // diaryRecordList의 각 객체를 순회하면서 date 배열을 만들어 attributes에 추가
  for (const record of diaryList.value.diaryRecordList) {
    const date = new Date(diaryYear.value, diaryMonth.value - 1, record.recordDay);
    const dots = [];
    for (let i = 0; i < record.recordCount; i++) {
      dots.push({ dot: true, dates: [date], color: mainColor.value });
    }
    attributes.value = attributes.value.concat(dots);
  }
}



const selectedYear = ref(diaryYear.value);
const selectedMonth = ref(diaryMonth.value);
const years = [new Date().getFullYear(), new Date().getFullYear()-1, new Date().getFullYear()-2];
const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

watch(selectedYear, () => {
    setDiaryYear(selectedYear.value);
    setDiaryMonth(null);
    router.push('/diary');
})

watch(selectedMonth, async () => {
    setDiaryMonth(selectedMonth.value);
    calendar.value.move({ month: selectedMonth.value, year: selectedYear.value })
    await getDiaryList();
    setRecordCount();
})

// 캘린더

const calendar = ref(null);


// attributes 변수를 빈 배열로 초기화
const attributes = ref([]);

// mainColor 값 가져오기
const mainColor = computed(() => diaryList.value.mainColor);

// 날짜 클릭하면 해당 날짜기준 조각 조회
function handleDateClick({date}) {
  const clickedDate = new Date(date)
  const dateStr = formatDate(clickedDate);
  store.commit('record/setStartDateStr', dateStr);
  router.push('/record');
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}



function goToColor(){
  router.push('/color'); 
}

async function onMountedHandler() {
  if(diaryMonth.value==null){
    setDiaryMonth(new Date().getMonth());
    await getDiaryList();
    console.log("null실행")
    calendar.value.move({ month: diaryMonth.value, year: diaryYear.value });
    setRecordCount();
  } else {
    await getDiaryList();
    console.log("아님아님")
    calendar.value.move({ month: diaryMonth.value, year: diaryYear.value });
    setRecordCount();
  }
}

onMounted(onMountedHandler)

</script>

<template>
  <v-container :style="{ backgroundColor: mainColor, borderRadius: '10px' }" class="mt-15" >
    <v-row>
      <v-col cols="6">
        <v-select
          class="my-select"
          v-model="selectedYear"
          :items="years"
          label="Year"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          class="my-select"
          v-model="selectedMonth"
          :items="months"
          label="Month"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
          <VCalendar expanded
          ref="calendar"
          :attributes="attributes"
          @dayclick="handleDateClick"
          class="calendar"
          />
    </v-row>
  </v-container>
  <v-icon
    @click="goToColor"
  >
    mdi-palette
  </v-icon>
</template>

<style scoped>

</style>