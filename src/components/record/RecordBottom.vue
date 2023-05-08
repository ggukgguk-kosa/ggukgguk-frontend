<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const memberId = computed(() => {
            return store.getters['auth/memberInfo'].memberId;
        })

function goToRecord() {
    route.name === "recordMain" ? getRecordList() : router.push('/record');
}

function setFriendId(friendId) {
    store.commit('record/setFriendId', friendId);
}

function getRecordList() {
  setFriendId(null);
  store.dispatch("record/getRecordList", memberId.value)
  .catch((error) => {
        console.error('조각 리스트 조회 실패');
        console.error(error);
  })
}

function goToRecordNew() {
    router.push({ name: 'recordAdd' });
}

function goToSetting() {
    router.push({ name: 'settingView' });
}

function goToNotify() {
    router.push({ name: 'notificationView' });
}

</script>

<template>
    <v-bottom-navigation>
        <v-btn value="home" @click="goToRecord">
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="noti" @click="goToNotify">
            <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn value="record" class="record-btn" color="red" @click="goToRecordNew">
            <v-icon>mdi-circle</v-icon>
        </v-btn>

        <v-btn value="member">
            <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn value="setting" @click="goToSetting" >
            <v-icon>mdi-cog</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
.record-btn {
    font-size: xx-large !important;
    color: red;
}

.v-bottom-navigation .v-bottom-navigation__content > .v-btn {
    min-width: 70px;
}
</style>