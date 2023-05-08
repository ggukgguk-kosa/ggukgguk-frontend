<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();

const notifyList = computed(() => {
  return store.getters['notification/notifyList'];
})

// 나의 알림 정보를 가져오기
onMounted(() => {
  notifyListHandler();
})

// 알림 목록 조회
function notifyListHandler() {
  store.dispatch("notification/getNotifyList")
    .then((response) => {
      // console.log("테스트");
      console.log(response)
    }).catch(() => {

    });
}

</script>
<template>
  <div>
    <v-card v-for="notify in notifyList" :key="notify.notificationId" :id="notify.notificationId" cols="12" xs="12"
    class="mx-auto mb-3" max-width="450">
      <v-list lines="three">
        <v-list-item>
          <v-list-item-title>{{ notify.notificationTypeId }}</v-list-item-title>
          <v-list-item-subtitle v-if="notify.notificationTypeId === 'FRIEND_REQUEST'"> 상대방이 {{ notify.notificationMessage
          }}</v-list-item-subtitle>

          <v-list-item-subtitle v-if="notify.notificationTypeId === 'NEW_REPLY'"> 본인이 작성한 조각에 상대방이 새로운 {{
            notify.notificationMessage }}</v-list-item-subtitle>

          <v-list-item-subtitle v-if="notify.notificationTypeId === 'EXCHANGE_DIARY'"> 상대방이 교환일기를 요청하였습니다. {{
            notify.notificationMessage }}</v-list-item-subtitle>

          <v-list-item-subtitle v-if="notify.notificationTypeId === 'FRIEND_BIRTHDAY'"> 친구분의 생일입니다. {{
            notify.notificationMessage }}</v-list-item-subtitle>

          <v-list-item-subtitle v-if="notify.notificationTypeId === 'MONTHLY_ANALYSIS'"> 월말결산을 하였습니다. {{
            notify.notificationMessage }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>