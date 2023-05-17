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

const recordDialog = ref(false);


</script>
<template>
  <h1>알림 목록</h1>
  <div>
    <v-btn
        color="primary"
      >
        조각 보기
  
        <v-dialog
          v-model="recordDialog"
          activator="parent"
          width="auto"
        >
          <v-card class="card" :style="{ borderColor: record.mainColor }" variant="outlined">
            <!-- 헤더 영역 -->
            <v-row>
                <v-col cols="10">
                  {{ formatDate(new Date(record.recordCreatedAt), true) }}
                </v-col>
                <v-col cols="2" class="d-flex justify-end">
                  <span
                  v-if="memberId === record.memberId && !record.recordShareTo"
                  @click="goToRecordUpdate(record)"><v-icon icon="mdi-pencil-outline"></v-icon></span>
                  <span
                  v-if="!friendId"
                  @click="openDeleteRemoveDialog(record)">삭제</span>
                </v-col>
            </v-row>
            <v-card-text v-if="!friendId && record.memberId !== memberId" :style="{ fontStyle: 'italic' }"> {{ record.memberNickname }}(으)로부터 </v-card-text>
            <v-card-text v-if="!friendId && record.recordShareTo && record.memberId === memberId" :style="{ fontStyle: 'italic' }"> {{ record.friendNickname }}(이)에게 </v-card-text>
            <v-card-text v-if="friendId && record.memberId !== friendId" :style="{ fontStyle: 'italic' }"> {{ record.memberNickname }}(으)로부터 </v-card-text>
            <v-card-text v-if="friendId && record.recordShareTo && record.memberId === friendId" :style="{ fontStyle: 'italic' }"> {{ record.friendNickname }}(이)에게 </v-card-text>

            <!-- 본문 영역 -->
            <v-card-text class="mb-8 record-comment" style="white-space: pre-wrap">
              {{ record.recordComment }}
            </v-card-text>

            <!-- 미디어 영역 -->
            <div v-if="record.mediaTypeId || record.recordLocationX !==0" class="media-wrapper">
              <record-map v-if="record.recordLocationX !== 0" :recordLocationX="record.recordLocationX" :recordLocationY="record.recordLocationY" class="media map-container"></record-map>
              <video v-if="record.mediaTypeId==='video'" :src="`${BASE_URI}record/media/${record.mediaFileId}?mediaType=${record.mediaTypeId}`" autoplay playsinline controls class="media"></video>
              <v-img v-if="record.mediaTypeId==='image'" :src="`${BASE_URI}record/media/${record.mediaFileId}?mediaType=${record.mediaTypeId}`" class="media" />
              <audio v-if="record.mediaTypeId==='audio'" controls :src="`${BASE_URI}record/media/${record.mediaFileId}?mediaType=${record.mediaTypeId}`" class="media"></audio>
            </div>

            <v-divider></v-divider>

            <!-- 댓글 영역 -->
            <!-- 댓글이 없을 때에도 replyId가 0인 값이 반환되는 버그가 있어, -->
            <!-- 우선 리스트 마지막 값의 replyId가 0이면 보이지 않도록 해놓음  -->
            <div class="ma-2">댓글</div>
            <v-list dense v-if="record?.replyList[record.replyList.length-1]?.replyId !== 0">
              <v-list-item v-for="reply in record.replyList" :key="reply.replyId">
                <v-list-item-title v-if="reply.replyId !== 0">
                  <div class="mb-2">
                    <div>
                      <div style="display: flex; justify-content: space-between;">
                        <div class="font-weight-bold mr-2">{{ reply.memberNickname }}</div>
                        <div>
                          <span @click="openEditReplyForm(reply)" class="mr-1">수정 |</span>
                          <span @click="openDeleteReplyDialog(reply)">삭제</span>
                        </div>
                      </div>
                      <div>
                        <div style="white-space: normal">{{ reply.replyContent }}</div>
                      </div>
                    </div>
                    <v-form v-if="editReplyForm && reply.replyId === editReplyId">
                      <v-row>
                        <v-col cols="10">
                          <v-text-field v-model="editReplyContent" required></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-btn
                          :style="{ border: '2px solid ' + record.mainColor, color: record.mainColor }"
                          class= "button"
                          @click="editReply(reply)">수정</v-btn>
                          <v-btn 
                          :style="{ border: '2px solid ' + record.mainColor, color: record.mainColor }"
                          class= "button"
                          @click="cancelEditReply">취소</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-form class="d-flex align-center">
              <v-text-field class="ml-1" :value="newReplyContent[record.recordId]" @input="newReplyContent[record.recordId] = $event.target.value" required></v-text-field>
              <v-btn 
              :style="{ border: '1px solid ' + record.mainColor, color: 'black', backgroundColor: record.mainColor }"
              class= "button"
              @click="addReply(record.recordId); newReplyContent[record.recordId] = ''" :disabled="newReplyContent === ''">등록</v-btn>
            </v-form>
            <v-card-actions>
              <v-btn color="primary" block @click="recordDialog = false">Close Dialog</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
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
