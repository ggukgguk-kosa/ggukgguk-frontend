<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const memberId = computed(() => {
    return store.getters['auth/memberInfo'].memberId;
})

const friendList = computed(() => {
    return store.getters['friend/friendList'];
})

// 나의 친구 정보 가져오기
onMounted(() => {
    getFriendList();
})

function getFriendList() {
    store.dispatch('friend/getFriendList', memberId);
}
</script>  
<template>
    <!--무한 스크롤을 구현해야 할 듯 함.-->
    <v-container>
        <v-card-title>친구 목록</v-card-title>
    </v-container>
    <v-container>
        <v-row>
            <v-col v-for="friend in friendList" :key="friend.memberId" :id="friend.memberId" cols="12" xs="12">
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