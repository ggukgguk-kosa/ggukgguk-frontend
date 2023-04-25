import { record } from '../api';

export default {
  namespaced: true,
  state: {
    recordOption: {
      startDateStr: new Date().toISOString().substring(0, 10),
      keyword: null
    },
    recordList:[]
  },
  getters: {
    recordOption(state) {
      return state.recordOption
    },
    recordList(state) {
      return state.recordList
    }
  },
  mutations: {
    setStartDateStr(state, startDateStr){
      state.recordOption.startDateStr = startDateStr;
      console.log(state.recordOption.startDateStr);
    },
    setKeyword(state, keyword){
      console.log(keyword);
      state.recordOption.keyword = keyword;
    },
    setRecordList(state, recordList) {
      state.recordList = recordList;
    },
    setRecordsMore(state, recordList) {
      state.recordList = state.recordList.concat(recordList);
      state.recordList.sort((a, b) => new Date(b.recordCreatedAt) - new Date(a.recordCreatedAt))
    }
  },
  actions: {
    // eslint-disable-next-line
    getRecordList({ commit, state }, memberId) {
      return record.getRecordList(memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordList', response.data.data);
      })
    },

    getRecordsMore({ commit, state }, memberId) {
      return record.getRecordList(memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordsMore', response.data.data);
      })
    }
  }
};