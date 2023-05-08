<script setup>
import { ref } from 'vue';
const allowEmail = ref(false);

// const MENUS = {
//     logout: 'login'
// }

</script>

<template>
    <h1>설정</h1>
    <v-card>
        <v-list>
            <v-list-item>
                <v-list-item-title>계정 정보</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-card>
                    <v-card-subtitle>
                        임영택(limo)님
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn>로그아웃</v-btn>
                    </v-card-actions>
                </v-card>
            </v-list-item>
            <v-list-item value="modifyMemberInfo">
                <v-list-item-title>회원정보 수정</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list >
            <v-list-item value="restoreLocalStorage">
                <v-list-item-title>어플리케이션 초기화</v-list-item-title>
                <v-list-item-subtitle>어플리케이션이 사용하는 로컬스토리지를 초기화합니다.</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>이메일 수신 설정</v-list-item-title>
                <v-list-item-subtitle>주요 알림을 이메일로 수신할 것인지 여부를 선택할 수 있습니다.</v-list-item-subtitle>
                <v-list-item-action>
                    <v-switch v-model="allowEmail" color="primary"></v-switch>
                    <div class="mt-2" style="height: 56px;">{{ allowEmail ? '수신 허용' : '수신 거부' }}</div>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>