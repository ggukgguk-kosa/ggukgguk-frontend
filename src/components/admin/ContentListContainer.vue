<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  getContentList();
})


const isLoading = ref(false);

const contentList = computed(() => {
    return store.getters['admin/contentList'];
})

const currentOption = computed(() => {
    return store.getters['admin/contentOption'];
});

const currentPage = computed(() => {
    return store.getters['admin/contentOption'].page;
});

const totalPage = computed(() => {
    const totalItem = store.getters['admin/contentTotal'];
    const pageSize = store.getters['admin/contentOption'].size;
    const computed = Math.ceil(totalItem / pageSize);

    if (!computed) { // NaN인 경우 페이지네이션 컴포넌트의 Validation 로직에 걸리게 되므로 한 번 걸러준다
        return 1;
    }
    return computed;
})

watch(currentPage, () => {
    getContentList();
})

function getContentList() {
    isLoading.value = true;
    store.dispatch("admin/getContentList")
    .then(() => {
        isLoading.value = false;
        console.log('성공');
    })
    .catch((error) => {
        isLoading.value = false;
        console.error('컨텐츠 리스트 조회 실패');
        console.error(error);
    })
}

// function setPage(page) {
//     if (page < 1 || page > totalPage.value) return;
//     store.commit('admin/setContentPage', page);
// }
</script>

<template>
    <v-overlay class="loading-overlay" v-model="isLoading" scroll-strategy="block" persistent>
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- <v-card
        v-for="content in contentList"
        width="400"
        :title="content.contentTitle"
        :text="`[${content.recordId}, ${content.memberId}, ${content.recordCreatedAt}, 
                 ${content.mediaFileBlocked}, ${content.mediaFileChecked}]` + content.contentContent"
        :key="content.recordId"
    >
        <v-btn @click="contentDetail(content.recordId)">상세보기</v-btn>
    </v-card>
    <v-btn @click="setPage(currentPage-1)">이전</v-btn>
    {{ currentPage }} / {{ totalPage }}
    <v-btn @click="setPage(currentPage+1)">다음</v-btn> -->

    <v-col class="mt-8">
        <v-row>
            <h2 class="section-title">상세 조회</h2>
        </v-row>
        <!-- <v-row>
            <v-select v-model="selectedJobName"
                :items="JOBS"
                item-title="label"
                item-value="value"
                label="배치 작업 선택"></v-select>
        </v-row> -->
        <v-row class="d-flex flex-column align-center justify-center">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            조각 ID
                        </th>
                        <th class="text-left">
                            작성자 ID
                        </th>
                        <th class="text-left">
                            작성 일시
                        </th>
                        <th class="text-left">
                            미디어 ID
                        </th>
                        <th class="text-left">
                            미디어 타입
                        </th>
                        <th class="text-left">
                            모니터링 여부
                        </th>
                        <th class="text-left">
                            차단 여부
                        </th>
                        <th class="text-left">
                            세부 정보
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in contentList" :key="item.recordId">
                        <td>{{ item.recordId }}</td>
                        <td>{{ item.memberId }}</td>
                        <td>{{ item.recordCreatedAt }}</td>
                        <td>{{ item.mediaFileId }}</td>
                        <td>{{ item.mediaTypeId }}</td>
                        <td>{{ item.mediaFileChecked === 1 ? 'TRUE' : 'FALSE' }}</td>
                        <td>{{ item.mediaFileBlocked === 1 ? 'TRUE' : 'FALSE' }}</td>
                        <td>
                            <v-btn @click="showDetailDiag(item)">보기</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-row>
        <v-row class="d-flex flex-column align-center justify-center">
            <v-pagination v-model="currentOption.page" :total-visible="6" :length="totalPage"></v-pagination>
        </v-row>
    </v-col>
</template>

<style scoped>
.loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>