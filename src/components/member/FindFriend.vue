<script setup>
import { friend } from '@/api';
import { ref } from 'vue';
// import { useStore } from 'vuex';

const FrindList = ref([]);
// const store = useStore();

const friendId = ref("");

// // 본인 로그인 아이디 가져오기 
// const memberId = computed(() => {
//     return store.getters['auth/memberInfo'].memberId;
// })

// // 친구 추가하기
// function setFriendId(friendId) {
//     store.commit('record/setFriendId', friendId);
// }

// await await 키워드를 사용하여 비동기 작업을 수행합니다.
// await 키워드를 사용하여 비동기 작업이 완료될 때까지 기다립니다. 이 때, 해당 비동기 작업이 Promise를 반환하는 함수여야 합니다.

// 나의 친구 목록 조회.



// 아이디 일부값을 찾기
async function findFriendList() {
  try {
    const response = await friend.getPartialIdSearch(friendId.value);
    FrindList.value = response.data.data;
  } catch (error) {
    console.error(error);
    // Handle error here
  }
}
</script>

<template>
    <v-container>
        <v-card-title>친구 추가 및 차단</v-card-title>
    </v-container>
    <v-card class="mx-auto" width="400">
        <template v-slot:title>
            아이디 찾기
        </template>
        <v-text-field v-model="friendId" label="찾고자 하는 친구 아이디"></v-text-field>
        <v-card-actions>
            <v-btn variant="outlined" @click="findFriendList">
                검색
            </v-btn>
        </v-card-actions>
    </v-card>

    <v-container>
        <v-row>
            <v-col v-for="friend in FrindList" :key="friend.memberId" :id="friend.memberId" cols="12" xs="12">
                <v-card class="card" :style="{ borderWidth: '2px' }">
                    <v-card-text>{{ friend.memberNickname }} 님</v-card-text>
                    <v-card-text :style="{ fontStyle: 'italic' }"> {{ friend.memberId }} </v-card-text>
                    <v-card-text :style="{ fontStyle: 'italic' }"> {{ friend.memberEmail }} </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>