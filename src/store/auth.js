import { auth } from '../api';

export default {
  namespaced: true,
  state: {
    memberInfo: {},
    accessToken: '',
    refreshToken: '',
  },
  getters: {
    memberInfo(state) {
      return state.memberInfo;
    },
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    isLogin(state) {
      if (Object.keys(state.memberInfo).length === 0
        || state.accessToken === ''
        || state.refreshToken === '') {
        return false;
      }
      return true;
    }
  },
  mutations: {
    setMemberInfo(state, {
      memberInfo, accessToken, refreshToken,
    }) {
      state.memberInfo = memberInfo;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    updateAccessToken(state, { accessToken }) {
      state.accessToken = accessToken;
    }
  },
  actions: {
    login({ commit }, { memberId, memberPw }) {
      return auth.login({ memberId, memberPw })
        .then((response) => {
          console.log('리스폰스 받음');
          console.log(response);
          commit('setMemberInfo', response.data.data);
          return response;
        })
    },
    logout({ commit }) {
      commit('setMemberInfo', {
        memberInfo: {},
        accessToken: '',
        refreshToken: ''
      });
    },
    // 회원 가입
    // eslint-disable-next-line
    register({}, {memberId, memberPw, memberName, memberNickname, 
      memberEmail, memberPhone, memberBirth, memberAuthority}){
        console.log(memberId);
      return auth.addMember({memberId, memberPw, memberName, memberNickname, 
        memberEmail, memberPhone, memberBirth, memberAuthority});
    },

    // 아이디 중복 가입
    // eslint-disable-next-line
    duplicateId({},memberId){
      return auth.duplicateId(memberId)
      .then((response) => {
        console.log('리스폰스 받음');
        console.log(response);
        return response;
      })
    }

  }
};