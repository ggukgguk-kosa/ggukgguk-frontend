import apiFactory from "./apiFactory"

const axios = apiFactory.getInstance();

export default {
    login({ memberId, memberPw }) {
        return axios.post('/auth/login', {
            memberId, memberPw
        });
    }
}