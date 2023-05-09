<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const MENUS = {
    logout: 'login',
    modifyMemberInfo: 'MemberInfo',
    initLocalStorage: 'initLocalStorage'
}

const memberInfo = computed(() => {
    return store.getters['auth/memberInfo'];
});

const memberRole = computed(() => {
    const { memberAuthority } = memberInfo.value;
    return memberAuthority === 'SYSTEM_ADMIN'
        ? '시스템 관리자'
        : memberAuthority === 'SERVICE_ADMIN'
            ? '서비스 관리자'
            : '잘못된 접근입니다.';
});

function goTo(from) {
    const name = MENUS[from];
    router.push({ name });
}

</script>

<template>
    <v-navigation-drawer>
        <v-list>
            <v-list-item style="text-align: center">
                <h1 style="color: #0f2a0f">꾹꾹 서비스관리</h1>
            </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
            <v-list-item
                :title="`${memberInfo.memberName} 관리자님`"
                :subtitle="memberRole"
            >
                <v-list-action>
                    <v-btn variant="text" class="mt-2" @click="goTo('logout')">로그아웃</v-btn>
                </v-list-action>
            </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-google-analytics" title="메인 (통계)" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="컨텐츠 관리" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="회원 관리" value="회원 관리"></v-list-item>
            <v-list-item prepend-icon="mdi-application-cog" title="배치작업 현황" value="배치작업 현황"></v-list-item>
            <v-list-item prepend-icon="mdi-newspaper-variant-multiple" title="공지사항" value="공지사항"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>