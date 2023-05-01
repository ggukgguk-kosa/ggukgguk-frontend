import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    // 회원 정보 조회
    memberInformation(memberId) { 
        console.log(memberId);
        return axios.get(`/member/${memberId}`,
        { 
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    }
} 