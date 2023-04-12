import { admin } from '../api';

export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line
    uploadNotice({ commit }, { noticeTitle, noticeContent }) {
      return admin.addNotice({ noticeTitle, noticeContent });
    }
  }
};