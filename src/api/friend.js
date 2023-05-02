import apiFactory from "./apiFactory"

const axios = apiFactory.getInstance();

export default {
    getFriendList({ memberId }) {
        return axios.get('/friend/list', {
            memberId
        })
    }
}