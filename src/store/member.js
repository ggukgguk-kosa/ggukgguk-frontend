import { member } from "@/api";

export default {
    namespaced : true,
    
    // [변수들의 집합]
    state: {
        memberDetailInfo :{},
        friendList: []
    },
    // [state의 변수들을 get 호출]
    getters :{
        memberDetailInfo(state) {
            return state.memberDetailInfo;
        },
        friendList(state) {
            return state.friendList;
        }
    },
    // [변수들을 조작하는 함수들]
    mutations: {
        setMemberDetailInfo(state,memberDetailInfo){
            state.memberDetailInfo = memberDetailInfo;
        },
        setFriendList(state, newFriendList) {
            state.friendList = newFriendList;
        }
    },
    // [비동기 처리를 하는 함수들]
    actions:{
        informationMemberDetail({commit},memberId){
            return member.memberInformation(memberId)
            .then((response) => {
                console.log('리스폰스 받음');
                console.log(response);
                commit('setMemberDetailInfo',response.data.data);
                return response;
            })
        },
        fetchFriendList({ commit }) {
            return member.getFriendList()
            .then((response) => {
                commit('setFriendList',response.data.data);
            })
        }
    }
}