<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();

const checked = ref([]);

// 전체 나의 알림 목록
const notifyList = computed(() => {
  return store.getters['notification/notifyList'];
})

// // 나의 알림 목록 -> 안읽은 목록만 나오는 설정
// const notifyList = computed(() => {
//   // 읽지 않은 알림만 필터링하여 반환
//   return store.getters['notification/notifyList'].filter(item => item.notificationIsRead === 0);
// })


// 읽지 않은 알림 수 조회
const unNotifyList = computed(() => {
  return store.getters['notification/unReadNotify'];
})


// 나의 알림 정보를 가져오기
onMounted(() => {
  notifyListHandler();
  getunreadNotify();
})

// 알림 목록 조회
function notifyListHandler() {
  store.dispatch("notification/getNotifyList")
    .then((response) => {
      console.log(response)
    }).catch(() => {

    });
}

// 읽지 않은 알림 수 
function getunreadNotify() {
  store.dispatch("notification/getUnReadNotify")
    .then((response) => {
      console.log("읽지 않은 알림의 수 : " + response.data.data);
      console.log(response)
    }).catch(() => {
    });
}

// 변동된 안읽은 알림의 수
function setUnReadNotify() {
  const updatedUnReadNotify = unNotifyList.value - 1;
  store.commit('notification/setUnReadNotify', updatedUnReadNotify);
  console.log("변경된 읽지 않은 알림 수: " + updatedUnReadNotify);
}

// 알림 읽음 처리
function readNotify(notificationId) {
  setUnReadNotify(); // 안읽은 알림 수 - 1
  console.log(notificationId);
  store.dispatch("notification/readNotify", {
    notificationId,
    notificationIsRead: 1
  })
    .then((response) => {
      console.log("읽음 처리 완료")
      console.log(response);
    })
    .catch(() => {
    });
}


</script>
<template>
  <h1>알림 목록</h1>
  <div>
    <v-card v-for="notify in notifyList" :key="notify.notificationId" :id="notify.notificationId" cols="12" xs="12"
     :color="notify.notificationIsRead === 1 ? 'grey lighten-3' : ''" class="mx-auto mb-3" max-width="450">
      <v-card-text class="d-flex flex-column align-center" style="height: 100%;">
        <div v-if="notify.notificationIsRead === 0" style="color: red;">NEW</div>
        <div>{{ notify.notificationId }}</div>
        <div class="title">{{ notify.notificationTypeId }}</div>
        <div v-if="notify.notificationTypeId === 'NEW_REPLY'"> 상대방이 {{ notify.notificationMessage }}</div>
        <div v-if="notify.notificationTypeId === 'FRIEND_REQUEST'"> 본인이 작성한 조각에 상대방이 새로운 {{
          notify.notificationMessage }}</div>
        <div v-if="notify.notificationTypeId === 'EXCHANGE_DIARY'"> 상대방이 교환일기를 요청하였습니다. {{ notify.notificationMessage }}
        </div>
        <div v-if="notify.notificationTypeId === 'FRIEND_BIRTHDAY'">친구분의 생일입니다. {{ notify.notificationMessage }}</div>
        <div v-if="notify.notificationTypeId === 'MONTHLY_ANALYSIS'"> {{ notify.notificationMessage }}</div>
      </v-card-text>
      <v-card-actions class="justify-end pt-1 pb-0">
        <v-checkbox v-model="checked" :value="notify.notificationId" class="mt-n4" @change="readNotify(notify.notificationId)"></v-checkbox>
      </v-card-actions>
    </v-card>
  </div>
</template>
