import apiFactory from "./apiFactory"
import store from '../store'

const axios = apiFactory.getInstance();

export default {
    addNotice ({ noticeTitle, noticeContent }) {
        console.log(noticeTitle, noticeContent);
        return axios.post('/admin/notice', {
            noticeTitle, noticeContent
        }, {
            headers: {
                Authorization: `Bearer ${store.getters['auth/accessToken']}`
            }
        });
    }
}