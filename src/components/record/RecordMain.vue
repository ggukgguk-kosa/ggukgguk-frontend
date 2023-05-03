<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import RecordMap from './RecordMap.vue';
import DateSeparation from './DateSeparation.vue';

const store = useStore();

const BASE_URI = window.baseURI;

const topElId = ref(0);
const OFFSET = 65;

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const friendId = computed(() => {
            return store.getters['record/recordOption'].friendId;
})

const friendNickname = computed(() => {
  let nick;
  friendList.value.forEach((item) => {
    if (item.memberId === friendId.value)
      nick = item.memberNickname;
  });
  return nick;
});

const friendList = computed(() => {
            return store.getters['friend/friendList'];
})

function setFriendId(friendId) {
    store.commit('record/setFriendId', friendId);
}

function getFriendList() {
  store.dispatch('friend/getFriendList', memberId)
  .then(() => {
    isLoading.value = false;
  })
  .catch((error) => {
    console.error('친구 리스트를 불러오던 중 오류가 발생했습니다.');
    console.error(error);
  })
}

function clickFriend(friendId) {
    console.log("클릭");
    setFriendId(friendId);
    setStartDateStr(new Date().toISOString().substring(0, 10));
    noMoreDown.value = false;
    noMoreUp.value = false;
    getRecordList();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

const recordList = computed(() => {
    return store.getters['record/recordList']
});
watch(recordList, () => {
  noMoreDown.value = false;
  noMoreUp.value = false;
})

// eslint-disable-next-line
const recordCreatedAtByDayMap = computed(() => {
  const map = {};
  recordList.value.forEach(item => {
    if (!Array.isArray(map[formatDate(new Date(item.recordCreatedAt))])) {
      map[formatDate(new Date(item.recordCreatedAt))] = [];
    }

    const currentDateList = map[formatDate(new Date(item.recordCreatedAt))];
    currentDateList.push(item);
  })
  return map;
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

const isLoadingForScrollEvent = ref(false);
const isLoading = ref(false);

const noMoreUp = ref(false);
const noMoreDown = ref(false);
const noData = computed(() => {
  if (recordList.value.length === 0) return true;
  else return false;
});

function setStartDateStr(startDateStr) {
    store.commit('record/setStartDateStr', startDateStr);
}

let lastScrollPosition = 0;
const scrollThreshold = 10;

function handleScroll() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // 스크롤이 맨 아래에 도달했는지 확인
  if (Math.ceil(scrollY + windowHeight) >= documentHeight && !isLoadingForScrollEvent.value) {
    if (noMoreDown.value) {
      return;
    }

    isLoadingForScrollEvent.value = true;
    startDate.value = earliestRecordCreatedAt.value;
    startDate.value.setDate(startDate.value.getDate() - 1); // startDate를 5일 전으로 수정
    const startDateStr = formatDate(startDate.value);
    setStartDateStr(startDateStr);
    getRecordsDown();
  }

  // 스크롤이 맨 위에 도달했는지 확인
  if (scrollY === 0 && !isLoadingForScrollEvent.value && Math.abs(scrollY - lastScrollPosition) > scrollThreshold) {
    if (noMoreUp.value) {
      return;
    }

    isLoadingForScrollEvent.value = true;
    startDate.value = latestRecordCreatedAt.value;
    startDate.value.setDate(startDate.value.getDate() + 5); // startDate를 5일 후로 수정
    console.log(startDate.value);
    const startDateStr = formatDate(startDate.value);
    setStartDateStr(startDateStr);
    console.log(startDateStr);
    topElId.value = recordList.value[0]?.recordId;
    getRecordsUp();
  }

  lastScrollPosition = scrollY;
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
  isLoading.value = true;

  store.dispatch("record/getRecordList", memberId.value)
  .then(() => {
    isLoading.value = false;
  })
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}

function getRecordsUp() {
  isLoadingForScrollEvent.value = true;
  isLoading.value = true;

  store.dispatch("record/getRecordsUp", memberId.value)
  .then((data) => {
        isLoadingForScrollEvent.value = false;
        isLoading.value = false;
        document.getElementById(topElId.value)?.scrollIntoView();
        document.documentElement.scrollTop = document.documentElement.scrollTop - OFFSET;
        if (data?.length === 0) noMoreUp.value = true;
  })
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}

function getRecordsDown() {
  isLoadingForScrollEvent.value = true;
  isLoading.value = true;

  store.dispatch("record/getRecordsDown", memberId.value)
  .then((data) => {
        isLoadingForScrollEvent.value = false;
        isLoading.value = false;
        if (data?.length === 0) noMoreDown.value = true;
  })
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}

async function getDiaryList() {
    isLoading.value = true;

    await store.dispatch("diary/getDiaryList", memberId.value)
    .then(() => {
      isLoading.value = false;
    })
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

// 댓글

// 댓글 추가
const newReplyContent = ref({});

function addReply(recordId) {
  store.dispatch("record/addReply", { 
    memberId : memberId.value, 
    recordId : recordId, 
    replyContent : newReplyContent.value[recordId] })
  .catch((error) => {
        console.error('댓글 추가 실패');
        console.error(error);
  })
}

// 댓글 수정
const editReplyForm = ref(false);
const editReplyContent = ref('');
const editReplyId =ref(0);

function openEditReplyForm(reply) {
  editReplyForm.value = true;
  editReplyId.value = reply.replyId;
  editReplyContent.value = reply.replyContent;
}

function cancelEditReply() {
  editReplyForm.value = false;
  editReplyId.value = 0;
  editReplyContent.value = '';
}

function editReply(reply) {
  store.dispatch("record/editReply", { 
    memberId : memberId.value, 
    recordId : reply.recordId,
    replyId : reply.replyId, 
    replyContent : editReplyContent.value })
  .then(() => {
        editReplyForm.value = false;
        editReplyId.value = 0;
        editReplyContent.value = '';
  })
  .catch((error) => {
        console.error('댓글 수정 실패');
        console.error(error);
  })
}

const deleteReplyId = ref(0);

// 댓글 삭제
function openDeleteReplyDialog(reply) {
  
  deleteReplyId.value = reply.replyId;

    if (!confirm("삭제 또는 취소를 선택해주세요.")) {
      deleteReply(reply);
  } else {
      deleteReplyId.value = 0;
  }
}

// function closeDeleteReplyDialog() {
//   deleteDialog.value = false;
//   deleteReplyId.value = 0;
// }

function deleteReply(reply) {
  store.dispatch("record/deleteReply", {
    recordId : reply.recordId,
    replyId : reply.replyId })
  .then(() => {
        deleteReplyId.value = 0;
  })
  .catch((error) => {
        console.error('댓글 삭제 실패');
        console.error(error);
  })
}

// 맨위로
function scrollToTop() {
  window.scrollTo({
    top: 10,
    behavior: "smooth"
  });
}

onMounted(() => {
  getRecordList();
  getFriendList();
})

</script>

<template>
  <v-overlay
    v-model="isLoading"
    scroll-strategy="block"
    persistent
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>

  <h1 v-if="!friendId">조각들 |&nbsp;&nbsp;&nbsp;나 ({{ memberId }})</h1>
  <h1 v-if="friendId">조각들 |&nbsp;&nbsp;&nbsp;{{ friendNickname }} ({{ friendId }})</h1>

  <v-slide-group
        show-arrows
        class = "mt-15"
      >
        <v-slide-group-item
          v-for="friend in friendList"
          :key="friend.memberId"
          v-slot="{ isSelected }"
        >
          <v-btn
            class="ma-2"
            rounded
            :color="isSelected ? 'primary' : undefined"
            @click="clickFriend(friend.memberId)"
          >
            {{ friend.memberNickname }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
  <v-container>
    <div class="msg" v-if="noMoreUp">
      더 이상 불러올 데이터가 없습니다.
    </div>
    <v-row>
      <v-col
        v-for="record in recordList"
        :key="record.recordId"
        :id="record.recordId"
        cols="12"
        xs="12"
      >
          <date-separation
            v-if="recordCreatedAtByDayMap[formatDate(new Date(record.recordCreatedAt))][0].recordId === record.recordId"
            :date="formatDate(new Date(record.recordCreatedAt))"
            :color="record.mainColor" />
          <v-card class="card" :style="{ borderColor: record.mainColor, borderWidth: '2px' }">
          <v-card-text>{{ record.recordCreatedAt }}</v-card-text>
          <v-card-text v-if="!friendId && record.memberId !== memberId" :style="{ fontStyle: 'italic' }"> {{ record.memberNickname }}(으)로부터 </v-card-text>
          <v-card-text v-if="!friendId && record.recordShareTo && record.memberId === memberId" :style="{ fontStyle: 'italic' }"> {{ record.friendNickname }}(이)에게 </v-card-text>
          <v-card-text v-if="friendId && record.memberId !== friendId" :style="{ fontStyle: 'italic' }"> {{ record.memberNickname }}(으)로부터 </v-card-text>
          <v-card-text v-if="friendId && record.recordShareTo && record.memberId === friendId" :style="{ fontStyle: 'italic' }"> {{ record.friendNickname }}(이)에게 </v-card-text>
          <v-card v-if="record.mediaTypeId || record.recordLocationX !==0" class="card" :style="{ borderColor: record.mainColor, borderWidth: '2px', display: 'flex', justifyContent: 'center' }">
            <video v-if="record.mediaTypeId==='video'" :src="`${BASE_URI}record/media/${record.mediaFileId}?mediaType=${record.mediaTypeId}`" autoplay playsinline controls class="media"></video>
            <img v-if="record.mediaTypeId==='image'" :src="`${BASE_URI}record/media/${record.mediaFileId}?mediaType=${record.mediaTypeId}`" class="media">
            <audio v-if="record.mediaTypeId==='audio'" controls :src="`${BASE_URI}record/media/${record.mediaFileId}?mediaType=${record.mediaTypeId}`" class="media"></audio>
            <record-map v-if="record.recordLocationX !== 0" :recordLocationX="record.recordLocationX" :recordLocationY="record.recordLocationY" class="media map-container"></record-map>
          </v-card>
            <v-card-text style="display: flex; justify-content: center;">{{ record.recordComment }}</v-card-text>
          <v-divider></v-divider>
          <v-list dense>
            <div>댓글</div>
            <v-list-item v-for="reply in record.replyList" :key="reply.replyId">
              <v-list-item-title v-if="reply.replyId !== 0">
              <div class="mb-2">
                <v-row>
                  <v-col cols="10">
                    <span class="font-weight-bold">{{ reply.memberNickname }}</span>
                    <span>{{ reply.replyContent }}</span>
                  </v-col>
                  <v-col cols="2" v-if="reply.memberId === memberId" class="d-flex justify-end">
                    <span @click="openEditReplyForm(reply)">수정</span>
                    <span @click="openDeleteReplyDialog(reply)">삭제</span>
                  </v-col>
                </v-row>
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
            <v-text-field :value="newReplyContent[record.recordId]" @input="newReplyContent[record.recordId] = $event.target.value" required></v-text-field>
            <v-btn 
            :style="{ border: '2px solid ' + record.mainColor, color: 'black', backgroundColor: record.mainColor }"
            class= "button"
            @click="addReply(record.recordId); newReplyContent[record.recordId] = ''" :disabled="newReplyContent === ''">등록</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <div class="msg" v-if="noMoreDown">
      더 이상 불러올 데이터가 없습니다.
    </div>
    <div class="msg" v-if="noData">
      {{ store.getters['record/recordOption']?.startDateStr }} 부터 5일간 작성된 조각을 찾을 수 없습니다.
    </div>
  </v-container>
    <v-btn
    @click="scrollToTop"
    style="position: fixed; bottom: 80px; right: 20px;"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<style scoped>

.msg {
  text-align: center;
}

.card {
  margin: 20px;
}

.media {
  margin: 20px;
}

.button {
  margin: 8px;
}

.map-container {
  height: 400px;
  width: 400px;
}

.v-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>