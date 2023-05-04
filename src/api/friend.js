import apiFactory from "./apiFactory"

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
        });
    }
}