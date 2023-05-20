<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
    getNoticeList();
})

const showDetail = ref(false);

const noticeDetail = ref({});

const noticeList = computed(() => {
    return store.getters['admin/noticeList'];
})

const noticeOption = computed(() => {
    return store.getters['admin/noticeOption'];
});

const totalPage = computed(() => {
    const totalItem = store.getters['admin/noticeTotal'];
    const pageSize = store.getters['admin/noticeOption'].size;

    const computed = Math.ceil(totalItem / pageSize);
    if (!computed) { 
        return 1;
    }
    return computed;
})

watch(noticeOption,() => {
    getNoticeList();
},
{ deep: true });

function getNoticeList() {
    store.dispatch("admin/getNoticeList")
        .catch((error) => {
            console.error('공지사항 리스트 조회 실패');
            console.error(error);
        })
}

function showDialog(notice) {
    noticeDetail.value = notice;

    showDetail.value = true;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}년 ${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일 ${hour}시 ${minute}분`;
}
</script>

<template>
    <v-dialog
      v-model="showDetail"
      width="auto"
    >
      <v-card>
        <v-card-title>
            {{ noticeDetail.noticeTitle }}
        </v-card-title>
        <v-card-text>
          <ul>
              <li>내용 : {{ noticeDetail.noticeContent }}</li>
              <li>작성일: {{ formatDate(new Date(noticeDetail.noticeCreatedAt)) }}</li>
        </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showDetail = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col class="mt-8">
        <v-row>
            <h2 class="section-title">공지사항</h2>
        </v-row>
        <v-row class="d-flex flex-column align-center justify-center">
            <v-table style="width: 100%">
                <thead>
                    <tr>
                        <th class="text-center">
                            제목
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in noticeList" :key="item.noticeId" class="text-center">
                        <td @click="showDialog(item)">{{ item.noticeTitle }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-row>
        <v-row class="d-flex flex-column align-center justify-center">
            <v-pagination v-model="noticeOption.page" :total-visible="5" :length="totalPage"></v-pagination>
        </v-row>
    </v-col>

</template>