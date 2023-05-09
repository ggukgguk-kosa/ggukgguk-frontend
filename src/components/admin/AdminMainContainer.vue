<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

const store = useStore();

const isLoading = ref(false);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = ref({
    responsive: true
});

const rawData = computed(() => {
    return store.getters['admin/dailyReport'];
})

const memberChartData = computed(() => {
    const newMember = rawData.value.newMember;

    return {
        labels: newMember?.map((item) => {
            return item.date;
        }),
        datasets: [{
            label: '일자별 회원가입수',
            data: newMember?.map((item) => {
                return item.count;
            }),
            backgroundColor: '#3AA73A'
        }]
    }
})

const recordChartData = computed(() => {
    const newRecord = rawData.value.newRecord;

    return {
        labels: newRecord?.map((item) => {
            return item.date;
        }),
        datasets: [{
            label: '일자별 조각 등록수',
            data: newRecord?.map((item) => {
                return item.count;
            }),
            backgroundColor: '#3AA73A'
        }]
    }
})

const replyChartData = computed(() => {
    const newReply = rawData.value.newReply;

    return {
        labels: newReply?.map((item) => {
            return item.date;
        }),
        datasets: [{
            label: '일자별 댓글 등록수',
            data: newReply?.map((item) => {
                return item.count;
            }),
            backgroundColor: '#3AA73A'
        }]
    }
})

onMounted(()=>{
    requestAnalysisData();
    requestDailyReport();
})

const analysisData = computed(() => {
    return store.getters['admin/analysisData'];
})

function requestDailyReport() {
    store.dispatch('admin/getDailyReportAll')
    .then(() => {
        console.log('일자별 추이 데이터 가져오기 성공');
    })
    .catch((error) => {
        console.error('일자별 추이 데이터 가져오기 성공');
        console.error(error);
    });
}

function requestAnalysisData(){
    isLoading.value = true;

    store.dispatch('admin/getAnalysisData')
    .then(() => {
        console.log('성공');
        isLoading.value = false;
    })
    .catch((error)=>{
        console.error("관리자 페이지 불러오기 실패");
        console.error(error);
        isLoading.value = false;
    })
}
</script>

<template>
    <v-overlay
        v-model="isLoading"
        scroll-strategy="block"
        persistent
    >
        <v-progress-circular
        color="primary"
        indeterminate
        size="64"
        ></v-progress-circular>
    </v-overlay>

    <v-row>
        <v-col cols="6">
            <v-card
                title="주요 지표"
                variant="outlined">
                <v-card-text>
                    <ul class="mx-8">
                        <li>전체 회원 수: {{ analysisData.totalMember }}</li>
                        <li>오늘 가입 수: {{ analysisData.todayMember }}</li>
                        <li>전체 조각 수: {{ analysisData.totalContent }}</li>
                        <li>오늘 조각 수: {{ analysisData.todayContent }}</li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card
                title="일자별 회원가입 수"
                variant="outlined">
                <Line
                    id="member-chart"
                    :options="chartOptions"
                    :data="memberChartData"
                />
            </v-card>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="6">
            <v-card
                title="일자별 조각 등록 수"
                variant="outlined">
                <Line
                    id="record-chart"
                    :options="chartOptions"
                    :data="recordChartData"
                />
            </v-card>
        </v-col>

        <v-col cols="6">
            <v-card
                title="일자별 댓글 등록 수"
                variant="outlined">
                <Line
                    id="reply-chart"
                    :options="chartOptions"
                    :data="replyChartData"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.v-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>