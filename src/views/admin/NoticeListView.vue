<script setup>
import NoticeListContainer from '@/components/admin/NoticeListContainer.vue';
import AdminMainLayout from './AdminMainLayout.vue';
</script>

<template>
    <admin-main-layout>
        <div class="page-title">
            <h1 class="mb-8">공지사항</h1>
        </div>

        <notice-list-container />
    </admin-main-layout>
</template>

<style>
.page-title {
    width: 100%;
    text-align: right
}
</style>
<!-- 라우팅 뷰 컴포넌트들을 포함하는 위치
라우팅을 구현하기 위해서는 "vue-router" 라이브러리를 사용하며, 이 라이브러리는 각 라우팅 경로에 해당하는 컴포넌트를 지정
라우팅 경로에 해당하는 컴포넌트들이 저장됩니다. 각각의 컴포넌트는 Vue.js의 "template", "script", "style" 영역으로 나누어져 있으며, 이를 통해 해당 컴포넌트의 구조, 동작, 스타일 등을 정의
예를 들어, "src/views" 폴더에는 "Home.vue", "About.vue", "Contact.vue" 등의 컴포넌트가 포함. 이러한 컴포넌트들은 각각 Vue.js 애플리케이션의 라우팅 경로에 매핑되어, 해당 경로로 접속하면 컴포넌트가 렌더링
"src/views" 폴더에 저장된 뷰 컴포넌트들은 일반적으로 애플리케이션의 화면을 구성하는 중요한 역할
비즈니스 로직과 직접적으로 연결되는 코드가 포함 -->
