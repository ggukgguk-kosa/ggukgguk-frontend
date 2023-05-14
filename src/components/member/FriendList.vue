<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

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
// 친구 추가 및 차단으로 이동
function goToFriendAndblock() {
    router.push('/friend/new');
}
// 임의로 작성한 코드로 수행
function sendLinkDefault() {
    // 꾹꾹 회원으로 로그인 시, 나의 아이디를 공유하기 위해 먼저 카카오 로그인을 먼저 수행해야 함.
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init("f0b4268c10a9c956df9816637eede528");
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '꾹꾹 회원 아이디 공유',
        description: '친구분의 아이디는 '+ memberId.value + 
        '이며 당신과 교류하고 싶습니다. #꾹꾹 #일기 #교환일기',
        imageUrl:
          'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          mobileWebUrl: 'https://app.ggukgguk.online/login',
          webUrl: 'https://app.ggukgguk.online/login',
        },
      },
      buttons: [
        {
          title: '자세히 보기',
        link: {
          mobileWebUrl: 'https://app.ggukgguk.online/login',
          webUrl: 'https://app.ggukgguk.online/login',
          },
        }
      ],
    })
}

// // 친구에게 꾹꾹 회원 ID 공유하기
// function sendLinkCustom() {
//     // 꾹꾹 회원으로 로그인 시 로그인을 먼저 수행해야 함.
//     if (!window.Kakao.isInitialized()) {
//         window.Kakao.init("f0b4268c10a9c956df9816637eede528");
//     }
    
//     window.Kakao.Link.sendCustom({
//         templateId: 93730
//     });
// }
</script>  
<template>
    <!--무한 스크롤을 구현해야 할 듯 함.-->
    <v-container>
        <v-card-title>친구 목록</v-card-title>
        <v-row>
            <v-col>
                <v-btn @click="sendLinkDefault">친구에게 아이디 공유하기</v-btn>
            </v-col>
            <v-col cols="auto" class="text-end">
                <v-btn @click="goToFriendAndblock">친구 추가 및 차단 </v-btn>
            </v-col>
        </v-row>
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