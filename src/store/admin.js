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
    dailyReport: {}
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
    dailyReport(state) {
      return state.dailyReport;
    }
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
    setDailyReportAll(state, dailyReport) {
      state.dailyReport = dailyReport;
    }
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
    getDailyReportAll({ commit }) {
      return admin.getDailyReportAll()
      .then((response) => {
        commit('setDailyReportAll', response.data.data);
      })
    }
  }
};