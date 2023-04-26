import { diary } from '../api';

export default {
  namespaced: true,
  state: {
    diaryOption: {
      diaryYear: new Date().getFullYear(),
      diaryMonth: null
    },
    diaryList:[]
  },
  getters: {
    diaryOption(state) {
      return state.diaryOption
    },
    diaryList(state) {
      return state.diaryList
    }
  },
  mutations: {
    setDiaryYear(state, diaryYear){
      state.diaryOption.diaryYear = diaryYear;
      console.log(state.diaryOption.diaryYear);
    },
    setDiaryMonth(state, diaryMonth){
      console.log('2: ', diaryMonth);
      state.diaryOption.diaryMonth = diaryMonth;
    },
    setDiaryList(state, diaryList) {
      state.diaryList = diaryList;
    }
  },
  actions: {
    // eslint-disable-next-line
    getDiaryList({ commit, state }, memberId) {
      console.log("3: ", state.diaryOption);
      return diary.getDiaryList(memberId, state.diaryOption.diaryYear, state.diaryOption.diaryMonth )
      .then((response) => {
        console.log(response.data.data);
        commit('setDiaryList', response.data.data);
      })
    }
  }
};