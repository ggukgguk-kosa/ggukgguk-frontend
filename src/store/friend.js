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
    },

    // 친구를 차단시켰을 때 store의 friendList 배열에서 친구를 제거목적.
    removeFriend(state, friendId) {
      // friendList에 차단한 친구 객체값?을 없애기 위해 해당 인덱스를 찾아서 FriendList에 삭제함.
      // 만약 인덱스가 -1이 아니라면. 즉 값이 있으면 해당 인덱스 위치에 있는 친구 ID의 정보를 비움.
      const index = state.friendList.findIndex(friend => friend.memberId === friendId);
      if (index !== -1) {
        state.friendList.splice(index, 1);
      }
    }
  },
  actions: {
    // 친구 목록 조회
    // eslint-disable-next-line
    getFriendList({ commit }, memberId) {
      return friend.getFriendList( memberId )
      .then((response) => {
        console.log(response.data.data);
        commit('setFriendList', response.data.data);
      })
    },

    //친구 추가.
    // eslint-disable-next-line
    additionFriendId({ },friendId) {
      return friend.addFriend( friendId )
      .then((response) => {
        console.log(response)
      })
    },
    
    //친구 차단.
    delRelationshipFriend({ commit }, friendId) {
      return friend.deleteFriend(friendId)
        .then((response) => {
          console.log(response);
          console.log('친구를 차단하였고, list를 확인해야 함')
          commit('removeFriend', friendId);
        })
    }
  }
};