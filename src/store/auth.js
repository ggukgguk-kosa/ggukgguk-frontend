import { auth } from '../api';

export default {
  namespaced: true,
  state: {
    memberInfo: {},
    accessToken: '',
    accessTokenExpiresIn: null,
    refreshToken: '',
    refreshTokenExpiresIn: null,
    loginStatus: true
  },
  getters: {
    memberInfo(state) {
      return state.memberInfo;
    },
    accessToken(state) {
      return state.accessToken;
    },
    accessTokenExpiresIn(state) {
      return state.accessTokenExpiresIn;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    refreshTokenExpiresIn(state) {
      return state.refreshTokenExpiresIn;
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
      memberInfo, accessToken, accessTokenExpiresIn,
      refreshToken, refreshTokenExpiresIn
    }) {
      state.memberInfo = memberInfo;
      state.accessToken = accessToken;
      state.accessTokenExpiresIn = new Date(accessTokenExpiresIn);
      state.refreshToken = refreshToken;
      state.refreshTokenExpiresIn = new Date(refreshTokenExpiresIn);
    },
    updateAccessToken(state, { accessToken, accessTokenExpiresIn }) {
      state.accessToken = accessToken;
      state.accessTokenExpiresIn = new Date(accessTokenExpiresIn);
    }
  },
  actions: {
    login({ commit }, { memberId, memberPw }) {
      return auth.login({ memberId, memberPw})
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
    }
  }
};