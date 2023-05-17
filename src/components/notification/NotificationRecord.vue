<script setup>
import { computed, onMounted, ref, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const BASE_URI = window.baseURI;

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

const record = ref([]);

const props = defineProps({
  recordId: Number
})

function getRecord() {
  store.dispatch("record/getRecord", {recordId : props.recordId})
  .then((response) => {
  console.log(response);
  })
}

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

    if (confirm("삭제하시겠습니까?")) {
      deleteReply(reply);
  } else {
      deleteReplyId.value = 0;
  }
}

function deleteReply(reply) {
  store.dispatch("record/deleteReply", {
    recordId : reply.recordId,
    replyId : reply.replyId,
    memberId : reply.memberId })
  .then(() => {
        deleteReplyId.value = 0;
  })
  .catch((error) => {
        console.error('댓글 삭제 실패');
        console.error(error);
  })
}

onMounted(() => {
  getRecord();
})

</script>

<template>
<!-- 조각 카드 -->
          <v-card class="card" :style="{ borderColor: record.mainColor }" variant="outlined">
            <!-- 헤더 영역 -->
            <v-row>
                <v-col cols="10">
                  {{ record.recordCreatedAt }}
                </v-col>
            </v-row>
            <v-card-text v-if="record.memberId !== memberId" :style="{ fontStyle: 'italic' }"> {{ record.memberNickname }}(으)로부터 </v-card-text>
            <v-card-text v-if="record.recordShareTo && record.memberId === memberId" :style="{ fontStyle: 'italic' }"> {{ record.friendNickname }}(이)에게 </v-card-text>
            
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
        </v-card>
</template>

<style scoped>

.msg {
  text-align: center;
}

.card {
  width: 100%;
  margin-top: 8px;
}

.media-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: auto;
}

.media {
  margin: 2px;
  width: 100%;
}

.button {
  margin: 6px;
}

.map-container {
  height: 150px;
  width: 100%;
}

.record-comment {
  font-size: 100%;
  line-height: 170%;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 데스크탑 */
@media (min-width: 1200px) {
  .card {
    width: 800px;
  }

  .record-comment {
    font-size: 120%;
    text-align: left;
    line-height: 190%;
  }
}

</style>