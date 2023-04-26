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
    setRecordsUp(state, recordList) {
      state.recordList = [...recordList, ...state.recordList];
    },
    setRecordsDown(state, recordList) {
      state.recordList = [...state.recordList, ...recordList];
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

    getRecordsUp({ commit, state }, memberId) {
      return record.getRecordList(memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordsUp', response.data.data);
      })
    },

    getRecordsDown({ commit, state }, memberId) {
      return record.getRecordList(memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordsDown', response.data.data);
      })
    },

    // eslint-disable-next-line
    addRecord({ }, formData) {
      return record.postRecord(formData);
    }

  }
};