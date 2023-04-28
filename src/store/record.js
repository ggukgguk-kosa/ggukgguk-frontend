import { record } from '../api';

export default {
  namespaced: true,
  state: {
    recordOption: {
      startDateStr: new Date().toISOString().substring(0, 10),
      keyword: null,
      friendId: null
    },
    recordList: []
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
    setFriendId(state, friendId){
      console.log(friendId);
      state.recordOption.friendId = friendId;
    },
    setRecordList(state, recordList) {
      state.recordList = recordList;
    },
    setRecordsUp(state, recordList) {
      state.recordList = [...recordList, ...state.recordList];
    },
    setRecordsDown(state, recordList) {
      state.recordList = [...state.recordList, ...recordList];
    },
    updateReplyList(state, {recordId, newReplyList}) {
      const index = state.recordList.findIndex(record => record.recordId === recordId);
      state.recordList[index].replyList = newReplyList;
    }
  },
  actions: {
    // eslint-disable-next-line
    getRecordList({ commit, state }, memberId) {
      return record.getRecordList( memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordList', response.data.data);
      })
    },

    getRecordsUp({ commit, state }, memberId) {
      return record.getRecordList( memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordsUp', response.data.data);
      })
    },

    getRecordsDown({ commit, state }, memberId) {
      return record.getRecordList( memberId, state.recordOption.startDateStr, state.recordOption.keyword )
      .then((response) => {
        console.log(response.data.data);
        commit('setRecordsDown', response.data.data);
      })
    },

    // eslint-disable-next-line
    addReply( { commit }, { memberId, recordId, replyContent } ) {
      return record.addReply( memberId, recordId, replyContent )
      .then((response) => {
        commit('updateReplyList', 
        { recordId : recordId,
          newReplyList : response.data.data 
      });
      })
    },
    
    editReply( { commit }, { memberId, recordId, replyId, replyContent } ) {
      return record.editReply( memberId, recordId, replyId, replyContent )
      .then((response) => {
        commit('updateReplyList',
        {
          recordId : recordId,
          newReplyList : response.data.data
        });
      })
    },

    deleteReply( { commit }, { recordId, replyId } ) {
      return record.deleteReply( recordId, replyId )
      .then((response) => {
        commit('updateReplyList',
        {
          recordId : recordId,
          newReplyList : response.data.data
        });
      })
    },

    // eslint-disable-next-line
    addRecord({ }, formData) {
      return record.postRecord(formData);
    }
  },
};