import { friend } from '../api';

export default {
  namespaced: true,
  state: {
    friendList: []
  },
  getters: {
    friendList(state) {
      return state.friendList
    }
  },
  mutations: {
    setFriendList(state, friendList) {
      state.friendList = friendList;
    }
  },
  actions: {
    // eslint-disable-next-line
    getFriendList({ commit }, memberId) {
      return friend.getFriendList( memberId )
      .then((response) => {
        console.log(response.data.data);
        commit('setFriendList', response.data.data);
      })
    }
  }
};