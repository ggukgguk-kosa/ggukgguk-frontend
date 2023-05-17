<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { friend } from '../../api';
import { diary } from '../../api';


const store = useStore();
const router = useRouter();

const checked = ref([]);
const toMemberId = ref('');



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

// 나의 친구요청 테이블 조회
async function getFriendRequestList(referenceId) {
  console.log(referenceId);
  await store.dispatch("friend/getRequestFriendList",
    {
      friendRequestId: referenceId
    })
    .then((response) => {
      console.log("친구 요청 테이블 조회");
      console.log(response);
      toMemberId.value = response.data.data[0].fromMemberId;
      console.log(toMemberId.value);
    }).catch(() => {
    });
}

// 친구 수락 
async function applyFriendrelationShip(referenceId) {
  await getFriendRequestList(referenceId);
  console.log(toMemberId.value); // 친구 요청을 보낸사람의 아이디를 가져옴 => 회신 목적
  return friend.applyFriendRequest(toMemberId.value)
    .then((response) => {
      console.log("친구요청 수락 완료")
      console.log(response)
    }).catch(() => {})

}
const diaryYear = ref('');
const diaryMonth = ref('');

// 알림 상세 보기 (라우터로 해당 댓글 / 월말 결산 / 교환일기 이동)
function detailNotify(referenceId,notificationTypeId){
 
  // 월말 결산 알림인 경우
  if(notificationTypeId === 'MONTHLY_ANALYSIS'){
      console.log(referenceId)
      return diary.getNotifyDiaryList(referenceId)
      .then((response)=>{
        console.log(response);
        diaryYear.value = response.data.data[0].diaryYear
        diaryMonth.value = response.data.data[0].diaryMonth
        console.log("월말결산 해당 연도 : " + diaryYear.value) //2023
        console.log("월말결산 해당 달 : " + diaryMonth.value) // 4
        store.commit('diary/setDiaryYear', diaryYear.value);
        store.commit('diary/setDiaryMonth', diaryMonth.value);
        router.push({ name: "CalendarMain"});
      })

  }
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
        <div v-if="notify.notificationTypeId === 'FRIEND_REQUEST'"> {{ notify.notificationMessage }}</div>
        <div v-if="notify.notificationTypeId === 'EXCHANGE_DIARY'"> 상대방이 교환일기를 요청하였습니다. {{ notify.notificationMessage }}
        </div>
        <div v-if="notify.notificationTypeId === 'FRIEND_BIRTHDAY'">친구분의 생일입니다. {{ notify.notificationMessage }}</div>
        <div v-if="notify.notificationTypeId === 'MONTHLY_ANALYSIS'"> {{ notify.notificationMessage }}</div>
      </v-card-text>
      <v-card-actions class="justify-end pt-1 pb-0">
        <v-checkbox v-model="checked" :value="notify.notificationId" class="mt-n4"
          @change="() =>{detailNotify(notify.referenceId,notify.notificationTypeId); readNotify(notify.notificationId)}"></v-checkbox>
      <!-- 수락 컴포넌트를 만든 이유.. 음 체크박스는 단순히 읽음의 용도로와 해당 위치의 라우터로 넘길 수 있지만,
           친구 요청 알림은 수락 or 거절의 2가지 옵션이 있어서, 음 수락하려고 하면 수락버튼을 누르고 진행, 아니면 싫으면 단순히 체크박스를 클릭후 
           넘길 수 있게 하는게 어떨런지 궁금함.
      -->
      <v-btn v-if="notify.notificationTypeId === 'FRIEND_REQUEST'" @click="() => { applyFriendrelationShip(notify.referenceId); readNotify(notify.notificationId); }">
        수락 </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
