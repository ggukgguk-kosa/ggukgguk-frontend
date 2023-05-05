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
    register({ }, { memberId, memberPw, memberName, memberNickname,
      memberEmail, memberPhone, memberBirth, memberAuthority }) {
      console.log(memberId);
      return auth.addMember({
        memberId, memberPw, memberName, memberNickname,
        memberEmail, memberPhone, memberBirth, memberAuthority
      });
    },

    // 아이디 중복 가입
    // eslint-disable-next-line
    duplicateId({ }, memberId) {
      return auth.duplicateId(memberId)
        .then((response) => {
          console.log('리스폰스 받음');
          console.log(response);
          return response;
        })
    },

    // 구글 인가 코드 전달.
    // eslint-disable-next-line
    handleGoogleAuth({ commit }, code) {
      // console.log("테스트 :" + code);
      return auth.handleGoogleAuth(code).then((response) => {
        console.log("리스폰스 응답");
        console.log(response);
        // Extract the user information from the received JSON object
        // Commit the setMemberInfo mutation with the user information
        commit("setMemberInfo", response.data.data);
        return response;
      });
    },
    // 카카오 인가코드 전달.
    handleKakaoAuth({ commit }, AccessToken) {
      // console.log("테스트 :" + code);
      return auth.directKakaoAuth(AccessToken).then((response) => {
        console.log('리스폰스 받음');
        console.log(response);
        commit('setMemberInfo', response.data.data);
        return response;
      });
    },

    // 구글 로그인 시작 (백엔드에서만 구현할 예정)
    // eslint-disable-next-line
    handleGoogleAuth({ }, token) {
      return auth.directGoogleUrl(token).then((response) => {
        console.log(response);
        // const memberInfo = response.data.data;
        // window.location.href = googleLoginUrl;
        return response
      })
    },
    // 이메일로 아이디찾기
    // eslint-disable-next-line
    handleFindId({ }, email) {
      return auth.findIdByEmail(email)
      .then((response) => { 
        console.log('리스폰스 받음');
        console.log(response);
        return response;
      })
    }
  }
};