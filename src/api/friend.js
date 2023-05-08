import apiFactory from "./apiFactory"
import store from '../store'
const axios = apiFactory.getInstance();

export default {
    // 나의 친구 목록 조회하기
    getFriendList({ memberId }) {
        return axios.get('/friend/list', {
            memberId
        })
    },
    // 친구 아이디 일부 값으로 친구 조회하기 
    getPartialIdSearch(memberId){
        console.log("axios: " + memberId);
        return axios.get(`/friend`, {
            params: {memberId},
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
    // 친구추가 
    addFriend(toMemberId){
        console.log("axios: " + toMemberId);    
        return axios.post(`/friend/send/${toMemberId}`, {
            params: {toMemberId},
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        }); 
    },
    // 친구 차단
    deleteFriend(toMemberId){
        console.log("axios: " + toMemberId);    
        return axios.delete(`/friend/${toMemberId}`, {
            params: {toMemberId},
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        }); 
    },

}