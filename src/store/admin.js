import { admin } from '../api';

export default {
  namespaced: true,
  state: {
    noticeOption: {
      page: 1,
      size: 10
    },
    noticeList: [],
    noticeTotal: 0,
  },
  getters: {
    noticeOption(state) {
      return state.noticeOption
    },
    noticeList(state) {
      return state.noticeList
    },
    noticeTotal(state) {
      return state.noticeTotal;
    },
  },
  mutations: {
    setNoticePage(state, page) {
      state.noticeOption.page = page;
    },
    setNoticeList(state, noticeList) {
      state.noticeList = noticeList;
    },
    setNoticeTotal(state, noticeTotal) {
      state.noticeTotal = noticeTotal;
    },
  },
  actions: {
    // eslint-disable-next-line
    uploadNotice({ commit }, { noticeTitle, noticeContent }) {
      return admin.addNotice({ noticeTitle, noticeContent });
    },
    getNoticeList({ commit, state }) {
      const { page, size } = state.noticeOption;

      return admin.getNoticeList({ page, size })
      .then((response) => {
        commit('setNoticeList', response.data.data.list);
        commit('setNoticeTotal', response.data.data.total)
      })
    },
  }
};

// Vue.js 애플리케이션에서 사용되는 상태 관리를 위한 Vuex Store를 포함하는 위치
// Vuex는 Vue.js 애플리케이션에서 데이터를 중앙 집중화하여 구성하고, 다양한 컴포넌트에서 공유하여 사용할 수 있게 해줌. 이를 통해 애플리케이션에서 발생하는 복잡한 데이터 관리 문제 해결 가능
// Vuex Store와 관련된 코드가 포함. 예를 들어, Vuex Store의 상태(state), 변이(mutation), 액션(action), 게터(getter) 및 모듈(module) 등의 코드가 포함될 수 있음
// src/store/index.js" 파일은 일반적으로 Vue.js 애플리케이션의 진입점에서 로드되며, Vuex Store를 초기화하고 애플리케이션에 연결
