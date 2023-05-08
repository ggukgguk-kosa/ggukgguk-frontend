import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    //알림 목록 조회
    getNotifyList () {
        return axios.get('/notification',
        {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    },
}